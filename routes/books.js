// Import the express module
const express = require('express');
// Create a new router object
const router = express.Router();
// Import the validation schemas for creating and updating books
const { createBookSchema, updateBookSchema } = require('../validators/bookValidator');

// Sample book data
let books = [{ id: 1, title: 'Intro to JavaScript', author: 'JK Rowling' }];

// Helper function to validate request data using Joi schema
function validate(schema, payload) {
    const { error } = schema.validate(payload); // Validate the payload against the schema
    if (error) {
        return error.details[0].message; // Return the first error message if validation fails
    }
    return null; // Return null if validation succeeds
}

// Helper function to format the response in a consistent way
function formatResponse(data, message = 'Success', status = 'success') {
    return { status, message, data }; // Return the formatted response object
}

// Route to list all books with pagination
router.get('/', (req, res) => {
    const { page = 1, limit = 5 } = req.query; // Get page and limit query parameters, default to page 1, limit 5

    const startIndex = (page - 1) * limit; // Calculate the start index for pagination
    const endIndex = page * limit; // Calculate the end index for pagination

    const paginatedBooks = books.slice(startIndex, endIndex); // Extract the books for the current page

    const response = formatResponse(paginatedBooks, 'Books retrieved successfully'); // Format the response

    // Send the paginated response with additional pagination info
    res.json({
        ...response,
        pagination: {
            currentPage: parseInt(page, 10), // Current page number
            totalPages: Math.ceil(books.length / limit), // Total number of pages
            totalItems: books.length, // Total number of items
            itemsPerPage: parseInt(limit, 10) // Number of items per page
        }
    });
});

// Route to get a book by its ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert the ID parameter to an integer
    const book = books.find(book => book.id === id); // Find the book with the matching ID

    if (book) {
        // If the book is found, send the response
        res.json(formatResponse(book, 'Book retrieved successfully'));
    } else {
        // If the book is not found, send a 404 Not Found response
        res.status(404).json(formatResponse(null, 'Book not found', 'error'));
    }
});

// Route to create a new book
router.post('/', (req, res) => {
    const errorMessage = validate(createBookSchema, req.body); // Validate the request body using Joi schema
    if (errorMessage) {
        // If validation fails, send a 400 Bad Request response
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    const book = {
        id: books.length + 1, // Generate a new ID for the book
        title: req.body.title, // Get the title from the request body
        author: req.body.author // Get the author from the request body
    };
    books.push(book); // Add the new book to the books array
    res.status(201).json(formatResponse(book, 'Book created successfully')); // Send a 201 Created response
});

// Route to update an existing book by its ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert the ID parameter to an integer
    const book = books.find(b => b.id === id); // Find the book with the matching ID

    if (!book) {
        // If the book is not found, send a 404 Not Found response
        return res.status(404).json(formatResponse(null, 'Book not found', 'error'));
    }

    const errorMessage = validate(updateBookSchema, req.body); // Validate the request body using Joi schema
    if (errorMessage) {
        // If validation fails, send a 400 Bad Request response
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    // Update the book fields only if provided in the request body
    if (req.body.title) {
        book.title = req.body.title;
    }
    if (req.body.author) {
        book.author = req.body.author;
    }

    res.json(formatResponse(book, 'Book updated successfully')); // Send the updated book response
});

// Route to delete a book by its ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert the ID parameter to an integer
    const initialLength = books.length; // Store the initial length of the books array

    books = books.filter(b => b.id !== id); // Filter out the book with the matching ID

    if (books.length === initialLength) {
        // If no book was deleted, send a 404 Not Found response
        return res.status(404).json(formatResponse(null, 'Book not found', 'error'));
    }

    res.status(204).send(); // Send a 204 No Content response on successful deletion
});

// Export the router module for use in the main application
module.exports = router;