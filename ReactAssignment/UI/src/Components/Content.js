var React = require('react');
var MovieComponent = require("./MovieComponent");
var RatingComponent = require("./RatingComponent");
var Results = require("./Results");
var MoviesFromDb = require("./MoviesFromDb");
var Navbar = require("./Navbar");
var Content = React.createClass({
    getInitialState : function() {
      return({data:[],imdbobj:{},temp:[],dbObj:[]})
    },
    addMovie : function (movie) {
      if(movie === null){
        return;
      }
      var memory = this.state.data;
      memory.push(movie);
      this.setState({data:memory});
    },
    addimdbData:function(movie){
      console.log(movie.Title);
      this.setState({dbobj:movie,imdbobj:movie})
    },
    addToTemp:function(movie){

    },
    componentDidMount :function(){
         $.ajax({
               url : "http://localhost:8080/api/movies/render",
               dataType : 'json',
               type : "GET",
               cache : false,
               success : function(data){
                 this.setState({dbObj:data})
                 console.log(JSON.stringify(data));
               }.bind(this),
               error : function(xhr, status, err) {
               console.error("http://localhost:8080/api/movies/render", status, err.toString());
               }.bind(this)
             });
       },
       handleSaveMovie: function(e) {
          e.preventDefault();
          var Title = this.state.dbobj.Title;
          var Year = this.state.dbobj.Year;
          var imdbID = this.state.dbobj.imdbID;
          var Poster = this.state.dbobj.Poster;
          console.log(this.state.dbobj.Title);
          if (!Title || !Year || !imdbID || !Poster) {
              return;
          }
         $.ajax({
          url: "http://localhost:8080/api/movies/add",
          dataType: 'json',
          type: 'POST',
          data: this.state.dbobj,
          success: function(data) {
            console.log('saved');

          }.bind(this),
          error: function(xhr, status, err) {
            console.error("http://localhost:8080/api/movies/add", status, err.toString());
          }.bind(this)
        });
        //transition.redirect('/login', null, { redirect: transition.path });

        },
    render : function () {
      var movie = this.state.imdbobj;
      return(
        <div>
          <Navbar />
          <MovieComponent update ={this.addMovie}/>
          <div className="col-12 panel">
            <Results memory = {this.state.data} imdbMovie={this.addimdbData} />
            <MoviesFromDb mydb = {this.state.dbObj}  imdbMovie={this.addimdbData}/>
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Movie: {movie.Title}</h4>
                  </div>
                  <div className="modal-body">

                  <div className="row">
                    <img src = {movie.Poster} className = "img-thumbnail"/>
                    <div className="col-md-6">
                      <h3>{movie.Title}</h3>
                      <p>Year:{movie.Year}</p>
                      <p>Actors:{movie.Actors}</p>
                      <p>Director:{movie.Director}</p>
                      <p>{movie.Plot}</p>
                      <p>
                      <span className="glyphicon glyphicon-calendar"></span>
                        {movie.Released}
                      <span> | </span>
                      <span >
                        <b>Rating: <RatingComponent rdata={movie.imdbRating} />
                        </b>
                      </span>
                      <span> | </span>
                      <span>
                        <b>Awards:</b>
                        {movie.Awards}
                      </span>
                      </p>
                      <p><button data-dismiss="modal" onClick = {this.handleSaveMovie}>ADD TO DATABASE </button></p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }
});

module.exports = Content ;
