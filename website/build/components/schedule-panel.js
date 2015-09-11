'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var TableWidget = require('./widgets/table');

var linesData = require('../../lib/lines.js');
var schedule = linesData[0].stations[0].schedule;


var SchedulePanel = React.createClass({displayName: "SchedulePanel",

    mixins : [ReactRouter.Navigation],

    getDefaultProps: function(){
        return {
            scheduleRef: [
                {
                    title: 'Departure',
                    property: 'item.departure',
                    xs: 3
                },
                {
                    title: 'Arrival',
                    property: 'item.arrival',
                    xs: 3
                },
                {
                    title: 'Time',
                    property: '',
                    xs: 3
                },
                {
                    title: 'Train',
                    property: 'item.train',
                    xs: 3
                },
            ]
        }
    },

    handleClick: function(){
        console.log('handleClick');
        this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("div", null, 
                React.createElement("h2", {id: "scheduleTitle"}, "Union Pacific/ North line’s schedule ", React.createElement("span", {className: "small"}, "From Zion to Kenosha")), 
    
                React.createElement(TableWidget, {data: schedule, dataRef: this.props.scheduleRef, id: "scheduleTable"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-3"}, React.createElement("span", {className: "hiddenXS"}, "Scheduled"), " departure", React.createElement("span", {className: "smallNote"}, "*")), 
                        React.createElement("div", {className: "col-xs-3"}, React.createElement("span", {className: "hiddenXS"}, "Scheduled"), " arrival", React.createElement("span", {className: "smallNote"}, "*")), 
                        React.createElement("div", {className: "col-xs-3"}, "Time"), 
                        React.createElement("div", {className: "col-xs-3"}, "Train")
                    )
                ), 

                React.createElement(Button, {onClick: this.handleClick}, React.createElement("span", {className: "rightButtonDecoration"}, "New search")), 
                
                React.createElement("p", {className: "smallNote"}, "* Scheduled time is displayed ")
                
            )
        );
    }
});

module.exports = SchedulePanel;
