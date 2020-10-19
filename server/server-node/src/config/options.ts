import cors from 'cors';

export const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Authorizations',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: `http://localhost:4200`,
    preflightContinue: false,
};