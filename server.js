// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Express server
const app = express();

// Initial PORT
const PORT = process.env.PORT || 8080;

// Sets up Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Router
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

// Listener
app.listen(PORT, function () {
  console.log(`App listening on PORT:${PORT}`);
});