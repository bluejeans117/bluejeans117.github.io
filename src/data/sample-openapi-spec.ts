export const sampleEcommerceSpec = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description:
      'A comprehensive REST API for an e-commerce platform with authentication, product management, and order processing endpoints.',
    contact: {
      name: 'API Support',
      email: 'support@ecommerce-api.com',
      url: 'https://ecommerce-api.com/support',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'https://api.ecommerce.com/v1',
      description: 'Production server',
    },
    {
      url: 'https://staging-api.ecommerce.com/v1',
      description: 'Staging server',
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'User login',
        description: 'Authenticate a user and return access tokens',
        operationId: 'loginUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'user@example.com',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    minLength: 8,
                    example: 'securePassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    refreshToken: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        description:
          'Retrieve a paginated list of products with optional filtering',
        operationId: 'getProducts',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number for pagination',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1,
              example: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20,
              example: 20,
            },
          },
          {
            name: 'category',
            in: 'query',
            description: 'Filter by product category',
            required: false,
            schema: {
              type: 'string',
              example: 'electronics',
            },
          },
          {
            name: 'minPrice',
            in: 'query',
            description: 'Minimum price filter',
            required: false,
            schema: {
              type: 'number',
              minimum: 0,
              example: 10.99,
            },
          },
          {
            name: 'maxPrice',
            in: 'query',
            description: 'Maximum price filter',
            required: false,
            schema: {
              type: 'number',
              minimum: 0,
              example: 999.99,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Products retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Product',
                      },
                    },
                    pagination: {
                      $ref: '#/components/schemas/Pagination',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        description: 'Create a new product (requires admin privileges)',
        operationId: 'createProduct',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '403': {
            description: 'Forbidden - Admin privileges required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',
        description: 'Retrieve a specific product by its ID',
        operationId: 'getProductById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product ID',
            required: true,
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Product found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '404': {
            description: 'Product not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update product',
        description: 'Update an existing product (requires admin privileges)',
        operationId: 'updateProduct',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product ID',
            required: true,
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '404': {
            description: 'Product not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete product',
        description: 'Delete a product (requires admin privileges)',
        operationId: 'deleteProduct',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product ID',
            required: true,
            schema: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Product deleted successfully',
          },
          '404': {
            description: 'Product not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get user orders',
        description: 'Retrieve orders for the authenticated user',
        operationId: 'getUserOrders',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Filter by order status',
            required: false,
            schema: {
              type: 'string',
              enum: [
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
              ],
              example: 'pending',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Orders retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Order',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Orders'],
        summary: 'Create new order',
        description: 'Create a new order for the authenticated user',
        operationId: 'createOrder',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OrderInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Order created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          firstName: {
            type: 'string',
            example: 'John',
          },
          lastName: {
            type: 'string',
            example: 'Doe',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
            example: 'user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-01T00:00:00Z',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          name: {
            type: 'string',
            example: 'Wireless Headphones',
          },
          description: {
            type: 'string',
            example: 'High-quality wireless headphones with noise cancellation',
          },
          price: {
            type: 'number',
            format: 'float',
            example: 199.99,
          },
          category: {
            type: 'string',
            example: 'electronics',
          },
          stock: {
            type: 'integer',
            example: 50,
          },
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/images/headphones.jpg',
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-01T00:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-01T00:00:00Z',
          },
        },
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'category', 'stock'],
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
            example: 'Wireless Headphones',
          },
          description: {
            type: 'string',
            minLength: 1,
            maxLength: 1000,
            example: 'High-quality wireless headphones with noise cancellation',
          },
          price: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 199.99,
          },
          category: {
            type: 'string',
            minLength: 1,
            example: 'electronics',
          },
          stock: {
            type: 'integer',
            minimum: 0,
            example: 50,
          },
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri',
            },
            example: ['https://example.com/images/headphones.jpg'],
          },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          userId: {
            type: 'string',
            example: '507f1f77bcf86cd799439012',
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/OrderItem',
            },
          },
          totalAmount: {
            type: 'number',
            format: 'float',
            example: 399.98,
          },
          status: {
            type: 'string',
            enum: [
              'pending',
              'processing',
              'shipped',
              'delivered',
              'cancelled',
            ],
            example: 'pending',
          },
          shippingAddress: {
            $ref: '#/components/schemas/Address',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-01T00:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-01T00:00:00Z',
          },
        },
      },
      OrderInput: {
        type: 'object',
        required: ['items', 'shippingAddress'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['productId', 'quantity'],
              properties: {
                productId: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011',
                },
                quantity: {
                  type: 'integer',
                  minimum: 1,
                  example: 2,
                },
              },
            },
          },
          shippingAddress: {
            $ref: '#/components/schemas/Address',
          },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            example: '507f1f77bcf86cd799439011',
          },
          product: {
            $ref: '#/components/schemas/Product',
          },
          quantity: {
            type: 'integer',
            example: 2,
          },
          price: {
            type: 'number',
            format: 'float',
            example: 199.99,
          },
        },
      },
      Address: {
        type: 'object',
        required: ['street', 'city', 'state', 'zipCode', 'country'],
        properties: {
          street: {
            type: 'string',
            example: '123 Main St',
          },
          city: {
            type: 'string',
            example: 'New York',
          },
          state: {
            type: 'string',
            example: 'NY',
          },
          zipCode: {
            type: 'string',
            example: '10001',
          },
          country: {
            type: 'string',
            example: 'USA',
          },
        },
      },
      Pagination: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            example: 1,
          },
          limit: {
            type: 'integer',
            example: 20,
          },
          total: {
            type: 'integer',
            example: 150,
          },
          totalPages: {
            type: 'integer',
            example: 8,
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Invalid credentials',
          },
          message: {
            type: 'string',
            example: 'The provided email or password is incorrect',
          },
          statusCode: {
            type: 'integer',
            example: 401,
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'User authentication and authorization endpoints',
    },
    {
      name: 'Products',
      description: 'Product management endpoints',
    },
    {
      name: 'Orders',
      description: 'Order management endpoints',
    },
  ],
};
