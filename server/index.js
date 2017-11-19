//Main Starting Point of the Application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const app= express();

//DB setup
mongoose.connect('mongodb://localhost:27017/Auth', {
    useMongoClient: true
});



//App Setup

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use( bodyParser.urlencoded( {
    extended: true
}));
router(app);

//app.use(bodyParser.json({type: '*/*'}));

//Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);