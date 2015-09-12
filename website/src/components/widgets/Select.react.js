import React from 'react';


export default class SelectWidget extends React.Component {
    
    render() {
        const optionsRender = this.props.data.map(function(item, i){
            return (
                <option value={item.id} key={i}>{item.name}</option>
            );
        });
        return (
            <select onChange={this.props.handleChange}>
                {optionsRender}
            </select>
        );
    }
};
