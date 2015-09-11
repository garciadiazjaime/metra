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


var SchedulePanel = React.createClass({

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
            <div>
                <h2 id="scheduleTitle">Union Pacific/ North line’s schedule <span className="small">From Zion to Kenosha</span></h2>
    
                <TableWidget data={schedule} dataRef={this.props.scheduleRef} id="scheduleTable">
                    <div className="row">
                        <div className="col-xs-3"><span className="hiddenXS">Scheduled</span> departure<span className="smallNote">*</span></div>
                        <div className="col-xs-3"><span className="hiddenXS">Scheduled</span> arrival<span className="smallNote">*</span></div>
                        <div className="col-xs-3">Time</div>
                        <div className="col-xs-3">Train</div> 
                    </div>
                </TableWidget>

                <Button onClick={this.handleClick}><span className="rightButtonDecoration">New search</span></Button>
                
                <p className="smallNote">* Scheduled time is displayed </p>
                
            </div>
        );
    }
});

module.exports = SchedulePanel;
