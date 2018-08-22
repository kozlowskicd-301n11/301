'use strict';

// ----Declaring Dependancies---- \\
require('dotenv').config(); // .env file for environment variables
const pg = require('pg'); // Postgres -- database
const express = require('express'); // Express -- network communication
const app = express(); // Defining variable 'app' for use with the Express object's methods
const PORT = process.env.PORT; // Looks in .env file for a matching variable and it's value, then uses it here
app.use(express.json()); // Allows Express to handle JSON format
app.use(express.urlencoded({ extended: true })); // Allows better use of data coming from '.post' requests
app.use(express.static('./public')); // Gives access to the '/public' folder for any network connections to the server

// ----Connecting to Database---- \\

const pgString = process.env.DATABASE_URL; // Looks in .env file for a 'DATABASE_URL' variable and retrieves that data, which is the key for the Postgres database in the Heroku app linked to this code
const client = new pg.Client(pgString); // The variable 'client' is used to make client queries to the database
client.connect(); // Connect to the database
client.on('error', error => { 
  console.error(error);       
}); // This uses the '.on' method to listen for database communication errors.  If there is any this will print the data that is returned as an error in the console


// ----Routing Requests---- \\

app.use(express.static('./public'));
app.get('/ejs', (request, response) => {
  response.sendFile('index.ejs', {root:'./views'});
}); // when a user navigates to the /ejs subdomain, the response will be to serve the user the 'index.ejs' file in the '/views' folder

// 404 Handler (This is last is Routing Requests!)
app.get('*', (request, response) => {
  response.status(404).send(`So, SO sorry but that's not theeeeeeeeeeeree`);
});

// ----Traffic Listener---- \\

app.listen(PORT, () => {
  console.log(`Server is live!!  Listening on this port: ${PORT}`);
}); // Listens for traffic on the specified port.  This is required to keep the code running more than one time. Without this, the code will cycle through once and then DIE