require('dotenv').config()

const express = require('express');
const app = express();
const swaggerui = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const bookRouter = require('./routes/books');
const reviewRouter = require('./routes/reviews');
const userRouter = require('./routes/users');

const port = 3000;

// middleware to parse JSON bodies
app.use(express.json());

// CRUD endpoints
app.use('/book', bookRouter);
app.use('/review', reviewRouter);
app.use('/user', userRouter);

// Swagger UI setup
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});