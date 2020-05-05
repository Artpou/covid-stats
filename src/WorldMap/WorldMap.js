import React, { Component} from 'react';
import ReactTooltip from 'react-tooltip';
import './WoldMap.css';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import Scale from './Slider';
import World from './World';
import { ThemeContext } from '../Themes';

class WorldMap extends Component {
    constructor(props) {
        super(props);

        this.min = props.min;
        this.data = props.data;

        this.state = { 
            tooltip: "",
            currentData: props.lastData,
            slider_value: 10,
            slider_max:10,
        };

        this.convert = this.convert.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.currentData);
    }

    convert(n) {
        if(n > 1000000) return (n/1000000).toFixed(2)+" M";
        if(n > 5000) return (n/1000).toFixed(2)+" K";
        return n;
    }

    render() {
        return (
            <ThemeContext.Consumer>
            {theme => (
                <Container className="worldmap-content" data-tip={this.state.tooltip}>
                    
                    <ReactTooltip >
                        {this.state.tooltip &&
                            (
                            <div>
                            <h5>{this.state.tooltip.location}</h5>
                            <h6>cas : {this.convert(this.state.tooltip.total_cases)}</h6>
                            <h6>morts : {this.convert(this.state.tooltip.total_deaths)}</h6>
                            <i>{this.state.tooltip.date}</i>
                            </div>
                            )
                        }
                    </ReactTooltip>

                            
                    <World
                        data={this.state.currentData}
                        setTooltip={(value) => this.setState(({tooltip:value}))}
                        colorScale={this.colorScale}
                        theme={theme}>
                    </World>

                    <Scale data={this.data} min={this.min} setFilter={(value) => this.setState(({currentData:value}))}></Scale>
                </Container> 
            )
            }
            </ThemeContext.Consumer>
            
        );
    }
}

WorldMap.contextType = ThemeContext;

export default WorldMap;