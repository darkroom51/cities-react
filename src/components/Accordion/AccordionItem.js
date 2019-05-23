import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getCityDesc } from '../../utils/api';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import noImage from '../../assets/images/no-image.jpeg';

class AccordionItem extends PureComponent {
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
      .catch(err => this.setState({ cityDesc: 'Ups, unable to get description :(' }));
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
      state: { cityDesc, cityImage }
    } = this;
    const imageSrc = cityImage ? cityImage : noImage;

    return (
      <div className={isOpen ? 'accordion__item open' : 'accordion__item'}>
        <div onClick={onClick} className='label'>
          {label}
          <div className='icon'>
            {!isOpen && <FaChevronDown />}
            {isOpen && <FaChevronUp />}
          </div>
        </div>
        {isOpen && (
          <div className='accordion__description'>
            {cityDesc ?
              <>
              <img src={imageSrc} alt={label} />
              <div>{cityDesc}</div>
              </>
              : 'Loading...'}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionItem;