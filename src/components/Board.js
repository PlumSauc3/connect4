import React from 'react';
import Square from './Square'

var Board = React.createClass({
  componentWillMount: function() {
    var toPush = [];

    for (var j = 0; j < 6 * 7; j ++) {
        toPush.push([j,false])
    }
    this.setState({gamestate:toPush})
  },

  renderSquare : function(i) {
    return <Square value={i}/>;
  },

  handleChange : function(ind) {
    //console.log(this.state.gamestate)
    for (var y = 0; y <= 6; y ++) {
      if (ind - 7 * y < 0) {
        break
      }
      //console.log(this.state.gamestate[ind - 7*y])
      while (ind < 42)
        ind += 7
      ind -= 7
      if(this.state.gamestate[ind - 7*y][1] == false) {
        this.state.gamestate[ind - 7*y][1] = true;
        console.log("GOOD WORK DUDE")
        this.setState({gamestate: this.state.gamestate})
        break;
      }
    }
  },

  render: function() {
      return (
        <div className = {this.props.class}>
          {this.state.gamestate.map(function (n) {
           return <Square index={n[0]} onClick = {this.handleChange} taken = {n[1]}></Square>
          },this)}
      </div>
      )
  }

});

module.exports = Board;
