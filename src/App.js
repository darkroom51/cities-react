import React, {Component} from 'react';
import './styles/global.scss';
import {suggestions} from './utils/config';
import Autosuggest from './components/Autosuggest';


class App extends Component {
  state = {
    cities: null
  }

  setCities = (cities) => this.setState({cities:[...cities]});

  render() {
    console.log('app: ', this.state.cities);
    return (
      <div className="App">
        <Autosuggest 
          suggestions={suggestions}
          setCities={this.setCities}
        />
        {
          this.state.cities &&
          this.state.cities.map(el => <div>{el}</div>)
        }
      </div>
    );
  }
}

export default App;
