var React = require('react');
var MoviesFromDb = React.createClass({
  handleDeleteMovie: function(e) {

     e.preventDefault();
     console.log("Hello");
     var ref =this.props.imdbMovie;
    //  var Title = this.state.dbobj.Title;
     console.log(ref.Title);
     if (!Title || !Year || !imdbID || !Poster) {
         return;
     }
    $.ajax({
     url: "http://localhost:8080/api/movies/"+ref.Title,
     dataType: 'json',
     type: 'DELETE',
     data: this.state.dbobj,
     success: function(data) {
       console.log('Deleted');
     }.bind(this),
     error: function(xhr, status, err) {
       console.error("http://localhost:8080/api/movies/"+ref.Title, status, err.toString());
     }.bind(this)
   });
   },
  render:function() {
    var data = this.props.mydb;

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
              <button className="btn btn-primary submit-btn" onClick = {this.handleDeleteMovie}  >Remove</button>
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

module.exports = MoviesFromDb ;
