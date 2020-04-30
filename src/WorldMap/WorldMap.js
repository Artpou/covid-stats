import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';
import './WoldMap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import * as d3 from 'd3';

import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup
  } from "react-simple-maps";
import { Container } from 'react-bootstrap';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = d3.scaleLinear()
  .domain([0, 0.5, 1])
  .range(["#ffffff", "#ffc500","#990a06"]);

function convert(n) {
    if(n > 1000000) return (n/1000000).toFixed(2)+" M";
    if(n > 5000) return (n/1000).toFixed(2)+" K";
    return n;
}

function head() {
    
}

function WorldMap({data}) {
    //only countries
    const max = Math.max.apply(Math, data.map(function(o) {
            if(o.iso_code) return o.total_cases; return null;
         }));
    const [tooltip, setTooltip] = useState("");

    return (
        <Container className="worldmap-content" data-tip={tooltip}>
            <ReactTooltip >
                {tooltip &&
                    (
                    <div>
                    <h4>{tooltip.location}</h4>
                    <h5>cas : {convert(tooltip.total_cases)}</h5>
                    <h5>morts : {convert(tooltip.total_deaths)}</h5>
                    </div>
                    )    
                }
            </ReactTooltip>
            <ComposableMap>
            {data.length > 0 && (
            <Geographies geography={geoUrl}>
                {           
                ({ geographies }) =>
                geographies.map(geo => {
                    const d = data.find(s => s.iso_code === geo.properties.ISO_A3);
                    return (
                    <Geography
                        key={geo.rsmKey}
                        onMouseEnter={() => {
                            setTooltip(d ? d : "");
                        }}
                        onMouseLeave={() => {
                            setTooltip("");
                        }}
                        geography={geo}
                        fill={d ? colorScale(Math.log(d.total_cases)/Math.log(max)) : "#616161"}
                    />
                    );
                })
                }
            </Geographies>
        )}
    </ComposableMap>
        </Container>
    );
}

export default WorldMap;