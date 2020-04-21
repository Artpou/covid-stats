import React, {Component} from 'react';
import './App.css';
import { Form, ToggleButton, ToggleButtonGroup, ButtonGroup, Container, Navbar, Nav, Button, Card } from 'react-bootstrap';
import Chart from './Chart';
import Table from './Table';
import CountryData from './CountryData';
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.lastData = [];

    this.state = { 
      data: [],
      select: "France",
      range: 31,
      mode: "global",
    };

    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  getCountry() {
    var name = [];
    this.data.forEach(d => {
      if (!name.includes(d.location)) {
        name.push(d.location);
        this.lastData.push(d);
      } else {
        this.lastData[this.lastData.length-1].total_cases = d.total_cases;
      }
    });
    this.lastData.sort(function(a, b){
      return b.total_cases-a.total_cases
    })
    console.log(this.lastData);
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
    var newData = [];
    
    minDate.setDate(minDate.getDate()-this.state.range);
    var dataFilter = this.data.filter(d => (d.location === this.state.select && new Date(d.date) > minDate));

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
      }      
    });

    console.log("location : "+this.state.select+", range : "+this.state.range);
    this.setState({data: newData});
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
        <div className="content">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control size="lg" as="select" onChange={this.handleChangeCountry}>
                {this.lastData.map((country) => (
                  <option key={country.location} selected={country.location === this.state.select}>{country.location}</option>
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
        </div>
        
        <div className="content-chart">
          <Chart data={this.state.data}></Chart>
        </div>

        <Table data={this.state.data} mode={this.state.mode} max={this.state.max}></Table>
      </Container>
      </div>
    );
  }
}

export default App;