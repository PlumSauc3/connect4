import React from 'react';
//import logo from './logo.svg';
import Board from './components/Board'
import './App.css';

var App = React.createClass({
  componentWillMount() {
    this.setState({inGame: true})
  },

  endGame(winner) {
    setTimeout(() => this.setState({inGame: false, winner:winner}), 1000)
  },

  playAgain() {
    this.setState({inGame:true, winner:""})
  },

  render : function() {
    if (this.state.inGame)
      return <Board gameOver = {this.endGame} class="board"/>;
    else return (
      <div>
      <p>The game is over! {this.state.winner} won!</p>
      <button onClick={() => this.playAgain()}> Click here to play again</button>
      </div>
  )}
});

module.exports = App;
