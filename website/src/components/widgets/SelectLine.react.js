import React from 'react';


export default class SelectLine extends React.Component {
  
  render() {
    const optionsRender = this.props.data.map(function(item, i){
      return (
        <option value={item.id} key={i}>{item.name}</option>
      );
    });
    return (
      <select onChange={this.props.handleChange}>
        <option value="">{this.props.defaultMsg}</option>
        {optionsRender}
      </select>
    );
  }
};
