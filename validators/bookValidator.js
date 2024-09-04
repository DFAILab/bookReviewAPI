// Import the Joi validation library
const Joi = require('joi');

// Define a Joi schema for creating a new book
const createBookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(), // Title must be a string, 3 to 100 characters, and is required
    author: Joi.string().min(3).max(20).required()  // Author must be a string, 3 to 20 characters, and is required
});

// Define a Joi schema for updating an existing book
const updateBookSchema = Joi.object({
    title: Joi.string().min(3).max(100), // Title must be a string, 3 to 100 characters 
    author: Joi.string().min(3).max(20)  // Author must be a string, 3 to 20 characters
}).or('title', 'author'); // At least one of the fields ('title' or 'author') must be provided

// Export the validation schemas for use in other modules
module.exports = {
    createBookSchema,
    updateBookSchema
};