'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';

const SelectWidget = require('./widgets/select');
const SelectLine = require('./select-line');
const linesData = require('../../lib/lines.js');
const stations = linesData[0].stations;


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {lines: []};
  }

  componentDidMount() {
    var apiURL = 'http://127.0.0.1:8000/api/metra/lines/';
    axios.get(apiURL)
      .then(function (response) {
        console.log(response.data);
        this.setState({
          lines: response.data
        })
      }.bind(this))
      .catch(function (response) {
        console.log(response);
      })
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

  handleClick(e) {
    console.log('handleClick');
    e.preventDefault();
    this.context.router.transitionTo('schedule');
  }

  handleChange(e) {
    console.log('handleChange');
    console.log(e.target.value);
  }
};

Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};
