import React, {Component} from 'react';
import './App.css';
import Chart from './Chart';
import * as d3 from 'd3';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CountryData from './CountryData';

class App extends Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.countries = [];

    this.state = { 
      data: [],
      select: "France",
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);

  }

  getCountry() {
    this.data.forEach(d => {
      if (!this.countries.includes(d.location))
        this.countries.push(d.location);
    });
  }

  filterData(location) {
    this.setState({data: this.data.filter(d => d.location === location)});
  }
    
  componentDidMount() {
    d3.csv("http://localhost:3000/data.csv")
    .then(data => {
      this.data = data;
      this.getCountry();
      this.filterData("France");
    });
  }

  handleChange(event) {
    this.filterData(event.target.value);
  }

  render() {
    return (
      <div className="App-header">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <select onChange={this.handleChange}>
              {this.countries.map((country) => (
                <option selected={country === this.state.select}>{country}</option>
              ))}
          </select>
        </Form.Group>
        <CountryData data={this.state.data}></CountryData>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton value={1}>global</ToggleButton>
          <ToggleButton value={2}>par jour</ToggleButton>
        </ToggleButtonGroup>
        <Chart data={this.state.data}></Chart>
        <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
          <ToggleButton value={1}>semaine</ToggleButton>
          <ToggleButton value={2}>mois</ToggleButton>
          <ToggleButton value={3}>année</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default App;