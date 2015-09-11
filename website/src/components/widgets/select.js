'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;


var SelectWidget = React.createClass({
    
    render: function() {
        var optionsRender = this.props.data.map(function(item, i){
            return (
                <option value={item.id} key={i}>{item.title}</option>
            );
        });
        return (
            <select onChange={this.props.handleChange}>
                <option value="">{this.props.defaultMsg}</option>
                {optionsRender}
            </select>
        );
    }
});

module.exports = SelectWidget;
