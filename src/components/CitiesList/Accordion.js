import React, { Component } from "react";
import PropTypes from "prop-types";
import AccordionItem from "./AccordionItem";


class Accordion extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach(child => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

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
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div>
        {children.map((child, i) => (
          <AccordionItem
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
            key={i}
          >
          </AccordionItem>
        ))}
      </div>
    );
  }
}

export default Accordion;