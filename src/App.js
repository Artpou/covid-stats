import React, {Component} from 'react';
import './App.css';
import { Form, ToggleButton, ToggleButtonGroup, ButtonGroup, Container, Navbar, Nav, Button } from 'react-bootstrap';
import Chart from './Chart';
import Table from './Table';
import CountryData from './CountryData';
import * as d3 from 'd3';

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
    var dataFilter = this.data.filter(d => (d.location === this.state.select && new Date(d.date) > minDate));
    var newData = [];
    var max = {cases: 0, deaths: 0};

    dataFilter.forEach(element => {
      if(this.state.mode === "global") {
        newData.push({
          country: element.location,
          date: element.date,
          cases: element.total_cases,
          deaths: element.total_deaths,
        });
      } else {
        newData.push({
          country: element.location,
          date: element.date,
          cases: element.new_cases,
          deaths: element.new_deaths,
        });
        if (element.new_cases > max.cases) max.cases = element.new_cases;
        if (element.new_deaths > max.deaths) max.cases = element.new_deaths;
      }      
    });


    console.log("location : "+this.state.select+", range : "+this.state.range);
    console.log(newData);
    this.setState({data: newData});
    this.setState({max: {maxDeaths: }})
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
      <div className="App-container">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" selected>Dashboard</Nav.Link>
          <Nav.Link href="#features">Worldmap</Nav.Link>
          <Nav.Link href="#features">Statistics</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
        </Nav>
      </Navbar>


      <Container>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Pays : </Form.Label>
          <Form.Control as="select" onChange={this.handleChangeCountry}>
              {this.countries.map((country) => (
                <option selected={country === this.state.select}>{country}</option>
              ))}
          </Form.Control>
          <CountryData data={this.state.data} mode={this.state.mode}></CountryData>
        </Form.Group>


        <ButtonGroup toggle onChange={this.handleChangeMode}>
          <ToggleButton type="radio" name="radio" defaultChecked value="global">
            global
          </ToggleButton>
          <ToggleButton  type="radio" name="radio" value="par_jour">
            par jour
          </ToggleButton>
        </ButtonGroup>

        <div className="chart">
          <Chart data={this.state.data}></Chart>
        </div>

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
        <Table data={this.state.data} mode={this.state.mode}></Table>
      </Container>
      </div>
    );
  }
}

export default App;