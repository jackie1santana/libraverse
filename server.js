import express from 'express';
import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file'; // For log rotation
import chalk from 'chalk'; // For colorful log outputs
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

const app = express(); // Initialize the Express application

const httpServer = createServer(app);
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these methods
  }
});


dotenv.config(); // Load environment variables from .env file into process.env


// Initialize another Express app for the socket server, if needed



// Default to 3000 if SERVER_PORT is not defined in the environment variables
const serverPort = process.env.SERVER_PORT;
// Default to 3001 if LIVE_CHAT_SOCKET_PORT is not defined
const liveChatSocketServerPort = process.env.LIVE_CHAT_SOCKET_PORT;

const log = (...messages) => console.log(chalk.yellow(...messages));
const trace = (message) => {
    console.error(chalk.cyan(`🔍 TRACE: ${message}`));
    console.trace(); 
};
const info = (message) => console.info(chalk.blueBright(`ℹ️ INFO: ${message}`));
const warn = (message) => console.warn(chalk.yellow(`⚠️ WARNING: ${message}`));
const error = (message) => console.error(chalk.redBright(`❌ ERROR: ${message}`));

// Setup Winston logger with a custom configuration
const logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp({
      format: 'MM/DD/YYYY hh:mm:ss a', // Updated for 12-hour clock with AM/PM
    }),
    format.printf(info => 
      `${chalk.blue(`[${info.timestamp}]`)} ${chalk.green(info.level)}: ${info.message}`
      // Timestamp in blue, level in green, message remains default
    )
  ),
  transports: [
    // Console transport for outputting logs to the terminal
    new transports.Console({
      format: format.combine(
        format.colorize({ // Enable colorization for all console output
          all: true,
        }),
        format.printf(({ level, message, timestamp }) =>
          // Apply the same formatting as above for console output
          `${chalk.gray(`[${timestamp}]`)} ${level}: ${message}`
        )
      ),
    }),
    // DailyRotateFile transport for rotating log files daily
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log', // Filename pattern
      datePattern: 'YYYY-MM-DD', // Rotate daily
      maxSize: '20m', // Max size per log file
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
});

// Handle uncaught exceptions and promise rejections
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);
logger.rejections.handle(
  new transports.File({ filename: 'logs/rejections.log' })
);

// Define custom logging functions that utilize chalk for additional styling
const customLog = {
  info: (message) => logger.info(chalk.blueBright(message)), // Informational logs in blue
  error: (message) => logger.error(chalk.redBright(message)), // Error logs in red
  warn: (message) => logger.warn(chalk.yellow(message)), // Warnings in yellow
  trace: (message) => {
    logger.info(chalk.cyan(message)); // Traces in cyan
    console.trace(chalk.magenta('Trace:')); // Directly output a trace to the console in magenta
  },
};


// Custom Morgan token for colorful HTTP method
morgan.token('method', (req) => chalk.green(req.method));

// Custom Morgan token for IP address logging
morgan.token('remote-addr', (req) => chalk.magenta(req.headers['x-forwarded-for'] || req.connection.remoteAddress));

// Define custom Morgan tokens for additional details
morgan.token('user-id', (req) => `UserID: ${req.user ? req.user.id : 'Guest'}`);
morgan.token('session-id', (req) => `SessionID: ${req.sessionID || 'None'}`);
morgan.token('security-event', (req) => `SecurityEvent: ${req.securityEvent || 'None'}`);

morgan.token('user-id', (req) => req.user ? `UserID: ${req.user.id}` : 'UserID: Guest');
morgan.token('session-id', (req) => `SessionID: ${req.sessionID || 'None'}`);
morgan.token('security-event', (req) => req.securityEvent || 'SecurityEvent: None');
morgan.token('http-error', (req, res) => res.httpError || '');

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('An error occurred');
});

const detailedLogFormat = morgan((tokens, req, res) => {
  const logMessage = [
    chalk.hex('#FF5733')(`${tokens.method(req, res)}`), // Method colorized
    chalk.hex('#DAF7A6')(`${tokens.url(req, res)}`), // URL colorized
    tokens.status(req, res) >= 400 ? chalk.red(`${tokens.status(req, res)}`) : chalk.green(`${tokens.status(req, res)}`), // Status code colorized based on error/success
    chalk.hex('#C70039')(tokens['response-time'](req, res) + ' ms'), // Response time colorized
    chalk.hex('#FFC300')(`from ${tokens['remote-addr'](req, res)}`), // Remote address colorized
    chalk.hex('#581845')(tokens['user-id'](req, res)), // User ID colorized
    chalk.hex('#33FF57')(tokens['session-id'](req, res)), // Session ID colorized
    chalk.hex('#FF5733')(tokens['security-event'](req, res)), // Security event colorized
    tokens['http-error'](req, res) ? chalk.red(`Error: ${tokens['http-error'](req, res)}`) : '', // HTTP errors colorized
    // Add more custom tokens as needed
  ].filter(Boolean).join(' '); // Filter out empty strings
  return logMessage;
});


// Use the detailed log format with both webServer and socketServer
app.use(detailedLogFormat);
app.use(detailedLogFormat);
// Morgan middleware for HTTP request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));



// Example endpoint to demonstrate logging
// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   const cacheStatus = req.headers['if-none-match'] ? 'Hit' : 'Miss';
//   logger.info(`Cache status: ${chalk.yellow(cacheStatus)}`);
//   customLog.info('Served Hello World!'); // Log when the endpoint is hit
// });

