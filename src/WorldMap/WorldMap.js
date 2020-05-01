import React, { Component} from 'react';
import ReactTooltip from 'react-tooltip';
import './WoldMap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import Scale from './Slider';
import World from './World';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

class WorldMap extends Component {
    constructor(props) {
        super(props);

        this.data = props.data;

        this.colorScale = d3.scaleLinear()
          .domain([0, 0.5, 1])
          .range(["#ffffff", "#ffc500","#990a06"]);

        this.state = { 
            tooltip: "",
            currentData: [],
            slider_value: 10,
            slider_max:10,
        };

        this.convert = this.convert.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        //this.filterData();
    }

    filterData() {
        var d = new Date();
        d.setDate(d.getDate()-15);

        this.setState({currentData: (this.data.filter(d => (
            d.date < Date.now()
        )))}, () => {console.log(this.state.currentData)});
    }

    convert(n) {
        if(n > 1000000) return (n/1000000).toFixed(2)+" M";
        if(n > 5000) return (n/1000).toFixed(2)+" K";
        return n;
    }

    render() {
        return (
            <Container className="worldmap-content" data-tip={this.state.tooltip}>
            
            <ReactTooltip >
                {this.state.tooltip &&
                    (
                    <div>
                    <h4>{this.state.tooltip.location}</h4>
                    <h5>cas : {this.convert(this.state.tooltip.total_cases)}</h5>
                    <h5>morts : {this.convert(this.state.tooltip.total_deaths)}</h5>
                    </div>
                    )    
                }
            </ReactTooltip>

            <World
                data={this.data}
                setTooltip={(value) => this.setState(({tooltip:value}))}
                colorScale={this.colorScale}>
            </World>

            <Scale data={this.state.currentData} setFilter={(value) => this.setState(({data:value}))}></Scale>
        </Container> 
        );
    }
}

export default WorldMap;