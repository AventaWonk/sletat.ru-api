import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.initialCountries = [];
    this.state = {
      cities: [],
      countries: [],
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {


    fetch('http://module.sletat.ru/Main.svc/GetCountries')
      .then(response => response.json())
      .then((obj) => {
        this.initialCountries = obj.GetCountriesResult.Data;
        this.setState({
          countries: this.initialCountries,
        });
      });
  }

  handleChange(inputEvent) {
    let c = inputEvent.target.value;
    // if (!c) {
    //   this.setState({
    //     inputValue: inputEvent.target.value,
    //     countries: [],
    //   });
    //   return;
    // };

    let newCountries = [];
    for (var i = 0; i < Math.min(this.initialCountries.length, 4); i++) {
      if (this.initialCountries[i].Name.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
        newCountries.push(this.initialCountries[i]);
      }
    }

    this.setState({
      inputValue: inputEvent.target.value,
      countries: newCountries,
    });
  }

  render() {
    let countriesElement = this.state.countries.map((countrie, i) => {
      return <li className='list-group-item' key={i}>{countrie.Name}</li>;
    });

    return (
      <div>
        <div className="form-group">
          <input type="email" className="form-control"
          aria-describedby="emailHelp" placeholder="Просто начните вводить название страны..."
          value={this.state.inputValue} onChange={this.handleChange}/>

          <ul className="list-group">
            {countriesElement}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
