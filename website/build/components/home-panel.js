'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var SelectWidget = require('./widgets/select');

var linesData = require('../../lib/lines.js');
var stations = linesData[0].stations;


var HomePanel = React.createClass({displayName: "HomePanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        this.transitionTo('schedule');
    },

    handleChange: function(e){
        console.log('handleChange');
        console.log(e.target.value);
    },

    render: function() {

        return (
            React.createElement("div", null, 
                React.createElement("p", null, "Welcome to Easy Metra Chicago, where you can consult departure and arrival hours of Metra's rail service. "), 
                React.createElement("p", null, "Please enter the following information."), 
                React.createElement("label", null, "Your train line"), 
                React.createElement("div", {className: "selectWrap"}, 
                    React.createElement(SelectWidget, {data: linesData, defaultMsg: "Select train line", name: "line", handleChange: this.handleChange})
                ), 
                React.createElement("div", {className: "stationRow"}, 
                    React.createElement("label", null, "Your departing station"), 
                    React.createElement("div", {className: "selectWrap"}, 
                        React.createElement(SelectWidget, {data: stations, defaultMsg: "Select station a", name: "stationFrom", handleChange: this.handleChange})
                    )
                ), React.createElement("div", {className: "stationRow"}, 
                    React.createElement("label", null, "Your destination station"), 
                    React.createElement("div", {className: "selectWrap"}, 
                        React.createElement(SelectWidget, {data: stations, defaultMsg: "Select station b", name: "stationTo", handleChange: this.handleChange})
                    )
                ), 
                React.createElement(Button, {onClick: this.handleClick}, React.createElement("span", {className: "rightButtonDecoration"}, "View Schedule"))
            )
        );
    }
});

module.exports = HomePanel;
