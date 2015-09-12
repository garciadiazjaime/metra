import React from 'react';
import {Button} from 'react-bootstrap';

const TableWidget = require('./Table.react');
const linesData = require('../../../lib/lines.js');
const schedule = linesData[0].stations[0].schedule;


export default class SchedulePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('handleClick');
    e.preventDefault();
    this.context.router.transitionTo('home');
  }

  render() {

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
};

SchedulePanel.contextTypes = {
  router: React.PropTypes.func.isRequired
};

SchedulePanel.defaultProps = {
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
};