// Start the web server and log the event
// app.listen(serverPort, () => {
//   customLog.info(`🚀 Node Web Server running on port ${serverPort}`);
//   customLog.info(`🌐 Click here to open in your browser: ${chalk.green(`http://localhost:${serverPort}`)}`);
// }).on('error', (err) => {
//   // Handle server start errors
//   customLog.error(`🛑 An error occurred starting the node web server: ${err.message}`);
//   customLog.trace('Attempting to start web server');
//   customLog.info(`💡 To free up the port, you can use the command: "lsof -i tcp:${serverPort}" followed by "kill -9 <PID>"`);
//   customLog.info(`🔗 Alternatively, you can manually open http://localhost:${serverPort} in your browser if the port becomes available.`);
// });


// Assuming previous setup code here'
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  logger.info(chalk.green(`💬 Live Chat: New connection established on port ${liveChatSocketServerPort}`));
  socket.emit('welcome', 'Welcome to the live chat!');

  socket.on('chat message', (msg) => {
    logger.info(chalk.cyan(`Message from ${msg.sender}: ${msg.text}`))
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


// Additional logging when the server starts
httpServer.listen(liveChatSocketServerPort, () => {
  logger.info(chalk.bgGreen(`💬 Live Chat WebSocket Server open on http://localhost:${liveChatSocketServerPort}`));
}).on('error', (error) => {
  logger.error(chalk.bgRed(`🛑 Server failed to start: ${error.message}`));
});

// Example of custom logging for error handling
process.on('uncaughtException', (error) => {
  logger.error(chalk.bgRed(`🛑 Uncaught Exception: ${error.message}`));
});

process.on('unhandledRejection', (reason, promise) => {
  logger.warn(chalk.bgYellow(`🛑 Unhandled Rejection at: ${promise}, reason: ${reason}`));
});



// Continuing from the previous setup...

// Assuming the socketServer is set up for handling WebSocket connections.
// This could be done using a library like 'ws' or 'socket.io' for real-time bi-directional communication.

// Example setup for the socket server listening
// app.listen(liveChatSocketServerPort, () => {
//     // Log when the socket server successfully starts
//     customLog.info(`💬 Node Live Chat Server hosted on ${liveChatSocketServerPort}`);
// }).on('error', (err) => {
//     // Handle socket server start errors
//     customLog.error(`🛑 An error occurred starting the node socket server: ${err.message}`);
//     customLog.trace('Attempting to start socket server');
//     // Provide helpful commands for troubleshooting common port issues
//     customLog.info(`💡 To free up the port, use: "lsof -i tcp:${liveChatSocketServerPort}" followed by "kill -9 <PID>"`);
//     customLog.info(`🔗 Alternatively, if the port becomes available, you can manually connect to the Live Chat Server.`);
// });

// Note: You'll need to replace this placeholder with your actual socket server implementation.
// For example, if 

// import express from 'express';
// import http from 'http';
// import dotenv from 'dotenv';
// import chalk from 'chalk';
// import open from 'open';

// dotenv.config({});

// const webServer = express();
// const socketServer = express();

// const serverPort = process.env.SERVER_PORT; 
// const liveChatSocketServerPort = process.env.LIVE_CHAT_SOCKET_PORT;

// const log = (...messages) => console.log(chalk.yellow(...messages));
// const trace = (message) => {
//     console.error(chalk.cyan(`🔍 TRACE: ${message}`));
//     console.trace(); 
// };
// const info = (message) => console.info(chalk.blueBright(`ℹ️ INFO: ${message}`));
// const warn = (message) => console.warn(chalk.yellow(`⚠️ WARNING: ${message}`));
// const error = (message) => console.error(chalk.redBright(`❌ ERROR: ${message}`));

// // Configure the Winston logger
// const logger = createLogger({
//     level: 'info', // Set the default log level to 'info'
//     format: format.combine(
//       format.timestamp({
//         format: 'YYYY-MM-DD HH:mm:ss' // Define the timestamp format for logs
//       }),
//       format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`) // Custom log format combining timestamp, log level, and message
//     ),
//     transports: [
//       // Console transport for logging in the terminal
//       new transports.Console({
//         format: format.combine(
//           format.colorize(), // Colorize log levels for better readability
//           format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`) // Use the same custom log format for console output
//         )
//       }),
//       // DailyRotateFile transport for logging into a file with daily rotation
//       new transports.DailyRotateFile({
//         filename: 'application-%DATE%.log', // Pattern for the log file name, %DATE% is replaced with the actual date
//         datePattern: 'YYYY-MM-DD', // How often to rotate, here it's set to daily
//         maxSize: '20m', // Maximum size of the log file before it's rotated
//         maxFiles: '14d' // Maximum age of a log file before it's deleted
//       })
//     ]
//   });
  

// webServer.get('/', (req, res) => {
//     res.send('Hello World!');
// });


// webServer.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// webServer.listen(serverPort, () => {
//     info(`🚀 Node Web Server running on port ${serverPort}`);
//     log(`🌐 Click here to open in your browser: ${chalk.green(`http://localhost:${serverPort}`)}`);
// }).on('error', (err) => {
//     error(`🛑 An error occurred starting the node web server: ${err.message}`);
//     trace('Attempting to start web server');
//     info(`💡 To free up the port, you can use the command: "lsof -i tcp:${serverPort}" followed by "kill -9 <PID>"`);
//     info(`🔗 Alternatively, you can manually open http://localhost:${serverPort} in your browser if the port becomes available.`);
// });

// socketServer.listen(liveChatSocketServerPort, () => {
//     info(`💬 Node Live Chat Server hosted on ${liveChatSocketServerPort}`);
// }).on('error', (err) => {
//     error(`🛑 An error occurred starting the node socket server: ${err.message}`);
//     trace('Attempting to start socket server'); 
//     info(`💡 To free up the port, use: "lsof -i tcp:${liveChatSocketServerPort}" followed by "kill -9 <PID>"`);
// });