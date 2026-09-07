import os
import json
import re
from datetime import datetime, date
from functools import wraps

from flask import (
    Flask, render_template, redirect, url_for, request,
    flash, jsonify, send_file, abort
)
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager, UserMixin, login_user, logout_user,
    login_required, current_user
)
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import func
import io

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "phin-outbreak-secret-2024-xK9#mL")
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'outbreak.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message = "Please log in to access this page."
login_manager.login_message_category = "warning"

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id            = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role          = db.Column(db.String(20), nullable=False, default="investigator")
    def set_password(self, pw): self.password_hash = generate_password_hash(pw)
    def check_password(self, pw): return check_password_hash(self.password_hash, pw)
    def is_admin(self): return self.role == "admin"

class Person(db.Model):
    __tablename__ = "persons"
    id          = db.Column(db.Integer, primary_key=True)
    subject_id  = db.Column(db.String(50), unique=True, nullable=False)
    name        = db.Column(db.String(120), nullable=False)
    dob         = db.Column(db.Date, nullable=False)
    gender      = db.Column(db.String(20))
    address     = db.Column(db.String(250))
    phone       = db.Column(db.String(20))
    race        = db.Column(db.String(60))
    ethnicity   = db.Column(db.String(60))
    citizenship = db.Column(db.String(60))
    cases       = db.relationship("Case", backref="person", lazy=True)
    exposures   = db.relationship("Exposure", backref="person", lazy=True)

class Case(db.Model):
    __tablename__ = "cases"
    id            = db.Column(db.Integer, primary_key=True)
    case_id       = db.Column(db.String(30), unique=True, nullable=False)
    person_id     = db.Column(db.Integer, db.ForeignKey("persons.id"), nullable=False)
    agent         = db.Column(db.String(120))
    diagnosis     = db.Column(db.String(200))
    health_status = db.Column(db.String(60))
    case_status   = db.Column(db.String(30))
    onset_date    = db.Column(db.Date)
    priority      = db.Column(db.String(10))
    extra_data    = db.Column(db.Text, default="{}")
    links         = db.relationship("Link", backref="case", lazy=True, cascade="all, delete-orphan")

class Exposure(db.Model):
    __tablename__ = "exposures"
    id            = db.Column(db.Integer, primary_key=True)
    person_id     = db.Column(db.Integer, db.ForeignKey("persons.id"), nullable=True)
    exposure_type = db.Column(db.String(60))
    place         = db.Column(db.String(200))
    duration      = db.Column(db.String(60))
    frequency     = db.Column(db.String(60))
    proximity     = db.Column(db.String(120))
    links         = db.relationship("Link", backref="exposure", lazy=True, cascade="all, delete-orphan")

class Link(db.Model):
    __tablename__ = "links"
    id          = db.Column(db.Integer, primary_key=True)
    case_id     = db.Column(db.Integer, db.ForeignKey("cases.id"), nullable=False)
    exposure_id = db.Column(db.Integer, db.ForeignKey("exposures.id"), nullable=False)

class CustomField(db.Model):
    __tablename__ = "custom_fields"
    id          = db.Column(db.Integer, primary_key=True)
    entity_type = db.Column(db.String(30), nullable=False)
    field_name  = db.Column(db.String(80), nullable=False)
    field_type  = db.Column(db.String(20), default="text")

@login_manager.user_loader
def load_user(uid): return User.query.get(int(uid))

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin():
            abort(403)
        return f(*args, **kwargs)
    return decorated

def generate_case_id():
    ts = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    count = Case.query.count() + 1
    return f"CASE-{ts}-{count:04d}"

def validate_phone(phone):
    if phone and not re.fullmatch(r"\d+", phone.strip()): return False
    return True

def validate_dob(dob_str):
    try:
        dob = datetime.strptime(dob_str, "%Y-%m-%d").date()
        return dob < date.today(), dob
    except (ValueError, TypeError):
        return False, None

VALID_CASE_STATUSES = {"Confirmed", "Probable", "Suspect"}
def get_case_custom_fields(): return CustomField.query.filter_by(entity_type="Case").all()


# Jinja2 filter for parsing JSON in templates
@app.template_filter('fromjson')
def fromjson_filter(s):
    try:
        import json as _j
        return _j.loads(s) if s else {}
    except Exception:
        return {}

@app.context_processor
def inject_globals():
    return {'now': __import__('datetime').datetime.utcnow()}


