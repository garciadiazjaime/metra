'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;


var SelectWidget = React.createClass({displayName: "SelectWidget",
    
    render: function() {
        var optionsRender = this.props.data.map(function(item, i){
            return (
                React.createElement("option", {value: item.id, key: i}, item.title)
            );
        });
        return (
            React.createElement("select", {onChange: this.props.handleChange}, 
                React.createElement("option", {value: ""}, this.props.defaultMsg), 
                optionsRender
            )
        );
    }
});

module.exports = SelectWidget;
