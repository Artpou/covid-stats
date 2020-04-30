import React, {Component} from 'react';
import { Form, ToggleButton, ButtonGroup, Container } from 'react-bootstrap';
import './MainChart.css';
import Chart from './Chart';
import Table from './Table';
import CountryData from './CountryData';

class MainChart extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.lastData = props.lastData;

    this.state = { 
      currentData: [],
      select: "France",
      range: 31,
      mode: "global",
    };

    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.handleChangeTooltip = this.handleChangeTooltip.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  componentDidMount() {
    this.filterData();
  }

  filterData() {
    var tmp = this.data.filter(d => (
      d.location === this.state.select &&
      new Date(d.date) > new Date(Date.now()).setDate(new Date(Date.now()).getDate()-this.state.range)
    ));
    this.setState({currentData: tmp}, () => {console.log(tmp)});
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

  handleChangeTooltip(value) {
    console.log(value);
    this.setState({
      tooltip: value
    });
  }

  render() {
    return (
      <Container>
        <div className="content">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control size="lg" as="select" onChange={this.handleChangeCountry}>
                {this.lastData.map((d) => (
                  <option key={d.location} selected={d.location === this.state.select}>{d.location}</option>
                ))}
            </Form.Control>
            <CountryData data={this.state.currentData} mode={this.state.mode}></CountryData>
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
          <Chart data={this.state.currentData} mode={this.state.mode}></Chart>
        </div>
        
        <Table data={this.state.currentData} mode={this.state.mode} max={this.state.max}></Table>
      </Container>
    );
  }
}

export default MainChart;