const dotenv = require('dotenv');
// Initialize the environment configuration
dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import passport from 'passport';
import strategy from './middleware/passport-custom';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));



passport.use(strategy);
app.use(passport.initialize());


app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(middleware({ config }));

// The database function returns the models.
const models = db(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
app.models = models;
// Attach the models to the request object
// so we can reach it in middleware and routes
app.use((req, res, next) => {
	req.models = models;
	return next();
});
// api router
app.use('/api', api({ config }, app));
app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
