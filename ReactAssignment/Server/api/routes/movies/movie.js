var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');
var Movie = require('../../../models/movies/movie');
var app = express();


router.route('/movies')
// Get all movies
    .get(function(req, res){
      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    })
// Search and save the movie
  .post(function(req, res) {
        imdbObj(req.body.Title, function (err, data) {
        if (data){
        var movie = new Movie();
        movie.Title = data.Title;
        movie.Year =  data.Year;
        movie.Rated = data.Rated;
        movie.Released = data.Released;
        movie.Runtime = data.Runtime;
        movie.Genre = data.Genre;
        movie.Director = data.Director;
        movie.Writer = data.Writer;
        movie.Actors = data.Actors;
        movie.Plot = data.Plot;
        movie.Language = data.Language;
        movie.Country = data.Country;
        movie.Awards = data.Awards;
        movie.Poster = data.Poster;
        movie.Metascore = data.Metascore;
        movie.imdbRating = data.imdbRating;
        movie.imdbVotes = data.imdbVotes;
        movie.imdbID = data.imdbID;
        movie.Type = data.Type;
        movie.Response = data.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Movie added!' });
              });
            }else {
              res.send(err);
            }
            });
        });

        router.route('/movies/render')
        .get(function(req,res){
          Movie.find({}, function (err, movies) {
            res.json(movies);
          })

        });

        router.route('/movies/:movietitle')
        .delete(function(req,res){
          var mTitle = req.params.movietitle;
          Movie.remove({ Title: mTitle },function (err) {
            if (err) {
              console.error(err);
              res.send("Error while saving");
            }
            res.send(mTitle+" data removed");
          });
        });

      router.route('/movies/add')
      // Save movie
        .post(function(req, res) {
              var movie = new Movie();
              movie.Title = req.body.Title;
              movie.Year =  req.body.Year;
              movie.Poster = req.body.Poster;
              movie.Rated = req.body.Rated;
              movie.Released = req.body.Released;
              movie.Runtime = req.body.Runtime;
              movie.Genre = req.body.Genre;
              movie.Director = req.body.Director;
              movie.Writer = req.body.Writer;
              movie.Actors = req.body.Actors;
              movie.Plot = req.body.Plot;
              movie.Awards = req.body.Awards;
              movie.imdbRating = req.body.imdbRating;
              movie.imdbID = req.body.imdbID;
              movie.save(function(err) {
                  if (err)
                      res.send(err);
                  res.json({ message: 'Movie added!' });
                    });
                  });
// // Route to get all movies and save a movie
//     router.route('/movies/:movie_id')
// // Get the movie by id
//           .get(function(req, res) {
//             Movie.findById(req.params.movie_id, function(err, movie) {
//                 if (err)
//                     res.send(err);
//                 res.json(movie);
//             });
//         })
// // Update the movie by id
//         .put(function(req, res) {
//         Movie.findById(req.params.movie_id, function(err, movie) {
//             if (err)
//                 res.send(err);
//             movie.Title = 'Hello';
//             movie.save(function(err) {
//                 if (err)
//                     res.send(err);
//                 res.json({ message: 'Movie updated!' });
//             });
//         });
//     })
//     .delete(function(req, res) {
//         Movie.remove({
//             _id: req.params.movie_id
//         }, function(err, movie) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Successfully deleted' });
//         });
//     });
    module.exports= router;
