# Vue-Django Library

A library management system built using Vue.js for the frontend and Django for the backend.

## Features
- CRUD operations for Authors and Books
- REST API using Django
- Frontend built with Vue.js
- Backend built with Django

## Installation

### Backend (Django)
1. Clone the repository:
   ```sh
   git clone https://github.com/<your-username>/vue-django-library.git](https://github.com/muhammadalikashif/vue-django-library.git
   cd vue-django-library
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Apply migrations and start the Django server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend (Vue.js)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authors
- `GET /authors/` - List all authors
- `POST /authors/` - Create a new author
- `PUT /authors/` - Update an existing author
- `DELETE /authors/` - Delete an author

### Books
- `GET /books/` - List all books
- `POST /books/` - Create a new book
- `PUT /books/` - Update an existing book
- `DELETE /books/` - Delete a book



