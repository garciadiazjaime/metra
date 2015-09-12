import React from 'react';
import {Button} from 'react-bootstrap';

import SelectWidget from './widgets/Select.react';
import SelectLine from './widgets/SelectLine.react';
import LineActions from '../actions/LineActions';
import LineStore from '../stores/LineStore';


function getLineState() {
  return {
    lines: LineStore.getLines(),
    stations: []
  };
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {lines: [], stations: []};
  }

  componentDidMount() {
    LineActions.requestLines();
    LineStore.addChangeListener(this._onChange.bind(this));
    this.setState({});
  }

  componentWillUnmount() {
    LineStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div>
        <p>Welcome to Easy Metra Chicago, where you can consult departure and arrival hours of Metra&#39;s rail service. </p>
        <p>Please enter the following information.</p>
        <label>Your train line</label>
        <div className="selectWrap">
          <SelectLine data={this.state.lines} defaultMsg="Select train line" name="line" handleChange={this.handleChange}/>
        </div>
        <div className="stationRow">
          <label>Your departing station</label>
          <div className="selectWrap">
            <SelectWidget data={this.state.stations} defaultMsg="Select station a" name="stationFrom" handleChange={this.handleChange}/>
          </div>
        </div><div className="stationRow">
          <label>Your destination station</label>
          <div className="selectWrap">
            <SelectWidget data={this.state.stations} defaultMsg="Select station b" name="stationTo" handleChange={this.handleChange}/>
          </div>
        </div>
        <Button onClick={this.handleClick}><span className="rightButtonDecoration">View Schedule</span></Button>
      </div>
    );
  }

  handleClick(e) {
    console.log('handleClick');
    e.preventDefault();
    this.context.router.transitionTo('schedule');
  }

  handleChange(e) {
    console.log('handleChange');
    console.log(e.target.value);
  }

  _onChange(){
    this.setState(getLineState());
  }
};

Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};
