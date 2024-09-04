const Joi = require('joi');

const createReviewSchema = Joi.object({
    content: Joi.string().min(4).max(100).required(),
    rating: Joi.number().integer().min(1).max(5).required() // Ensure rating is an integer between 1 and 5
});

const updateReviewSchema = Joi.object({
    content: Joi.string().min(4).max(100),
    rating: Joi.number().integer().min(1).max(5) // Ensure rating is an integer between 1 and 5
}).or('content', 'rating'); // At least one of content or rating is required

module.exports = {
    createReviewSchema,
    updateReviewSchema
};
