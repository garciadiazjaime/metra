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


var HomePanel = React.createClass({

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
            <div>
                <p>Welcome to Easy Metra Chicago, where you can consult departure and arrival hours of Metra&#39;s rail service. </p>
                <p>Please enter the following information.</p>
                <label>Your train line</label>
                <div className="selectWrap">
                    <SelectWidget data={linesData} defaultMsg="Select train line" name="line" handleChange={this.handleChange}/>
                </div>
                <div className="stationRow">
                    <label>Your departing station</label>
                    <div className="selectWrap">
                        <SelectWidget data={stations} defaultMsg="Select station a" name="stationFrom" handleChange={this.handleChange}/>
                    </div>
                </div><div className="stationRow">
                    <label>Your destination station</label>
                    <div className="selectWrap">
                        <SelectWidget data={stations} defaultMsg="Select station b" name="stationTo" handleChange={this.handleChange}/>
                    </div>
                </div>
                <Button onClick={this.handleClick}><span className="rightButtonDecoration">View Schedule</span></Button>
            </div>
        );
    }
});

module.exports = HomePanel;
