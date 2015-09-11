'use strict';

var React = require('react');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;


var TableWidget = React.createClass({
    
    getHeader: function(data){
        var response = data.map(function(ref, i){
            return (
                <Col xs={ref.xs} key={i}>{ref.title}</Col>
            );
        });
        return (
            <Row>{response}</Row>
        );
    },

    getBody: function(data, dataRef){
        return data.map(function(item, i){
            var rowRender = dataRef.map(function(ref, j){
                return (
                    <Col xs={ref.xs} key={j}>
                        {eval(ref.property)}
                    </Col>
                );
            });
            return (
                <Row key={i}>
                    {rowRender}
                </Row>
            );
        });
    },

    render: function() {
        var headerRender = this.props.children ? this.props.children : this.getHeader(this.props.dataRef),
            bodyRender = this.getBody(this.props.data, this.props.dataRef);
        return (
            <div id={this.props.id}>
                {headerRender}
                {bodyRender}
            </div>
        );
    }
});

module.exports = TableWidget;
