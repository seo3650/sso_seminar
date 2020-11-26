const express = require('express');
const app = express();
const routes = require('./routes');
const Redis = require('ioredis')
const connectRedis = require('connect-redis')
const session = require('express-session');
const RedisStore = connectRedis(session)
const redisClient = new Redis(6379)
const cors = require('cors');

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.REDIS_SECRET,
	store: new RedisStore({
		client: redisClient
	}),
	cookie: {maxAge: 60000},
}))

app.use(cors({
	origin: process.env.ALLOWED_HOST,
	credentials: true
}))

app.set('jwt-secret', process.env.JWT_SECRET)

app.use('/api', routes);

module.exports = app;