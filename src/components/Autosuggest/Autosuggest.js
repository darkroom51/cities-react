import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { getCountryCode } from '../../utils/helpers';
import { getCities } from '../../utils/api';


class Autosuggest extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    setCities: PropTypes.func
  };

  static defaultProps = {
    suggestions: []
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  };

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    }, () => { this.getCities(); this.setUserInputToLS() });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) { //enter
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion] || e.target.value
      }, () => { this.getCities(); this.setUserInputToLS() });
    }
    else if (e.keyCode === 38) { //key up
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    else if (e.keyCode === 40) { //key down
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  setUserInputToLS = () => {
    if (!this.props.suggestions.includes(this.state.userInput)) return;
    localStorage.setItem('userInput', JSON.stringify(this.state.userInput));
  }

  getUserInputFromLS = () => {
    return JSON.parse(localStorage.getItem('userInput'));
  }

  componentDidMount() {
    const userInput = this.getUserInputFromLS();
    if (userInput) {
      this.setState({ userInput }, this.getCities);
    }
  }

  getCities = () => {
    const { setCities } = this.props;
    const countryCode = getCountryCode(this.state.userInput);

    if (countryCode) {
      getCities(countryCode)
        .then(data => setCities(data))
        .catch(err => console.log(err))
    }
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className='suggestions'>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className='no-suggestions'>
            <em>No suggestions, for {userInput}!</em>
          </div>
        );
      }
    }

    return (
      <section className='autosuggest'>
        <input
          type='text'
          className='autosuggest__input'
          placeholder='Choose Country...'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </section>
    );
  }
}

export default Autosuggest;