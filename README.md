# BookReviewAPI

A simple RESTful API built with Express.js to manage and share book reviews. This API provides endpoints for creating, retrieving, updating, and deleting book reviews.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description

The **BookReviewAPI** allows users to:
- Add, update, and delete book reviews.
- Retrieve book reviews by various criteria.

Built with Node.js and Express.js
## Features

- Data validation using Joi.

## Usage

To interact with the API, you can use tools like [Postman](https://www.postman.com/) or `cURL`. Below are some example requests:

- **Get All Book Reviews**  
  Send a `GET` request to retrieve all the book reviews:

  ```http
  POST /api/reviews

## API Endpoints

|       Endpoint      | Method |            Description           |
|:-------------------:|:------:|:--------------------------------:|
| /api/users/register | POST   | Register a new user              |
| /api/users/login    | POST   | Login a user                     |
| /api/reviews        | GET    | Get all book reviews             |
| /api/reviews/:id    | GET    | Get a specific book review by ID |
| /api/reviews        | POST   | Add a new book review            |
| /api/reviews/:id    | PUT    | Update an existing book review   |
| /api/reviews/:id    | DELETE | Delete a book review             |


