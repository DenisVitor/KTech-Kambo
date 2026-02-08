import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const swaggerRouter = Router();

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0.0'
  },
  paths: {
    '/users': {
      get: {
        summary: 'Lista todos usuários (nome, email, avatar)',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'OK' } }
      }
    },
    '/users/{id}': {
      get: {
        summary: 'Detalhes completos do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default swaggerRouter;
