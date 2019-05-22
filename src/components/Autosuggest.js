import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCities } from '../utils/api';


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
    userInput: ""
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
    const { setCities } = this.props;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    }, () => { getCities(this.state.userInput).then(data => setCities(data)) });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { setCities } = this.props;

    if (e.keyCode === 13) { //enter
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion] || e.target.value
      }, () => { getCities(this.state.userInput).then(data => setCities(data)) });
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
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "suggestion-active";
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
          <div className="no-suggestions">
            <em>No suggestions, for {userInput}!</em>
          </div>
        );
      }
    }

    return (
      <section className="autosuggest">
        <input
          type="text"
          placeholder="Choose Country..."
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