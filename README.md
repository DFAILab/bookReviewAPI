# bookReviewAPI

A simple RESTful API built with Express.js to manage and share book reviews. This API provides endpoints for creating, retrieving, updating, and deleting book reviews, as well as managing user authentication and authorization.

Table of Contents

Description
Features
Installation
Usage
API Endpoints
Contributing
License
Description

The BookReviewAPI allows users to:

Add, update, and delete book reviews.
Retrieve book reviews by various criteria.
Register, log in, and manage user accounts.
Implement Role-Based Access Control (RBAC) to manage permissions.
Built with Node.js, Express.js, MongoDB, and Mongoose for managing the database.

Features

JWT authentication and authorization.
Role-Based Access Control (RBAC) for user management.
Data validation using Joi.
MongoDB integration using Mongoose.
Installation

To set up the API locally, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/DFAILab/bookReviewAPI.git
cd bookReviewAPI
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
PORT=3000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
Start the server:
bash
Copy code
npm start
Usage

Use tools like Postman or cURL to interact with the API. Below are examples of how to use the API:

Register a User:
POST /api/users/register
Login a User:
POST /api/users/login
Get All Book Reviews:
GET /api/reviews
API Endpoints

Endpoint	Method	Description
/api/users/register	POST	Register a new user
/api/users/login	POST	Login a user
/api/reviews	GET	Get all book reviews
/api/reviews/:id	GET	Get a specific book review
/api/reviews	POST	Add a new book review
/api/reviews/:id	PUT	Update an existing book review
/api/reviews/:id	DELETE	Delete a book review
Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request. Make sure to write tests for any new features or changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.
