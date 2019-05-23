import React, { Component } from 'react';
import { suggestions } from './utils/config';
import Header from './components/common/Header';
import Autosuggest from './components/Autosuggest';
import Accordion from './components/Accordion';


class App extends Component {
  state = {
    cities: null,
  }

  setCities = (cities) => this.setState({ cities: [...cities] });

  render() {
    const { cities } = this.state;
    const cityList = cities ? 
      <Accordion cities={cities} /> : 'Choose country and see some dirty cities';

    return (
      <div className="container">
        <Header />
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
