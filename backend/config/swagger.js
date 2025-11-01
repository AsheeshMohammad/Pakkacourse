import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PakkaCourse API Documentation',
      version: '1.0.0',
      description: `
# PakkaCourse Backend API

Complete API documentation for PakkaCourse backend services.

## Features
- 🔐 **Authentication**: User login, registration, and profile management
- 🔗 **Links Management**: Create, read, update, and delete dashboard links
- 🍪 **Session Support**: Automatic token storage in sessions
- 🔑 **Dual Auth**: Support for both Bearer tokens and session-based authentication

## Getting Started
1. **Login** using the \`POST /api/auth/login\` endpoint
2. Token is automatically stored in your session
3. All authenticated endpoints will work automatically

## Authentication Methods
- **Session-based**: Login once, token stored automatically (recommended for Swagger UI)
- **Bearer Token**: Manual token in Authorization header
      `,
      contact: {
        name: 'PakkaCourse Team',
        email: 'support@pakkacourse.com'
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization operations - Login User, Register New User, Get Current User Profile, Logout User'
      },
      {
        name: 'Links',
        description: 'Dashboard links management operations - Get All Links, Get Link By ID, Insert or Update Links, Delete Link'
      }
    ],
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'https://api.pakkacourse.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        },
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session-based authentication using cookies'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID'
            },
            username: {
              type: 'string',
              description: 'Username'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role'
            }
          }
        },
        Link: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Link ID'
            },
            linkname: {
              type: 'string',
              description: 'Name of the link'
            },
            link: {
              type: 'string',
              format: 'uri',
              description: 'URL of the link'
            },
            linktype: {
              type: 'string',
              description: 'Type/category of the link'
            }
          },
          required: ['linkname', 'link', 'linktype']
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Username'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Username'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              description: 'User password (minimum 6 characters)'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean'
            },
            message: {
              type: 'string'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                },
                token: {
                  type: 'string',
                  description: 'JWT authentication token'
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string'
            },
            data: {
              type: 'object'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        sessionAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;