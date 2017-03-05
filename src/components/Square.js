import React from 'react';

var Square = React.createClass({
  handleClick: function() {
    this.props.onClick(this.props.index)
  },

  render: function() {
    var divstyle = {color: 'white'}
    if (this.props.taken)
       var divstyle = {color: 'blue'}
    return <div className="square" style = {divstyle} onClick = {this.handleClick}>{this.props.index}</div>;
  }
});

module.exports = Square;
