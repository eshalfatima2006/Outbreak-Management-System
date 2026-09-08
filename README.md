# Outbreak Management System (OMS)

A prototype web application built for public health investigators to manage persons, track disease cases, record exposure events, and conduct contact tracing. 

## Features

- **Person Registry**: Maintain demographic information of subjects.
- **Disease Case Management**: Record case data, diagnoses, health statuses, and priorities.
- **Exposure Tracking**: Log exposure events (location, duration, frequency, type).
- **Contact Tracing**: Establish many-to-many relationships between Cases and Exposures, enabling both "Case &rarr; Exposures" and "Exposure &rarr; Cases" reverse lookups.
- **Dynamic Field Configuration**: Administrators can dynamically add custom fields (e.g., specific clinical markers) to Cases without altering the database schema.
- **Dashboard & Reporting**: An aggregate surveillance dashboard and detailed epidemiological reports.
- **Data Import/Export**: Backup and restore the entire database state via JSON for catastrophe recovery.
- **Role-Based Access Control**: Secure login system with Admin and Investigator roles.

## Technology Stack

- **Backend**: Python 3, Flask
- **Database**: SQLite, SQLAlchemy ORM
- **Authentication**: Flask-Login, Werkzeug Security
- **Frontend**: HTML5, Jinja2, Bootstrap 5, Custom CSS, FontAwesome Icons

## Setup & Installation

### Prerequisites
- Python 3.8+ installed on your machine.

### Instructions
1. **Clone or Download the Repository**
   Navigate to the project root directory in your terminal:
   ```bash
   cd Outbreak-Management-System
   ```

2. **Set Up a Virtual Environment (Optional but Recommended)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Dependencies**
   Install the required Python packages from `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the Database & Run the App**
   The application is configured to create the database (`outbreak.db`) automatically if it does not exist, and pre-seed it with the default administrator and investigator accounts.
   ```bash
   python app.py
   ```

5. **Access the Application**
   Open your web browser and go to:
   ```
   http://127.0.0.1:5000
   ```

## Default Credentials

For testing and prototype demonstration, the following accounts are pre-seeded:
- **Admin**: `admin` / `admin123`
- **Investigator**: `investigator` / `invest123`

*(Note: In a production environment, seed credentials should be removed and passwords managed securely.)*

## Project Structure

- `app.py`: Main Flask application, routing, and SQLAlchemy database models.
- `requirements.txt`: Python package dependencies.
- `outbreak.db`: The SQLite database (generated automatically).
- `templates/`: Jinja2 HTML templates for all views.
- `static/css/`: Custom styling overrides and themes.
- `AI_DEVELOPMENT_RECORD.md`: Summary of the AI-assisted development approach and requirements mapping.
