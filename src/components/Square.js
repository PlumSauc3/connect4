import React from 'react';

var Square = React.createClass({
  handleClick: function() {
    this.props.onClick(this.props.index)
  },

  render: function() {
    var divstyle = {}
    if (this.props.player == 1)
       var divstyle = {backgroundColor: 'blue'}
    else if (this.props.player == 2)
      divstyle = {backgroundColor: "red"}
    else if (this.props.player == 3)
      divstyle = {backgroundColor: "green"}
    return <div className="square" style={divstyle} onClick={this.handleClick}></div>;
  }
});

module.exports = Square;
