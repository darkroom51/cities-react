import React, { Component } from 'react';
import PropTypes from "prop-types";
import Accordion from './Accordion';


class CitiesList extends Component {
	static propTypes = {
    cities: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    cities: []
  };
	
	render() {
		return (
			<section>
			<h2>Cities</h2>
			{this.props.cities ?
				<Accordion>
					{this.props.cities && this.props.cities.map((el,i) => (
						<div label={el} key={i}></div>
					))}
				</Accordion>
				: null}
			</section>
		)
	}
}

export default CitiesList;
