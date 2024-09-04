const Joi = require('joi');

// users validation
const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().pattern(new RegExp('goacademyai.com$')).required(),
    password: Joi.string().min(6).required(),  // Minimum length requirement for password

    });

const updateUserSchema = Joi.object({
    email: Joi.string().pattern(new RegExp('goacademyai.com$')),
    password: Joi.string().min(6)
    })

module.exports = {
    createUserSchema,
    updateUserSchema
};
    