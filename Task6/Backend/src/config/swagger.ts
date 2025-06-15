import swaggerJsdoc from "swagger-jsdoc";
import env from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task6 API Documentation",
      version: "1.0.0",
      description: "API documentation for Task6 application",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

// Validate the swagger spec
if (!swaggerSpec.paths || Object.keys(swaggerSpec.paths).length === 0) {
  console.warn("Warning: No API paths found in Swagger documentation");
}

export { swaggerSpec };
