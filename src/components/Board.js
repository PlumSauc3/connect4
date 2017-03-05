import React from 'react';
import Square from './Square'

var Board = React.createClass({
  checkForWin: function(i) {
    var past = 0;
    var won = false;
    for (var i = 0; i < 42; i ++) {
      if (this.state.gamestate[i][1] != 0) { //Valid starting position
        past = this.state.gamestate[i][1]

        if (i-3*8 >= 0 && i%7 >= 3) { //i is the start position
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z*8][1] != past) {
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i+3*8 <= 42 && i%7 <= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z*8][1] != past) {
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        //working
        if (i-3*6 >= 0 && i%7 <= 3) { //i is the start position
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z*6][1] != past) {
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i+3*6 <= 42 && i%7 >= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z*6][1] != past) {
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i%7 -3 >= 0 && i%7 >= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z][1] != past) {
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i%7 +3 <= 6 && i%7 <= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z][1] != past) {
              console.log(i+z)
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i - 7 *3 >= 0) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - 7*z][1] != past) {
              console.log(i+z)
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i + 7 *3 < 42) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + 7*z][1] != past) {
              console.log(i+z)
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
      }
    }
  },

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
      this.setState({gamestate: this.state.gamestate, currentturn:this.state.currentturn})
      this.checkForWin(ind - 7*y)
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
