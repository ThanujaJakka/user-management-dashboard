# User Management Dashboard

## Overview

The User Management Dashboard is a React application that demonstrates CRUD (Create, Read, Update, Delete) operations using the JSONPlaceholder REST API. It allows users to view, add, edit, delete, search, filter, sort, and paginate user records through a responsive interface.

## Features

* View all users from the JSONPlaceholder API
* Add a new user
* Edit existing users
* Delete users
* Search users by first name, last name, email, or department
* Filter users using a popup
* Sort users by first name, last name, email, and department
* Pagination with page sizes of 10, 25, 50, and 100
* Responsive design for desktop and mobile devices
* Client-side form validation
* API error handling

## Tech Stack

* React
* Vite
* Axios
* CSS
* JSONPlaceholder REST API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/user-management-dashboard.git
```

2. Navigate to the project folder:

```bash
cd user-management-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the application in your browser:

```text
http://localhost:5173
```

## Project Structure

```text
src/
├── components/
│   ├── FilterPopup.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── UserForm.jsx
│   └── UserTable.jsx
├── services/
│   └── api.js
├── styles/
│   ├── App.css
│   ├── Form.css
│   └── UserTable.css
├── App.jsx
└── main.jsx
```

## Assumptions

* JSONPlaceholder does not provide a Department field, so departments are assigned locally for demonstration purposes.
* Since JSONPlaceholder is a mock API, Add, Edit, and Delete operations simulate successful responses but do not permanently modify server data.

## Challenges Faced

* Combining search, filtering, sorting, and pagination while keeping the code modular and easy to maintain.
* Reusing a single form component for both adding and editing users.
* Transforming the API response to separate the full name into first name and last name.

## Future Improvements

* Add toast notifications instead of browser alerts.
* Add a loading spinner while fetching data.
* Improve accessibility.
* Add unit tests.
* Integrate with a real backend for persistent CRUD operations.

## Deployment

GitHub Repository:
(Add your GitHub repository link here.)

Live Demo:
(Add your Vercel deployment link here.)
