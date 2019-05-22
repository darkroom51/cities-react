import React, { Component } from 'react';
import './styles/global.scss';
import { suggestions } from './utils/config';
import Autosuggest from './components/Autosuggest';
import CitiesList from './components/CitiesList';


class App extends Component {
  state = {
    cities: null
  }

  setCities = (cities) => this.setState({ cities: [...cities] });

  render() {
    const { cities } = this.state;

    return (
      <div className="App">
        <Autosuggest
          suggestions={suggestions}
          setCities={this.setCities}
        />
        <CitiesList
          cities={cities}
        />
      </div>
    );
  }
}

export default App;
