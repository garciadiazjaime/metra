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
        this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("div", {id: "aboutUs"}, 
                React.createElement("h1", null, React.createElement("em", null, "Hi!"), "Did you find this website useful?"), 
                
                React.createElement("p", null, "This is a non-profit project with no other purpose than giving information about Chicago’s train service departure and arrival hours, in a fast and practical matter."), 
                React.createElement("p", null, "All data is retrieved from ", React.createElement("a", {href: "http://metrarail.com/metra/en/home.html", target: "_blank"}, "Metra rail station’s official website"), " and we are not associated in way with ", React.createElement("a", {href: "http://metrarail.com/metra/en/home.html", target: "_blank"}, "Metra"), " or intend to impersonate their brand or website."), 
                React.createElement("p", null, "We are not responsible of any misinformation or inconvenients caused by de use or misuse of this webpage."), 
                React.createElement("p", null, "If you’ll like to get more information about us or this website please ", React.createElement("a", {href: "mailto:info@mintitmedia.com", title: "Contact Us"}, "contact us"), " in our email ", React.createElement("a", {href: "mailto:info@mintitmedia.com", title: "Contact Us"}, "info@mintitmedia.com")), 
                
                React.createElement(Button, {onClick: this.handleClick}, React.createElement("span", {className: "leftButtonDecoration"}, "Back to home"))
            )
        );
    }
});

module.exports = HomePanel;
