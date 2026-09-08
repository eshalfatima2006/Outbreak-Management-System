import re

app_file = '/home/pc/Outbreak-Management-System/app.py'
with open(app_file, 'r') as f:
    content = f.read()

new_contacts = '''@app.route(" /contacts\)
@login_required
def
