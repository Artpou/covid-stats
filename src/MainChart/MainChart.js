import React, {Component, useContext} from 'react';
import Select from 'react-select'
import { Form, ToggleButton, ButtonGroup, Container, Card } from 'react-bootstrap';
import './MainChart.css';
import Chart from './Chart';
import Table from './Table';
import getCountryISO2 from "country-iso-3-to-2";
import { ThemeContext, themes } from '../Themes';
import styled from 'styled-components';

class MainChart extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.lastData = props.lastData;

    this.country = this.lastData.map(d => {
      const src = getCountryISO2(d.iso_code) ?
      "https://www.countryflags.io/"+ getCountryISO2(d.iso_code).toLowerCase()+"/flat/32.png"
      :
      "https://image.flaticon.com/icons/svg/814/814513.svg";
      
      const container = {};
      container.value = d.location;
      container.label = 
      <div>
        <img src={src} style={{marginRight: 10, height: 32}}/>
        {d.location}
        <i style={{ color: "#aaaaaa", marginLeft: 10}}>
          {this.addSpace(d.total_cases)} cas
        </i>
      </div>;
      return container;
    });

    this.style = {
      valueContainer: () => ({
        // none of react-select's styles are passed to <Control />
        padding: 10,
      }),
    }

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
    this.addSpace = this.addSpace.bind(this);
    this.getCountry = this.getCountry.bind(this);
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

    addSpace(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    getCountry() {
      var t = this.lastData.map(d => {
        const container = {};
      container.value = d.location;
      container.label = d.location;
      return container;
    });
    console.log(t);
    return t;
  }

  handleChangeCountry(event) {
    this.setState({
      select: event.value
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
      <ThemeContext.Consumer>
      {theme => (
        <Container>
        {
          console.log(theme)
          }
          <Card>
              <Select 
                className="select-country"
                styles={this.style}
                options={this.country}
                onChange={this.handleChangeCountry}
                color="#000"
                value={this.country.filter(d => d.value === this.state.select)}/>
                
            <ButtonGroup toggle onChange={this.handleChangeMode}>
              <ToggleButton type="radio" name="radio" variant={theme.button} defaultChecked value="global">
                global
              </ToggleButton>
              <ToggleButton type="radio" name="radio" variant={theme.button} value="par_jour">
                par jour
              </ToggleButton>
            </ButtonGroup>

            <ButtonGroup toggle onChange={this.handleChangeRange}>
              <ToggleButton type="radio" name="radio" variant={theme.button} defaultChecked value={7}>
                semaine
              </ToggleButton>
              <ToggleButton  type="radio" name="radio" variant={theme.button} value={31}>
                mois
              </ToggleButton>
              <ToggleButton type="radio" name="radio" variant={theme.button} value={365}>
                année
              </ToggleButton>
            </ButtonGroup>
          </Card>
          
          <Card>
            <Chart className="chart" data={this.state.currentData} mode={this.state.mode}></Chart>
          </Card>
          
          <Card>
              <Table 
                theme={theme}
                data={this.state.currentData}
                mode={this.state.mode}
                max={this.state.max}>
              </Table>
          </Card>
        </Container>
      )
      }
      </ThemeContext.Consumer>
    );
  }
}

export default MainChart;