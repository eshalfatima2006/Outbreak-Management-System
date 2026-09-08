# AI-Assisted Development Record

## Project Information

| Item | Details |
|:---|:---|
| **Project Name** | Outbreak Management System |
| **Project Version** | 1.0 |
| **Developer(s)** | [Your Full Names Here] |
| **Student ID(s)** | [Your Student IDs Here] |
| **Development Date** | September 2026 |
| **AI Tool(s) Used** | DeepSeek Chat |

## 1. Development Approach

This application was developed using an AI-assisted coding approach. The following strategy was employed:

- **Backend**: Flask framework with SQLAlchemy ORM for database interactions
- **Database**: SQLite (embedded, file-based for prototype deployment)
- **Authentication**: Flask-Login with role-based access control (Admin/Investigator)
- **Frontend**: Bootstrap 5 with Jinja2 templating, custom CSS for professional styling
- **Deployment**: Local server, export/import functionality for disaster recovery (NFR 2.8)

The AI was used to generate:
- Complete Flask application structure
- SQLAlchemy database models for all entities
- CRUD operations for Person, Case, and Exposure
- Authentication and authorization logic
- Dynamic field configuration system (NFR 2.1.1)
- HTML templates with Bootstrap styling
- JSON import/export functionality (NFR 2.8)

## 2. Major Prompts Used

The following key prompts were provided to the AI during development:

1. *"Generate a Python Flask application with SQLAlchemy models for an outbreak management system with Person, Case, Exposure, Link, and CustomField tables."*

2. *"Implement full CRUD operations for Person, Case, and Exposure entities with proper validation (NFR 2.1.2)."*

3. *"Create a Flask-Login authentication system with role-based access (admin and investigator roles) - NFR 2.8."*

4. *"Build a dynamic field configuration system where admin can add custom fields to Case entities via UI - NFR 2.1.1."*

5. *"Implement JSON export and import for database backup and restore functionality - NFR 2.8."*

6. *"Create a contact tracing page showing many-to-many relationships between Cases and Exposures - FR 2.3.3.4."*

7. *"Generate responsive Bootstrap 5 templates with a professional public health dashboard design."*

## 3. Key Assumptions

The following assumptions were made during AI-assisted development:

| Assumption | Classification | Justification |
|:---|:---|:---|
| SQLite is sufficient for a prototype | Supported by SRS | SRS does not specify database requirements |
| JSON import/export satisfies "availability after catastrophe" | Justified design decision | Provides manual recovery capability for prototype |
| Two roles (admin/investigator) satisfy security requirements | Justified design decision | SRS requires "authorized access" without specifying exact roles |
| Server-side validation is required for data integrity | Unsupported | SRS 2.1.2 mentions structured entry; server-side validation is an added safeguard |
| Dynamic fields stored as JSON blob is acceptable | Justified design decision | Standard pattern for flexible schemas without altering database structure |
| Hardcoded seed credentials are acceptable for prototype | Unsupported | Assignment context requires testing; production would use environment variables |
| Manual export/import is sufficient for backup | Justified design decision | Automatic backup is beyond prototype scope |

## 4. Selected Requirements

### Functional Requirements (7)

| Req ID | Description |
|:---|:---|
| 2.2.1.1 | Manage Person Demographics - CRUD for persons with Subject ID, name, DOB, gender, address, phone, race, ethnicity, citizenship |
| 2.2.4.2.1 | Manage Case Data - CRUD for cases with Case ID, agent, diagnosis, health status, case status, onset date, priority |
| 2.2.4.3.a | Manage Exposure Contact Data - Record exposure type, place, duration, frequency, proximity |
| 2.3.2.1 | Dynamic Entity Linking - Define associations between entities (person-to-person, person-to-place, etc.) |
| 2.3.3.4 | Contact Tracing - One contact linked to multiple cases and vice versa |
| 2.4.10 | Aggregate Data Dashboard - Show number of cases, contacts per case, vaccinations |
| 2.4.4 | Detailed Reports - Generate case lists with contacts, epi-links, lab results |

### Non-Functional Requirements (3)

| Req ID | Description |
|:---|:---|
| 2.1.1 | Configuration Flexibility - Admin can add new data fields, entities, types dynamically |
| 2.1.2 | Structured Data Entry - Standardized forms with validation and dropdowns |
| 2.8 | Security & Availability - Protect from unauthorized access; backup/restore capability |

## 5. Technology Stack Summary

| Component | Technology | Version |
|:---|:---|:---|
| Backend | Python Flask | 2.x |
| ORM | SQLAlchemy | 1.4.x |
| Database | SQLite | 3.x |
| Authentication | Flask-Login | 0.6.x |
| Frontend Framework | Bootstrap | 5.x |
| Templating | Jinja2 | 3.x |
| Animations | AOS (Animate On Scroll) | Latest |
| Icons | Font Awesome | 6.x |

## 6. Limitations and Known Issues

- The system is a prototype; automatic database migrations are not implemented
- Real-time backup (automatic) is not implemented; manual import/export only
- Password reset functionality is not implemented
- Production-grade logging is not configured
- Rate limiting on login attempts is not implemented
- Automatic data synchronization between disconnected clients (SRS 2.1.3) is not implemented - out of scope for this prototype

## 7. Development Log

| Date | Activity |
|:---|:---|
| September 2, 2026 | Project setup, database models created, Flask boilerplate generated |
| September 3, 2026 | CRUD operations for Person, Case, Exposure implemented |
| September 4, 2026 | Authentication (Flask-Login) and role-based access added |
| September 5, 2026 | Dynamic field configuration (NFR 2.1.1) implemented |
| September 6, 2026 | Entity linking (FR 2.3.2.1) and contact tracing (FR 2.3.3.4) completed |
| September 7, 2026 | Dashboard (FR 2.4.10) and Reports (FR 2.4.4) implemented |
| September 8, 2026 | JSON import/export functionality added (NFR 2.8), UI polishing |
| September 9, 2026 | Verification, bug fixes, and baseline freeze |

## 8. Declaration

We confirm that this development record accurately reflects the AI-assisted development process for the Outbreak Management System. All code has been reviewed and tested. The baseline has been frozen for quality evaluation.

**Developer(s):** [Your Full Names Here]
**Student ID(s):** [Your Student IDs Here]
**Date:** September 2026
