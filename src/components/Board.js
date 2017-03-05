import React from 'react';
import Square from './Square'

var Board = React.createClass({
  checkForWin: function() {
    var past = 0;
    var won = false;
    for (var i = 0; i < 42; i ++) {
      if (this.state.gamestate[i][1] != 0) { //Valid starting position
        past = this.state.gamestate[i][1]

        if (i-3*8 >= 0 && i%7 >= 3) { //i is the start position
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z*8][1] != past) { //checks diagonally up and left
              won = false
              break
            }
          }
          if (won) return true;
        }
        if (i+3*8 <= 42 && i%7 <= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z*8][1] != past) { //diagonally down and right
              won = false
              break
            }
          }
          if (won) return true;
        }
        if (i-3*6 >= 0 && i%7 <= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z*6][1] != past) { //diagonally up and right
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i+3*6 <= 42 && i%7 >= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z*6][1] != past) { //diagonally down and left
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i%7 >= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - z][1] != past) { //horizontally left
              won = false
              break
            }
          }
          if (won) return true
        }
        if (i%7 <= 3) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + z][1] != past) { //horizontally right
              console.log(i+z)
              won = false
              break
            }
          }
          if (won) return true
        }
        if (i - 7 *3 >= 0) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i - 7*z][1] != past) { //vertically up
              won = false
              break
            }
          }
          if (won) alert("WINNER")
        }
        if (i + 7 *3 < 42) {
          won = true
          for (var z = 1; z < 4; z ++) {
            if (this.state.gamestate[i + 7*z][1] != past) { //vertically down
              won = false
              break
            }
          }
          if (won) return true
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
      if (this.checkForWin()) {
        var winner = this.state.currentturn == 1 ? "Blue" : "Red"
        alert(winner + " Wins!")
        this.props.gameOver(winner);
      }
      this.state.currentturn = this.state.currentturn == 1 ? 2: 1 //blue is 1, red is 2
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
