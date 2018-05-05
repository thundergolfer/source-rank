/* Import dependencies */
import winston from 'winston';

/* Create a JSON logger */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

/* If we are not running in production then log to the console */
if ( process.env.NODE_ENV !== 'production' ) {
  logger.add( new winston.transports.Console({
    format: winston.format.simple()
  }));
}

/* Export the logger */
export default logger;
