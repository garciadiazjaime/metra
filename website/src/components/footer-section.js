'use strict';

var React = require('react');


var FooterSection = React.createClass({

  render: function() {
    return (
        <div className="container">
            <p>
                Powered by 
                <a href="http://mintitmedia.com/" title="Mint IT Media - Design and web development" target="_blank">Mint</a>
            </p>
        </div>
    );
  }
});

module.exports = FooterSection;