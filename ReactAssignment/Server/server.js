var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var jwt = require('jsonwebtoken');
var movie = require('./api/routes/movies/movie');
var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', "verifyuser");
app.use('/', express.static(path.join(__dirname, '../UI/dist/')));
mongoose.connect("mongodb://localhost/mydb");
var db = mongoose.connection;
db.on('error', console.error.bind(console,'Connection error ...!!!!!'));
db.once('open',function(){
  console.log("Connected to MongoDB successfully");
})
app.use('/api', movie);
var port = 8080;
app.listen(port, function(){
  console.log("Server started at port :"+port);
});
