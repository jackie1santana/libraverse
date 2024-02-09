import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({});

const server = express();


const log = (...messages) => console.log(...messages);
const info = (...messages) => console.info(chalk.blue(...messages));
const warning = (...messages) => console.warn(...messages);
const error = (...messages) => console.error(chalk.red(...messages));

const serverPort = process.env.SERVER_PORT || 3000; // Fallback port if not defined in .env

const liveChatSocketPort = process.env.LIVE_CHAT_SOCKET_PORT;

server.get('/', (req, res) => {
    res.send('Hello World!');
});

//console.info(`💬 Live Chat Server hosted on ${liveChatServerPort}`);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(serverPort, () => {
    info(`🚀 Server running on port ${serverPort}`);
}).on('error', (err) => {
    error(`🛑 An error occurred starting the server: ${err.message}`);
    error(`🔌 Make sure that no other service is running on port ${serverPort} and that you have the necessary permissions.`);
});