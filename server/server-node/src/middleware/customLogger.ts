
const winston = require('winston'),
expressWinston = require('express-winston');

export const requestLogger = expressWinston.logger({
    transports: [
      new winston.transports.File({ 
          filename: 'combined.log' ,
          json: true,
      }),
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ 
            filename: 'error.log' ,
            json: true,
        }),
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
});
