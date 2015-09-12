'use strict';

import React from 'react';
import {Row, Col} from 'react-bootstrap';


export default class TableWidget extends React.Component {
  
  getHeader (data){
    const response = data.map(function(ref, i){
      return (
        <Col xs={ref.xs} key={i}>{ref.title}</Col>
      );
    });
    return (
      <Row>{response}</Row>
    );
  }

  getBody(data, dataRef) {
    return data.map(function(item, i){
        const rowRender = dataRef.map(function(ref, j){
            return (
                <Col xs={ref.xs} key={j}>
                    {eval(ref.property)}
                </Col>
            );
        });
        return (
            <Row key={i}>
                {rowRender}
            </Row>
        );
    });
  }

  render() {
    const headerRender = this.props.children ? this.props.children : this.getHeader(this.props.dataRef);
    const bodyRender = this.getBody(this.props.data, this.props.dataRef);
    return (
      <div id={this.props.id}>
        {headerRender}
        {bodyRender}
      </div>
    );
  }
};
