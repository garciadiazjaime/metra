import React from 'react';


export default class SelectDay extends React.Component {
  
  render() {
    const dayNumber = new Date().getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const optionsRender = [0, 1, 2, 3, 4, 5, 6].map(function(i){
      return (
        <option value={(dayNumber + i) % 7 || 7} key={i}>{dayName[ (dayNumber + i) % 7 ]}</option>
      );
    });
    return (
      <select onChange={this.props.handleChange} value={this.props.selectedDay}>
        {optionsRender}
      </select>
    );
  }
};
