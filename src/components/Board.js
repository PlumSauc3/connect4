import React from 'react';
import Square from './Square'

var Board = React.createClass({
  checkForWin: function() {
    var past = 0;
    var won = false;
    for (var i = 0; i < 42; i ++) {
      if (this.state.gamestate[i][1] != 0) { //Valid starting position
        past = this.state.gamestate[i][1]
        //check all the cases
        if (i+3*8 < 42 && i%7 <= 3) {
          //diagonally down and right
          won = false
          if (this.state.gamestate[i+24][1] == past &&
              this.state.gamestate[i+16][1] == past &&
              this.state.gamestate[i+8][1] == past)
            {
              this.state.gamestate[i][1] = 3
              this.state.gamestate[i+24][1] = 3
              this.state.gamestate[i+16][1] = 3
              this.state.gamestate[i+8][1] = 3
              this.setState({gamestate:this.state.gamestate})
              won = true
            }
          if (won) return true;
        }
        if (i+3*6 < 42 && i%7 >= 3) {
          //diagonally down and left
          won = false
          if (this.state.gamestate[i+18][1] == past &&
              this.state.gamestate[i+12][1] == past &&
              this.state.gamestate[i+6][1] == past)
            {
              this.state.gamestate[i][1] = 3
              this.state.gamestate[i+18][1] = 3
              this.state.gamestate[i+12][1] = 3
              this.state.gamestate[i+6][1] = 3
              this.setState({gamestate:this.state.gamestate})
              won = true
            }
          if (won) return true
        }
        if (i%7 >= 3) {
          //horizontal
          won = false
          if (this.state.gamestate[i-1][1] == past &&
              this.state.gamestate[i-2][1] == past &&
              this.state.gamestate[i-3][1] == past)
            {
              this.state.gamestate[i][1] = 3
              this.state.gamestate[i-1][1] = 3
              this.state.gamestate[i-2][1] = 3
              this.state.gamestate[i-3][1] = 3
              this.setState({gamestate:this.state.gamestate})
              won = true
          }
          if (won) return true
        }
        if (i - 7 *3 >= 0) {
          //vertical
          won = false
          if (this.state.gamestate[i-21][1] == past &&
              this.state.gamestate[i-14][1] == past &&
              this.state.gamestate[i-7][1] == past)
          {
            this.state.gamestate[i][1] = 3
            this.state.gamestate[i-21][1] = 3
            this.state.gamestate[i-14][1] = 3
            this.state.gamestate[i-7][1] = 3
            this.setState({gamestate:this.state.gamestate})
            won = true
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
  for (var y = 0; y <= 6; y ++) { //Places the piece in the lowest available spot
    if (ind - 7 * y < 0) {
      break
    }
    while (ind < 42)
      ind += 7
    ind -= 7
    if(this.state.gamestate[ind - 7*y][1] == 0) {
      this.state.gamestate[ind - 7*y][1] = this.state.currentturn;

      this.setState({gamestate: this.state.gamestate})
      this.state.currentturn = this.state.currentturn == 1 ? 2: 1 //blue is 1, red is 2
      this.setState({currentturn:this.state.currentturn})
      break;
    }
  }
  if (this.checkForWin()) { //Ends the game someone has won
    this.props.gameOver(this.state.currentturn == 2 ? "Blue" : "Red");
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
