import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  }
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./controllers/*.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

const app = express();

// Serve swagger docs the way you like (Recommendation: swagger-tools)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start your server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});