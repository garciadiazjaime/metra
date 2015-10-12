import React from 'react';
import {Button} from 'react-bootstrap';

import RideTableWidget from './widgets/RideTable.react.jsx';
import LineActions from '../actions/LineActions';
import LineStore from '../stores/LineStore';


function getRideState() {
  return {
    ride: LineStore.getRide(),
    labels: LineStore.getLabels()
  };
}


export default class SchedulePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = getRideState();
  }

  componentDidMount() {
    const dayName = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    LineStore.addChangeListener(this._onChange);
    LineActions.requestSchedule(this.props.params.line, this.props.params.stationFrom, this.props.params.stationTo, dayName.indexOf(this.props.params.day));
  }

  componentWillUnmount() {
    LineStore.resetRide();
    LineStore.removeChangeListener(this._onChange);
  }

  render() {

    return (
      <div>
        <h2 id="scheduleTitle">{this.state.labels.line}&#39;s Schedule <span className="small">From {this.state.labels.stationFrom} to {this.state.labels.stationTo}</span></h2>
  
        <RideTableWidget data={this.state.ride} id="scheduleTable" />

        <Button onClick={this.handleClick}><span className="rightButtonDecoration">New search</span></Button>
        
        <p className="smallNote">* Scheduled time is displayed </p>
        
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.context.router.transitionTo('home');
  }

  _onChange() {
    this.setState(getRideState());
  }
};

SchedulePanel.contextTypes = {
  router: React.PropTypes.func.isRequired
};
