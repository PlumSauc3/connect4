import React from 'react';
//import logo from './logo.svg';
import Board from './components/Board'
import './App.css';

var App = React.createClass({
    render : function() {
        console.log(React.version)
      return <Board class = "board"/>;
    }
});

module.exports = App;
