require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cheapestMovieRouter = require('./routes/cheapestMovierouter');

// kick off express server
const server = express();

// middleware
server.use(bodyParser.json());

// Use imported routes
server.use('/api', cheapestMovieRouter)

// set up error response in json
server.use((error, req, res, next) => {
  const status = error.status || 500
  res.status(status).json({
    error: { message: error.message }
  });
}); 

const port = process.env.PORT || 8000

// Start local server
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});