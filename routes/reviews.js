const express = require('express');
const router = express.Router();
const { createReviewSchema, updateReviewSchema} = require('../validators/reviewValidator');

let reviews = [{ id: 1, bookId: 1, userId: 'farah', content: 'Good reading!', rating: 5}]

// Helper function to validate request data
function validate(schema, payload) {
    const {error} = schema.validate(payload);
    if (error) {
        return error.details[0].message;
    }
    return null;
}

// Helper function for response formatting
function formatResponse(data, message = 'Success', status = 'success') {
    return {status, message, data};
}

// List all the reviews with pagination
router.get('/', (req, res) => {
    const { page = 1, limit = 5} = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedReview = reviews.slice(startIndex,endIndex);

    const response = formatResponse(paginatedReview, 'Review retrieved successfully');

    res.json({
        ...response,
        pagination: {
            currentPage: parseInt(page,5),
            totalPages: Math.ceil(reviews.length / limit),
            totalItems: reviews.length,
            itemsPerPage: parseInt(limit, 5)
        }
    });
});

// Get the review by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 5); // Get the ID from the request parameters
    const review = reviews.find(review => review.id === id); // Find the book with the matching ID
    
    if (review) {
        res.json(formatResponse(review, 'Review retrieved successfully'));
    } else {
        res.status(404).json(formatResponse(null, 'Review not found', 'error'));
    }
});

// Create a new review
router.post('/', (req, res) => {
    // validate request body using Joi
    const errorMessage = validate(createReviewSchema, req.body);
    if (errorMessage) {
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    const review = {
        id: reviews.length + 1,
        bookId: req.body.bookId,
        userId: req.body.userId,
        content: req.body.content,
        rating: req.body.rating,
    };
    reviews.push(review);
    res.status(201).json(formatResponse(review, 'Review created successfully'));
});

// Update the content or rating of a specific review by its ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 5);
    const review = reviews.find(r => r.id === id);

    if (!review) {
        res.status(404).json(formatResponse(null, 'Review not found', 'error'));
    }

    // validate request body using Joi
    const errorMessage = validate(updateReviewSchema, req.body);
    if (errorMessage) {
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    // Update only if the fields are provided in the request body
    if (req.body.content) {
        review.content = req.body.content;
    }
    if (req.body.rating) {
        review.rating = req.body.rating;
    }

    res.json(formatResponse(review, 'Review updated successfully'));
});

// Delete the review by ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = reviews.length;

    reviews = reviews.filter(r => r.id !== id);

    if (reviews.length === initialLength) {
        res.status(404).json(formatResponse(null, 'Review not found', 'error'));
    }

    res.status(204).send();
});

module.exports = router;

