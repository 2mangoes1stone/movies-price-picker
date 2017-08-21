require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheapestMovieRouter = require('./routes/cheapestMovierouter');
const moviesListRouter = require('./routes/moviesListRouter');

// kick off express server
const server = express();

// middleware
server.use(bodyParser.json());

// CORS
server.use(cors({
  origin: process.env.CORS_ORIGINS,
}));

// Use imported routes
server.use('/api', [
  cheapestMovieRouter,
  moviesListRouter
])

// set up error response in json
server.use((error, req, res, next) => {
  const status = error.status || 500
  res.status(status).json({
    error: { message: error.message }
  });
}); 

// Start local server
server.listen(8000, () => {
  console.log(`Server listening on port: 8000`);
});