@app.route("/")
@login_required
def index(): return redirect(url_for("dashboard"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated: return redirect(url_for("dashboard"))
    if request.method == "POST":
        username = request.form.get("username","").strip()
        password = request.form.get("password","")
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user, remember=request.form.get("remember")=="on")
            return redirect(request.args.get("next") or url_for("dashboard"))
        flash("Invalid username or password.", "danger")
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return redirect(url_for("login"))

@app.route("/dashboard")
@login_required
def dashboard():
    total_cases     = Case.query.count()
    total_exposures = Exposure.query.count()
    total_persons   = Person.query.count()
    links_per_case  = db.session.query(Link.case_id, func.count(Link.id).label("cnt")).group_by(Link.case_id).all()
    avg_contacts    = round(sum(r.cnt for r in links_per_case)/len(links_per_case),1) if links_per_case else 0
    recent_cases    = Case.query.order_by(Case.id.desc()).limit(5).all()
    high    = Case.query.filter_by(priority="High").count()
    medium  = Case.query.filter_by(priority="Medium").count()
    low     = Case.query.filter_by(priority="Low").count()
    confirmed = Case.query.filter_by(case_status="Confirmed").count()
    probable  = Case.query.filter_by(case_status="Probable").count()
    suspect   = Case.query.filter_by(case_status="Suspect").count()
    return render_template("dashboard.html",
        total_cases=total_cases, total_exposures=total_exposures, total_persons=total_persons,
        avg_contacts=avg_contacts, recent_cases=recent_cases,
        high=high, medium=medium, low=low,
        confirmed=confirmed, probable=probable, suspect=suspect)

@app.route("/persons")
@login_required
def persons(): return render_template("persons.html", persons=Person.query.order_by(Person.id.desc()).all())

@app.route("/persons/create", methods=["GET","POST"])
@login_required
def create_person():
    if request.method == "POST":
        phone = request.form.get("phone","").strip()
        dob_str = request.form.get("dob","").strip()
        if not validate_phone(phone):
            flash("Phone number must contain digits only.","danger")
            return render_template("person_form.html", person=None, form_data=request.form)
        valid_dob, dob = validate_dob(dob_str)
        if not valid_dob:
            flash("Date of Birth must be a valid past date.","danger")
            return render_template("person_form.html", person=None, form_data=request.form)
        sid = request.form.get("subject_id","").strip()
        if Person.query.filter_by(subject_id=sid).first():
            flash("A person with this Subject ID already exists.","danger")
            return render_template("person_form.html", person=None, form_data=request.form)
        p = Person(subject_id=sid, name=request.form.get("name","").strip(), dob=dob,
            gender=request.form.get("gender",""), address=request.form.get("address","").strip(),
            phone=phone, race=request.form.get("race","").strip(),
            ethnicity=request.form.get("ethnicity","").strip(), citizenship=request.form.get("citizenship","").strip())
        db.session.add(p); db.session.commit()
        flash("Person created successfully.","success")
        return redirect(url_for("persons"))
    return render_template("person_form.html", person=None, form_data={})

@app.route("/persons/<int:pid>/edit", methods=["GET","POST"])
@login_required
def edit_person(pid):
    person = Person.query.get_or_404(pid)
    if request.method == "POST":
        phone = request.form.get("phone","").strip()
        dob_str = request.form.get("dob","").strip()
        if not validate_phone(phone):
            flash("Phone number must contain digits only.","danger")
            return render_template("person_form.html", person=person, form_data=request.form)
        valid_dob, dob = validate_dob(dob_str)
        if not valid_dob:
            flash("Date of Birth must be a valid past date.","danger")
            return render_template("person_form.html", person=person, form_data=request.form)
        person.subject_id=request.form.get("subject_id","").strip(); person.name=request.form.get("name","").strip()
        person.dob=dob; person.gender=request.form.get("gender",""); person.address=request.form.get("address","").strip()
        person.phone=phone; person.race=request.form.get("race","").strip()
        person.ethnicity=request.form.get("ethnicity","").strip(); person.citizenship=request.form.get("citizenship","").strip()
        db.session.commit(); flash("Person updated successfully.","success"); return redirect(url_for("persons"))
    return render_template("person_form.html", person=person, form_data={})

@app.route("/persons/<int:pid>/delete", methods=["POST"])
@login_required
def delete_person(pid):
    db.session.delete(Person.query.get_or_404(pid)); db.session.commit()
    flash("Person deleted.","success"); return redirect(url_for("persons"))

@app.route("/cases")
@login_required
def cases(): return render_template("cases.html", cases=Case.query.order_by(Case.id.desc()).all())

@app.route("/cases/create", methods=["GET","POST"])
@login_required
def create_case():
    pl = Person.query.order_by(Person.name).all(); cf = get_case_custom_fields()
    if request.method == "POST":
        status = request.form.get("case_status","")
        if status not in VALID_CASE_STATUSES:
            flash(f"Case Status must be one of: {', '.join(VALID_CASE_STATUSES)}.","danger")
            return render_template("case_form.html", case=None, persons=pl, custom_fields=cf, form_data=request.form)
        onset_str = request.form.get("onset_date","").strip(); onset_date = None
        if onset_str:
            try: onset_date = datetime.strptime(onset_str,"%Y-%m-%d").date()
            except ValueError:
                flash("Invalid onset date.","danger")
                return render_template("case_form.html", case=None, persons=pl, custom_fields=cf, form_data=request.form)
        extra = {c2.field_name: request.form.get(f"cf_{c2.id}","").strip() for c2 in cf}
        nc = Case(case_id=generate_case_id(), person_id=int(request.form.get("person_id")),
            agent=request.form.get("agent","").strip(), diagnosis=request.form.get("diagnosis","").strip(),
            health_status=request.form.get("health_status","").strip(), case_status=status,
            onset_date=onset_date, priority=request.form.get("priority","Low"), extra_data=json.dumps(extra))
        db.session.add(nc); db.session.commit(); flash("Case created successfully.","success"); return redirect(url_for("cases"))
    return render_template("case_form.html", case=None, persons=pl, custom_fields=cf, form_data={})

@app.route("/cases/<int:cid>/edit", methods=["GET","POST"])
@login_required
def edit_case(cid):
    case = Case.query.get_or_404(cid); pl = Person.query.order_by(Person.name).all(); cf = get_case_custom_fields()
    if request.method == "POST":
        status = request.form.get("case_status","")
        if status not in VALID_CASE_STATUSES:
            flash(f"Case Status must be one of: {', '.join(VALID_CASE_STATUSES)}.","danger")
            return render_template("case_form.html", case=case, persons=pl, custom_fields=cf, form_data=request.form)
        onset_str = request.form.get("onset_date","").strip(); onset_date = None
        if onset_str:
            try: onset_date = datetime.strptime(onset_str,"%Y-%m-%d").date()
            except ValueError:
                flash("Invalid onset date.","danger")
                return render_template("case_form.html", case=case, persons=pl, custom_fields=cf, form_data=request.form)
        extra = {c2.field_name: request.form.get(f"cf_{c2.id}","").strip() for c2 in cf}
        case.person_id=int(request.form.get("person_id")); case.agent=request.form.get("agent","").strip()
        case.diagnosis=request.form.get("diagnosis","").strip(); case.health_status=request.form.get("health_status","").strip()
        case.case_status=status; case.onset_date=onset_date; case.priority=request.form.get("priority","Low")
        case.extra_data=json.dumps(extra); db.session.commit(); flash("Case updated successfully.","success"); return redirect(url_for("cases"))
    return render_template("case_form.html", case=case, persons=pl, custom_fields=cf, form_data={})

@app.route("/cases/<int:cid>/delete", methods=["POST"])
@login_required
def delete_case(cid):
    db.session.delete(Case.query.get_or_404(cid)); db.session.commit()
    flash("Case deleted.","success"); return redirect(url_for("cases"))

@app.route("/exposures")
@login_required
def exposures(): return render_template("exposures.html", exposures=Exposure.query.order_by(Exposure.id.desc()).all())

@app.route("/exposures/create", methods=["GET","POST"])
@login_required
def create_exposure():
    pl = Person.query.order_by(Person.name).all()
    if request.method == "POST":
        pid = request.form.get("person_id")
        e = Exposure(person_id=int(pid) if pid else None, exposure_type=request.form.get("exposure_type",""),
            place=request.form.get("place","").strip(), duration=request.form.get("duration","").strip(),
            frequency=request.form.get("frequency","").strip(), proximity=request.form.get("proximity","").strip())
        db.session.add(e); db.session.commit(); flash("Exposure created successfully.","success"); return redirect(url_for("exposures"))
    return render_template("exposure_form.html", exposure=None, persons=pl, form_data={})

@app.route("/exposures/<int:eid>/edit", methods=["GET","POST"])
@login_required
def edit_exposure(eid):
    exposure = Exposure.query.get_or_404(eid); pl = Person.query.order_by(Person.name).all()
    if request.method == "POST":
        pid = request.form.get("person_id")
        exposure.person_id=int(pid) if pid else None; exposure.exposure_type=request.form.get("exposure_type","")
        exposure.place=request.form.get("place","").strip(); exposure.duration=request.form.get("duration","").strip()
        exposure.frequency=request.form.get("frequency","").strip(); exposure.proximity=request.form.get("proximity","").strip()
        db.session.commit(); flash("Exposure updated successfully.","success"); return redirect(url_for("exposures"))
    return render_template("exposure_form.html", exposure=exposure, persons=pl, form_data={})

@app.route("/exposures/<int:eid>/delete", methods=["POST"])
@login_required
def delete_exposure(eid):
    db.session.delete(Exposure.query.get_or_404(eid)); db.session.commit()
    flash("Exposure deleted.","success"); return redirect(url_for("exposures"))

@app.route("/links", methods=["GET","POST"])
@login_required
def links():
    all_cases = Case.query.order_by(Case.case_id).all()
    all_exposures = Exposure.query.order_by(Exposure.id).all()
    all_links = db.session.query(Link,Case,Exposure).join(Case, Link.case_id==Case.id).join(Exposure, Link.exposure_id==Exposure.id).all()
    if request.method == "POST":
        cid = request.form.get("case_id"); eid = request.form.get("exposure_id")
        if not cid or not eid: flash("Please select both a Case and an Exposure.","warning")
        elif Link.query.filter_by(case_id=int(cid), exposure_id=int(eid)).first(): flash("This link already exists.","warning")
        else:
            db.session.add(Link(case_id=int(cid), exposure_id=int(eid))); db.session.commit()
            flash("Entities linked successfully.","success")
        return redirect(url_for("links"))
    return render_template("links.html", cases=all_cases, exposures=all_exposures, links=all_links)

@app.route("/links/<int:lid>/delete", methods=["POST"])
@login_required
def delete_link(lid):
    db.session.delete(Link.query.get_or_404(lid)); db.session.commit()
    flash("Link removed.","success"); return redirect(url_for("links"))

@app.route("/contacts")
@login_required
def contacts():
    all_cases = Case.query.order_by(Case.case_id).all()
    sid = request.args.get("case_id", type=int); linked = []; case_obj = None
    if sid:
        case_obj = Case.query.get_or_404(sid)
        linked = db.session.query(Exposure).join(Link, Link.exposure_id==Exposure.id).filter(Link.case_id==sid).all()
    return render_template("contacts.html", all_cases=all_cases, selected_case=case_obj, linked_exposures=linked, selected_case_id=sid)

@app.route("/reports")
@login_required
def reports():
    all_cases = Case.query.order_by(Case.case_id).all()
    rows = [{"case":c,"contact_count":Link.query.filter_by(case_id=c.id).count(),
             "has_epi_link":Link.query.filter_by(case_id=c.id).count()>0,
             "lab_results":"Pending - PCR Lab Ref #"+c.case_id} for c in all_cases]
    return render_template("reports.html", report_rows=rows, no_epi_link_count=sum(1 for r in rows if not r["has_epi_link"]), total_cases=len(rows))

@app.route("/admin/settings", methods=["GET","POST"])
@login_required
@admin_required
def admin_settings():
    users=User.query.all(); cf=CustomField.query.all()
    if request.method == "POST":
        action = request.form.get("action")
        if action == "add_field":
            fn=request.form.get("field_name","").strip(); ft=request.form.get("field_type","text"); et=request.form.get("entity_type","Case")
            if not fn: flash("Field name cannot be empty.","danger")
            elif CustomField.query.filter_by(entity_type=et,field_name=fn).first(): flash("Field already exists.","warning")
            else:
                db.session.add(CustomField(entity_type=et,field_name=fn,field_type=ft)); db.session.commit()
                flash(f"Custom field '{fn}' added to {et}.","success")
        elif action == "delete_field":
            c2=CustomField.query.get(request.form.get("cf_id"))
            if c2: db.session.delete(c2); db.session.commit(); flash("Custom field removed.","success")
        elif action == "add_user":
            un=request.form.get("new_username","").strip(); up=request.form.get("new_password",""); ur=request.form.get("new_role","investigator")
            if not un or not up: flash("Username and password required.","danger")
            elif User.query.filter_by(username=un).first(): flash("Username already taken.","warning")
            else:
                nu=User(username=un,role=ur); nu.set_password(up); db.session.add(nu); db.session.commit()
                flash(f"User '{un}' created.","success")
        elif action == "delete_user":
            u2=User.query.get(request.form.get("user_id"))
            if u2 and u2.id != current_user.id: db.session.delete(u2); db.session.commit(); flash(f"User '{u2.username}' deleted.","success")
            else: flash("Cannot delete your own account.","warning")
        return redirect(url_for("admin_settings"))
    return render_template("admin_settings.html", users=users, custom_fields=cf)

@app.route("/export")
@login_required
def export_data():
    data = {
        "exported_at": datetime.utcnow().isoformat(),
        "persons": [{"subject_id":p.subject_id,"name":p.name,"dob":p.dob.isoformat() if p.dob else None,
            "gender":p.gender,"address":p.address,"phone":p.phone,"race":p.race,"ethnicity":p.ethnicity,"citizenship":p.citizenship}
            for p in Person.query.all()],
        "cases": [{"case_id":c.case_id,"person_subject_id":c.person.subject_id,"agent":c.agent,"diagnosis":c.diagnosis,
            "health_status":c.health_status,"case_status":c.case_status,
            "onset_date":c.onset_date.isoformat() if c.onset_date else None,"priority":c.priority,"extra_data":c.extra_data}
            for c in Case.query.all()],
        "exposures": [{"id":e.id,"person_subject_id":e.person.subject_id if e.person else None,
            "exposure_type":e.exposure_type,"place":e.place,"duration":e.duration,"frequency":e.frequency,"proximity":e.proximity}
            for e in Exposure.query.all()],
        "links": [{"case_case_id":l.case.case_id,"exposure_id":l.exposure_id} for l in Link.query.all()]
    }
    buf = io.BytesIO(json.dumps(data,indent=2).encode("utf-8")); buf.seek(0)
    return send_file(buf, as_attachment=True, download_name=f"outbreak_export_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.json", mimetype="application/json")

@app.route("/import", methods=["GET","POST"])
@login_required
@admin_required
def import_data():
    if request.method == "POST":
        f = request.files.get("import_file")
        if not f or not f.filename.endswith(".json"):
            flash("Please upload a valid .json file.","danger"); return redirect(url_for("import_data"))
        try:
            data = json.load(f)
            Link.query.delete(); Exposure.query.delete(); Case.query.delete(); Person.query.delete(); db.session.commit()
            pm = {}
            for p in data.get("persons",[]):
                dob = datetime.strptime(p["dob"],"%Y-%m-%d").date() if p.get("dob") else None
                person=Person(subject_id=p["subject_id"],name=p["name"],dob=dob,gender=p.get("gender"),address=p.get("address"),
                    phone=p.get("phone"),race=p.get("race"),ethnicity=p.get("ethnicity"),citizenship=p.get("citizenship"))
                db.session.add(person); db.session.flush(); pm[p["subject_id"]]=person.id
            cm = {}
            for c in data.get("cases",[]):
                onset=datetime.strptime(c["onset_date"],"%Y-%m-%d").date() if c.get("onset_date") else None
                case=Case(case_id=c["case_id"],person_id=pm.get(c.get("person_subject_id")),agent=c.get("agent"),
                    diagnosis=c.get("diagnosis"),health_status=c.get("health_status"),case_status=c.get("case_status"),
                    onset_date=onset,priority=c.get("priority"),extra_data=c.get("extra_data","{}"))
                db.session.add(case); db.session.flush(); cm[c["case_id"]]=case.id
            em = {}
            for e in data.get("exposures",[]):
                pid=pm.get(e.get("person_subject_id")) if e.get("person_subject_id") else None
                exp=Exposure(person_id=pid,exposure_type=e.get("exposure_type"),place=e.get("place"),
                    duration=e.get("duration"),frequency=e.get("frequency"),proximity=e.get("proximity"))
                db.session.add(exp); db.session.flush(); em[e["id"]]=exp.id
            for l in data.get("links",[]):
                cid=cm.get(l["case_case_id"]); eid=em.get(l["exposure_id"])
                if cid and eid: db.session.add(Link(case_id=cid,exposure_id=eid))
            db.session.commit(); flash("Data imported successfully.","success")
        except Exception as ex:
            db.session.rollback(); flash(f"Import failed: {str(ex)}","danger")
        return redirect(url_for("dashboard"))
    return render_template("import.html")

@app.errorhandler(403)
def forbidden(e): return render_template("error.html", code=403, message="Access Forbidden - Admins Only"), 403

@app.errorhandler(404)
def not_found(e): return render_template("error.html", code=404, message="Page Not Found"), 404

def init_db():
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(username="admin").first():
            a=User(username="admin",role="admin"); a.set_password("admin123"); db.session.add(a)
        if not User.query.filter_by(username="investigator").first():
            i=User(username="investigator",role="investigator"); i.set_password("invest123"); db.session.add(i)
        db.session.commit()
        print("[PHIN] Database initialized. Seed users created.")

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="127.0.0.1", port=5000)

