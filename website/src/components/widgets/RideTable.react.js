import React from 'react';
import {Row, Col} from 'react-bootstrap';


export default class RideTable extends React.Component {

  getRideRender(data) {
    return data.map(function(item, i){
      return(
        <Row key={i}>
          <Col xs={3}>{item.time_start}</Col>
          <Col xs={3}>{item.time_end}</Col>
          <Col xs={3}></Col>
          <Col xs={3}>{item.train_num}</Col>
        </Row>
        );
    });
  }

  render() {
    const rideRender = this.props.data.length ? this.getRideRender(this.props.data) : null;

    return (
      <div id={this.props.id}>
        <Row>
          <Col xs={3}>Departure</Col>
          <Col xs={3}>Arrival</Col>
          <Col xs={3}>Time</Col>
          <Col xs={3}>Train</Col>
        </Row>
        {rideRender}
      </div>
    );
  }
};
