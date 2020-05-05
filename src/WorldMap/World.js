import React, { Component } from 'react';
import * as d3 from 'd3';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Row, Col } from 'react-bootstrap';

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const Scale = ({theme,max}) =>  {
    return (
    <Row style={{marginTop: -20, marginLeft: 10, marginRight:10}}>
        {[0,0.2,0.4,0.6,0.8,1].map((n) => (
            <Col style={{backgroundColor: colorScale(n,theme), textAlign: "right"}}>{Math.round(Math.pow(max,n))}</Col>
        ))}
    </Row>
    );
}

function colorScale(n, theme) {
    var gradient = d3.scaleLinear()
        .domain([0, 0.5, 1])
        .range(theme.gradient);
    return gradient(n);
}


function World({data, mode, setTooltip, theme}) {
    //only countries
    const max = (data.length > 0) ?
     Math.max.apply(Math, data.map(function(o) {
        if(o.iso_code) return o.total_cases; return null;
     })) : 0;


    return(
        <div>
            <ComposableMap>
                <Geographies geography={"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"}>
                    {           
                        ({ geographies }) =>
                            geographies.map(geo => {
                            const d = data.length > 0 ? data.find(s => s.iso_code === geo.properties.ISO_A3) : undefined;
                            return (
                            <Geography
                                key={geo.rsmKey}
                                onMouseEnter={() => {
                                    setTooltip(d ? d : "");
                                }}
                                onMouseLeave={() => {
                                    setTooltip("");
                                }}
                                style={{
                                    hover: {
                                        stroke: "#151515"
                                    }
                                }}
                                geography={geo}
                                fill={d ? colorScale(Math.log(d.total_cases)/Math.log(max), theme) : theme.background}
                            />
                            );
                        })
                    }
                    </Geographies>
            </ComposableMap>
            <Scale max={max} theme={theme}/>        
        </div>
    )
}

export default World;