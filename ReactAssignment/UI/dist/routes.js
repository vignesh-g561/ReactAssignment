var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Master = require('./Components/Master');
var Content = require('./Components/Content');
var Home = require('./Components/Home');
var HomePage = require('./Components/Home');
var MoviesFromDb = require('./Components/MoviesFromDb');

module.exports = (
<Route>
  <Route handler={Master}>
      <DefaultRoute handler={Home} name="Home" />
  </Route>
  <Route handler={Content} name="AddMovies" path="/AddMovies"/>
  <Route handler={HomePage} name="HomePage" path="/Home"/>
</Route>
);
