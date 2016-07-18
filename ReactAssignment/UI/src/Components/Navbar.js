var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({
    render: function() {
        return (
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">

                  <ul className="nav navbar-nav">
                    <li className="active"><Link to="/Home">Home</Link></li>
                    <li><Link to="/AddMovies">Add Movies</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
        )
    }
})

module.exports = Navbar;
