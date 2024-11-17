import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spyne Car API',
      description: "API endpoints for managing cars, users, authentication, and image uploads.",
      contact: {
        name: "Abhay Mishra",
        email: "abhaym1205@gmail.com",
        url: "https://www.abhaymishra.in/"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:4000/",
        description: "Local server"
      },
    ]
  },
  apis: ['./routes/v1/auth/*.js', './routes/v1/car/*.js', './routes/v1/upload/*.js'], // Path to your router files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
