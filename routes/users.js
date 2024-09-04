const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const { createUserSchema, updateUserSchema} = require('../validators/userValidator');

let users = [{ username: 'farah', email: 'farah.wan@goacademyai.com', password: '123' }];

// Helper function to validate request data
function validate(schema, payload) {
    const {error} = schema.validate(payload);
    if (error) {
        return error.details[0].message;
    }
    return null;
}

function formatResponse(data, message = 'Success', status = 'success') {
    return { status, message, data};
}
// List all users with pagination
router.get('/', (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUser = users.slice(startIndex, endIndex);

    const response = formatResponse(paginatedUser, 'Users retrieved successfully');

    res.json({
        ...response,
        pagination: {
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(users.length / limit),
            totalItems: users.length,
            itemsPerPage: parseInt(limit, 10)
        }
    });
});

// Get the user by username
router.get('/:username', (req, res) => {
    const { username } = req.params; // Get the username from the request parameters
    const user = users.find(u => u.username === username); // Find the user with the matching username
    
    if (user) {
        res.json(formatResponse(user, 'User retrieved successfully'));
    } else {
        res.status(404).json(formatResponse(null, 'User not found', 'error'));
    }
});

// Create a new user
router.post('/', async (req, res) => {
    // Validate request body using Joi
    const errorMessage = validate(createUserSchema, req.body);
    if (errorMessage) {
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    // Check if user already exists
    const existingUser = users.find(u => u.username === req.body.username || u.email === req.body.email);
    if (existingUser) {
        return res.status(409).json(formatResponse(null, 'User already exists', 'error'));
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        };
        users.push(user);
        res.status(201).json(formatResponse(user, 'User created successfully'));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Error creating user', 'error'));
    }
});

// Update the name or email of a specific user by username
router.put('/:username', async (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json(formatResponse(null, 'User not found', 'error'));
    }

    // Validate request body using Joi
    const errorMessage = validate(updateUserSchema, req.body);
    if (errorMessage) {
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    // Update only if the fields are provided in the request body
    if (req.body.name) {
        user.name = req.body.name;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }

    // Optionally update the password if provided
    if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
    }

    res.json(formatResponse(user, 'User updated successfully'));
});

// Delete the user by username
router.delete('/:username', (req, res) => {
    const { username } = req.params;
    const initialLength = users.length;

    users = users.filter(u => u.username !== username);

    if (users.length === initialLength) {
        return res.status(404).json(formatResponse(null, 'User not found', 'error'));
    }

    res.status(204).send();
});

// Registration endpoint
router.post('/register', async (req, res) => {
    // validate request body using Joi
    const errorMessage = validate(createUserSchema, req.body);
    if (errorMessage) {
        return res.status(400).json(formatResponse(null, errorMessage, 'error'));
    }

    // Check if user already exists
    const existingUser = users.find(u => u.username === req.body.username || u.email === req.body.email);
    if (existingUser) {
        return res.status(409).json(formatResponse(null, 'User already exists', 'error'));
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,  // Store hashed password
        };

        users.push(newUser);
        res.status(201).json(formatResponse(newUser, 'User registered successfully'));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Error registering user', 'error'));
    }
});

module.exports = router;