var React = require('react');
var MovieComponent = React.createClass({
  getInitialState : function() {
    return ({title : '',movieData :[]});
  },
  handleTitleChange : function (e) {
    this.setState({title : e.target.value});
  },
  submitHandler: function(e){
    var title = this.state.title;
    var newData = this.state.movieData;
    var url = "http://www.omdbapi.com/?s="+title;
    $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      var mydata = data.Search;
      var stateData = this.props.update;
      mydata.forEach(function(m){
        var urlImdb = "http://www.omdbapi.com/?i="+m.imdbID;

        $.ajax({
        url: urlImdb,
        dataType: 'json',
        cache: false,
        success: function(data1) {
          stateData(data1);
            newData.push(data1);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(urlImdb, status, err.toString());
        }.bind(this)
      });
    });

    this.setState({movieData:newData});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }.bind(this)
  });
  },
  render:function(){
    return(
      <div>
        <table className="table">
          <tr >
            <td>
              <input type="text" className="form-control" id="title" placeholder="Title"
              onChange={this.handleTitleChange}/>
            </td>
            <td>
              <button  onClick={this.submitHandler} className="btn btn-primary submit-btn"  >Search</button>
            </td>
          </tr>
        </table>


      </div>
    );
  }
});

module.exports = MovieComponent ;
