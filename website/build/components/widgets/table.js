'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;


var TableWidget = React.createClass({displayName: "TableWidget",
    
    getHeader: function(data){
        var response = data.map(function(ref, i){
            return (
                React.createElement(Col, {xs: ref.xs, key: i}, ref.title)
            );
        });
        return (
            React.createElement(Row, null, response)
        );
    },

    getBody: function(data, dataRef){
        return data.map(function(item, i){
            var rowRender = dataRef.map(function(ref, j){
                return (
                    React.createElement(Col, {xs: ref.xs, key: j}, 
                        eval(ref.property)
                    )
                );
            });
            return (
                React.createElement(Row, {key: i}, 
                    rowRender
                )
            );
        });
    },

    render: function() {
        var headerRender = this.props.children ? this.props.children : this.getHeader(this.props.dataRef),
            bodyRender = this.getBody(this.props.data, this.props.dataRef);
        return (
            React.createElement("div", {id: this.props.id}, 
                headerRender, 
                bodyRender
            )
        );
    }
});

module.exports = TableWidget;
