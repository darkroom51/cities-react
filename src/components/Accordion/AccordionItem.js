import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { getCityDesc } from '../../utils/api';

class AccordionSection extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  state = {
    cityDesc: null,
    cityImage: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.label !== prevProps.label) {
      this.setState({ cityDesc: null, cityImage: null })
    }
  }

  onClick = () => {
    this.props.onClick(this.props.label);
    if (this.state.cityDesc) return;

    getCityDesc(this.props.label)
    .then(data => this.setState({ cityDesc: data.extract, cityImage: data.thumbnail.source }))
    .catch(err => this.setState({ cityDesc: 'Ups, unable to get description' }));
  };

  render() {
    const { 
      onClick, 
      props: { isOpen, label }, 
      state: {cityDesc, cityImage} 
    } = this;
    const imageSrc = cityImage ? cityImage : 'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=320';

    return (
      <div
        style={{
          background: isOpen ? "grey" : "lightgrey",
          border: "1px solid grey",
          padding: "5px 10px"
        }}
      >
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          {label}
          <div style={{ float: "right" }}>
            {!isOpen && <span>&#9650;</span>}
            {isOpen && <span>&#9660;</span>}
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              background: "lightgrey",
              border: "2px solid grey",
              marginTop: 10,
              padding: "10px 20px"
            }}
          >
            {cityDesc ?
              <div>
                <img src={imageSrc} alt="City View" />
                <div>{cityDesc}</div>
              </div>
              : 'Loading...'}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;