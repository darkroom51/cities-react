import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import AccordionItem from './AccordionItem';


class Accordion extends Component {
  static propTypes = {
    cities: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    cities: []
  };

  state = { openSections: {} };

  onClick = label => {
    const { state: { openSections } } = this;
    const isOpen = !!openSections[label];

    this.setState({
      openSections: {
        [label]: !isOpen
      }
    });
  };

  render() {
    const {
      onClick,
      props: { cities },
      state: { openSections },
    } = this;

    return (
      <section className='accordion'>
        {cities && cities.map((city, i) => (
          <AccordionItem
            isOpen={!!openSections[city]}
            label={city}
            onClick={onClick}
            key={i}
          >
          </AccordionItem>
        ))}
      </section>
    );
  }
}

export default Accordion;