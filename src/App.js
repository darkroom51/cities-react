import React, { Component } from 'react';
import './styles/global.scss';
import { suggestions } from './utils/config';
import Autosuggest from './components/Autosuggest';
import Accordion from './components/Accordion';


class App extends Component {
  state = {
    cities: null
  }

  setCities = (cities) => this.setState({ cities: [...cities] });

  render() {
    const { cities } = this.state;
    const cityList = cities ? 
      <Accordion cities={cities} /> : 'Choose country and see some cities';

    return (
      <div className="container">
        <Autosuggest
          suggestions={suggestions}
          setCities={this.setCities}
        />
        {cityList}
      </div>
    );
  }
}

export default App;
