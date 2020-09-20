import React, {Component} from 'react';
import Chart from '../components/Chart';
import Table from '../components/Table';
import { flagImg } from '../util/flag';
import { filterByDate } from '../util/filter';

import { ThemeContext } from '../styles/Themes';
import '../styles/MainChart.css';

import { Form, ToggleButton, ButtonGroup, Container, Card, ToggleButtonGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { addSpaces } from '../util/converter';
import StatsHeader from '../components/StatsHeader';

class MainChart extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.lastData = props.lastData;

    this.country = this.lastData.map(d => {
      const container = {};
      container.value = d.location;
      container.label = 
      <div>
        <img src={flagImg(d.iso_code)} style={{marginRight: 10, height: 32}}/>
        {d.location}
        <i style={{ color: "#aaaaaa", marginLeft: 10}}>
          {addSpaces(d.total_cases)} cas
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
      data: [],
      selected: "France",
      range: 31,
      mode: "par_jour",
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
    this.setState({data:filterByDate(this.data,this.state)});
    console.log(this.state.data);
  }

  handleChangeCountry(event) {
    this.setState({
      selected: event.value
    }, () => {
      this.filterData();
    });
  }

  handleChangeRange(event) {
    console.log(event);
    this.setState({
      range: event
    }, () => {
      this.filterData();
    });
  }

  handleChangeMode(event) {
    this.setState({
      mode: event
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
          <Card>
              <Select 
                className="select-country"
                styles={this.style}
                options={this.country}
                onChange={this.handleChangeCountry}
                color="#000"
                value={this.country.filter(d => d.value === this.state.selected)}/>
                
            <StatsHeader data={this.state.data} option={this.state}/>
            
            <Row>
              <Col>
              <ToggleButtonGroup type="radio" name="mode" defaultValue={"par_jour"} onChange={this.handleChangeMode}>
                <ToggleButton name="mode" variant={theme.button} value="global">
                  global
                </ToggleButton>
                <ToggleButton name="mode" variant={theme.button} value="par_jour">
                  par jour
                </ToggleButton>
              </ToggleButtonGroup>
              </Col>
              <Col>
                <ToggleButtonGroup type="radio" name="range" defaultValue={31} onChange={this.handleChangeRange}>
                  <ToggleButton name="range" variant={theme.button} value={7}>
                    semaine
                  </ToggleButton>
                  <ToggleButton name="range" variant={theme.button} value={31}>
                    mois
                  </ToggleButton>
                  <ToggleButton name="range" variant={theme.button} value={365}>
                    année
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
          </Card>
          
          <Card>
            <Chart className="chart" data={this.state.data} mode={this.state.mode}></Chart>
          </Card>
          
          <Card>
              <Table 
                theme={theme}
                data={this.state.data}
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