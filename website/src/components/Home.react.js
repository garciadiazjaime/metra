import React from 'react';
import {Button} from 'react-bootstrap';

import SelectStation from './widgets/SelectStation.react';
import SelectLine from './widgets/SelectLine.react';
import LineActions from '../actions/LineActions';
import LineStore from '../stores/LineStore';


function getLineState() {
  return {
    lines: LineStore.getLines(),
    stations: LineStore.getStations(),
    selectedLine: LineStore.getSelectedLine(),
    stationFrom: LineStore.getSelectedStations().stationFrom,
    stationTo: LineStore.getSelectedStations().stationTo
  };
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this._onChange = this._onChange.bind(this)
    this.state = getLineState();
  }

  componentDidMount() {
    LineStore.addChangeListener(this._onChange);
    LineActions.requestLines();
  }

  componentWillUnmount() {
    LineStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div>
        <p>Welcome to Easy Metra Chicago, where you can consult departure and arrival hours of Metra&#39;s rail service. </p>
        <p>Please enter the following information.</p>
        <label>Train line</label>
        <div className="selectWrap">
          <SelectLine data={this.state.lines} name="line" handleChange={this._onLineChange} selectedLine={this.state.selectedLine}/>
        </div>
        <div className="stationRow">
          <label>Departing station</label>
          <div className="selectWrap">
            <SelectStation data={this.state.stations} handleChange={this._onStationChange.bind(this, 'stationFrom')} selectedStation={this.state.stationFrom} />
          </div>
        </div><div className="stationRow">
          <label>Destination station</label>
          <div className="selectWrap">
            <SelectStation data={this.state.stations} handleChange={this._onStationChange.bind(this, 'stationTo')} selectedStation={this.state.stationTo} />
          </div>
        </div>
        <Button onClick={this.handleClick}><span className="rightButtonDecoration">View Schedule</span></Button>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    const selectedRide = this._getRideCodes(this.state.lines, this.state.stations, this.state.selectedLine, this.state.stationFrom, this.state.stationTo);
    this.context.router.transitionTo('schedule', selectedRide);
  }

  _onLineChange(e) {
    LineActions.requestSations(e.target.value);
  }

  _onStationChange(ref, e) {
    LineStore.setStation(ref, parseInt(e.target.value));
    this._onChange();
  }

  _getRideCodes(lines, stations, selectedLine, userStationFrom, userStationTo){

    const line = lines.filter(function(line){
      return line.id == selectedLine;
    });

    let stationFrom, stationTo;
    for(let i=0, len=stations.length; i<len; i++){
      if(stations[i].id === userStationFrom){
        stationFrom = stations[i].code;
      }
      // TODO: add validation to not allow select same station. Convert this if into an else if
      if(stations[i].id === userStationTo){
        stationTo = stations[i].code;
      }
      if(stationFrom && stationTo){
        break;
      }
    }
    
    return {
      line: line[0].code,
      stationFrom: stationFrom,
      stationTo: stationTo
    };
  }

  _onChange(){
    this.setState(getLineState());
  }
};

Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};
