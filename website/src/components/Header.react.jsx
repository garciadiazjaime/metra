import React from 'react';
import {Button} from 'react-bootstrap';


export default class Header extends React.Component {

	render() {
		return (
			<div className="container">
				<h1 id="brand">
					<a onClick={this.handleClick.bind(this, 'home')} title="Return to home">
						<em>Branding</em>
						<span className="hidden">Metra Train schedules in Chicago</span>
					</a>
				</h1>
				<Button id="infoButton" onClick={this.handleClick.bind(this, 'aboutus')}>i</Button>
			</div>
		);
	}

	handleClick(goTo, e){
		e.preventDefault();
    this.context.router.transitionTo(goTo);
	}
};

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};
