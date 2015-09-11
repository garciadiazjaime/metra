'use strict';

var React = require('react');


var FooterSection = React.createClass({displayName: "FooterSection",

  render: function() {
    return (
        React.createElement("div", {className: "container"}, 
            React.createElement("p", null, 
                "Powered by",  
                React.createElement("a", {href: "http://mintitmedia.com/", title: "Mint IT Media - Design and web development", target: "_blank"}, "Mint")
            )
        )
    );
  }
});

module.exports = FooterSection;