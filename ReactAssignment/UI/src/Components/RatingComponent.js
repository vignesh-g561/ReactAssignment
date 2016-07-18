var React = require('react');
var RatingComponent = React.createClass({
render: function(){
  var radata = Math.floor(this.props.rdata);
  var a=[];
  for(var i=0;i<radata;i++)
  {
    a.push(<span className="glyphicon glyphicon-star"></span>)
  }
  return(
    <span>{a}</span>
  )
}
});
module.exports = RatingComponent ;
