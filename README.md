# BNPL (Buy Now Pay Later) Application

This project implements a Buy Now Pay Later (BNPL) system with a Django REST Framework backend and React frontend.

---

## Features

- Merchants create BNPL plans with equal installments.
- Users view their plans and installments in a calendar or dashboard.
- Role-based login and views for merchants and users.
- User can pay installments one by one.
- Automatic plan status updates when all installments are paid.

---

## Tech Stack

- Backend: Django, Django REST Framework
- Frontend: React, Axios
- Authentication: Token-based (DRF TokenAuth)

---

## Prerequisites

- Python 3.8+
- Node.js 14+ and npm or yarn
- PostgreSQL or SQLite (default Django DB)
- Git

---

## Backend Setup (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/RehabShehata/BNPL-Demo.git
   cd MainProject
Create and activate a virtual environment:

cd MainProject
python3 -m venv venv
source venv/bin/activate  

Install Python dependencies:

brew install python
echo 'export PATH="/opt/homebrew/opt/python@3.13/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
python3.8 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
    
Configure environment variables:

Create a .env file (or set environment variables) with:

SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3   # Or your PostgreSQL URL
Run migrations:

python manage.py migrate
Create a superuser (optional):

python manage.py createsuperuser

## users creation

open django shell
python manage.py shell
from accounts.models import User

# Create a merchant
merchant = User.objects.create_user(
    username="merchant1", email="merchant1@example.com", password="test1234", is_merchant=True
)

# Create a customer
customer = User.objects.create_user(
    username="customer7", email="customer7@example.com", password="test1234", is_merchant=False
)

Run the backend server:
python manage.py runserver

Frontend Setup (React)
Navigate to frontend folder:

cd bnpl-frontend
Install dependencies:

npm install
# or
yarn install
Configure environment variables:

Create a .env file in bnpl-frontend with:

REACT_APP_API_BASE_URL=http://localhost:8000

Run the React development server:
npm start
# or
yarn start
The app will be available at http://localhost:3000

