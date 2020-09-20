import React, { Component} from 'react';
import Scale from '../components/Slider';
import World from '../components/World';
import StatsHeader from '../components/StatsHeader';

import { ThemeContext } from '../styles/Themes';
import '../styles/WoldMap.css';

import ReactTooltip from 'react-tooltip';
import * as d3 from 'd3';
import { Container, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { convert } from '../util/converter';

class WorldMap extends Component {
    constructor(props) {
        super(props);

        this.min = props.min;
        this.data = props.data;

        this.state = { 
            tooltip: "",
            selected: "World",
            data: props.lastData,
            mode: "global",
            slider_value: 10,
            slider_max:10,
        };

        this.handleChangeMode = this.handleChangeMode.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.data);
    }

    handleChangeMode() {
        this.state.mode === "global" ?
            this.setState({mode:"global"}) :
            this.setState({mode:"per_day"});
    }

    render() {
        return (
            <ThemeContext.Consumer>
            {theme => (
                <Container className="worldmap-content" data-tip={this.state.tooltip}>
                    <Card>
                        <StatsHeader
                            data={this.state.data}                       
                            option={this.state}
                        />
                        {/*<ButtonGroup toggle onChange={this.handleChangeMode}>
                            <ToggleButton type="radio" name="radio" defaultChecked value="global">
                                global
                            </ToggleButton>
                            <ToggleButton  type="radio" name="radio" value="par_jour">
                                par jour
                            </ToggleButton>
                        </ButtonGroup>*/}
                        <Scale 
                            data={this.data} 
                            min={this.min} 
                            setFilter={(value) => this.setState(({data:value}))} 
                            theme={theme}
                        />
                    </Card>
                    
                    <ReactTooltip >
                        {this.state.tooltip &&
                            (
                            <div>
                            <h5>{this.state.tooltip.location}</h5>
                            <h6>cas : {convert(this.state.tooltip.total_cases)}</h6>
                            <h6>morts : {convert(this.state.tooltip.total_deaths)}</h6>
                            <i>{this.state.tooltip.date}</i>
                            </div>
                            )
                        }
                    </ReactTooltip>

                    <Card>       
                        <World
                            data={this.state.data}
                            mode={this.state.mode}
                            setTooltip={(value) => this.setState(({tooltip:value}))}
                            colorScale={this.colorScale}
                            theme={theme}>
                        </World>
                    </Card>


                </Container> 
            )
            }
            </ThemeContext.Consumer>
            
        );
    }
}

WorldMap.contextType = ThemeContext;

export default WorldMap;