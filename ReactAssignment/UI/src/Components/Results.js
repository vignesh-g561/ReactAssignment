var React = require('react');
var Results = React.createClass({
  render:function() {
    var data = this.props.memory;
    var ref =this.props.imdbMovie;
    var movieRender = data.map(function (movie,ind) {
      return(
        <div  key = {ind}>
          <div className="row">
            <img src = {movie.Poster} className = "img-thumbnail" />
            <div className="col-md-6">
              <h3>{movie.Title}</h3>
              <p>Year:{movie.Year}</p>
              <p>Actors:{movie.Actors}</p>
              <p>Director:{movie.Director}</p>
              <p>{movie.Plot}</p>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary submit-btn"  data-toggle="modal" data-target="#myModal" onClick = {(event) => ref(movie)} style={{"margin-left":"30px"}} >View</button>
            </div>
          </div>
        </div>
      );
    });
    return(
      <span>{movieRender}</span>
    );
  }
});

module.exports = Results ;
