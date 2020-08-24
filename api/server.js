require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter');
const articlesRouter = require('./articles/articlesRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/articles', articlesRouter);

server.get('/', (req, res) => res.status(200).json({ message: "server up." }));
server.get('/api', (req, res) => res.status(200).json({ message: "api up." }));

module.exports = server;