import React from 'react';
import Square from './Square'

var Board = React.createClass({
  componentWillMount: function() {
    var toPush = [];

    for (var j = 0; j < 6 * 7; j ++) {
        toPush.push([j,0])
    }
    this.setState({gamestate:toPush, currentturn:1})
  },

  renderSquare : function(i) {
    return <Square value={i}/>;
  },

  handleChange : function(ind) {
    for (var y = 0; y <= 6; y ++) {
      if (ind - 7 * y < 0) {
        break
      }
      while (ind < 42)
        ind += 7
      ind -= 7
      if(this.state.gamestate[ind - 7*y][1] == 0) {
        this.state.gamestate[ind - 7*y][1] = this.state.currentturn;
        this.state.currentturn = this.state.currentturn == 1 ? 2: 1
        console.log(this.state.currentturn)

        this.setState({gamestate: this.state.gamestate, currentturn:this.state.currentturn})
        break;
      }
    }
  },

  render: function() {
      return (
        <div className = {this.props.class}>
          {this.state.gamestate.map(function (n) {
           return <Square index={n[0]} onClick = {this.handleChange} player = {n[1]}></Square>
          },this)}
      </div>
      )
  }

});

module.exports = Board;
