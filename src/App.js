import React, {Component} from 'react';
import './App.css';
import Chart from './Chart';
import * as d3 from 'd3';
import { Form, ToggleButton, ToggleButtonGroup, ButtonGroup, Container } from 'react-bootstrap';
import CountryData from './CountryData';

class App extends Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.countries = [];

    this.state = { 
      data: [],
      select: "France",
      range: 31,
      mode: "global"
    };

    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  getCountry() {
    this.data.forEach(d => {
      if (!this.countries.includes(d.location))
        this.countries.push(d.location);
    });
    this.countries.sort();
  }

  
  componentDidMount() {
    d3.csv("https://covid.ourworldindata.org/data/owid-covid-data.csv")
    .then(data => {
      this.data = data;
      this.getCountry();
      this.filterData();
    });
  }
  
  filterData() {
    var minDate = new Date(Date.now());
    minDate.setDate(minDate.getDate()-this.state.range);
    console.log("location : "+this.state.select+", range : "+this.state.range)
    this.setState({data:
       this.data.filter(d => (d.location === this.state.select && new Date(d.date) > minDate))});
  }

  handleChangeCountry(event) {
    this.setState({
      select: event.target.value
    }, () => {
      this.filterData();
    });
  }

  handleChangeRange(event) {
    this.setState({
      range: event.target.value
    }, () => {
      this.filterData();
    });
  }

  handleChangeMode(event) {
    this.setState({
      mode: event.target.value
    }, () => {
      this.filterData();
    });
  }

  render() {
    return (
      <Container>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Pays : </Form.Label>
          <Form.Control as="select" onChange={this.handleChangeCountry}>
              {this.countries.map((country) => (
                <option selected={country === this.state.select}>{country}</option>
              ))}
          </Form.Control>
          <CountryData data={this.state.data}></CountryData>
        </Form.Group>


        <ButtonGroup toggle onChange={this.handleChangeMode}>
        <ToggleButton type="radio" name="radio" defaultChecked value="global">
          global
        </ToggleButton>
        <ToggleButton  type="radio" name="radio" value="par_jour">
          par jour
        </ToggleButton>
        </ButtonGroup>

        <Chart data={this.state.data} mode={this.state.mode}></Chart>


        <ButtonGroup toggle onChange={this.handleChangeRange}>
        <ToggleButton type="radio" name="radio" defaultChecked value={7}>
          semaine
        </ToggleButton>
        <ToggleButton  type="radio" name="radio" value={31}>
          mois
        </ToggleButton>
        <ToggleButton type="radio" name="radio" value={365}>
          année
        </ToggleButton>
        </ButtonGroup>


      </Container>

    );
  }
}

export default App;