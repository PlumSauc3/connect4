import React from 'react';
//import logo from './logo.svg';
import Board from './components/Board'
import './App.css';

var App = React.createClass({
  componentWillMount() {
    this.setState({inGame: true})
  },

  endGame(winner) {
    this.setState({inGame: false, winner:winner})
  },

  render : function() {
    if (this.state.inGame)
      return <Board gameOver = {this.endGame} class="board"/>;
    else return <p>The game is over! {this.state.winner} won!</p>
  }
});

module.exports = App;
