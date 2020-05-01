import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


function World({data, setTooltip, colorScale}) {
    //only countries
    const max = (data.length > 0) ?
     Math.max.apply(Math, data.map(function(o) {
        if(o.iso_code) return o.total_cases; return null;
     })) : 0;

    console.log(data);

    return(
        <ComposableMap>
        {data.length > 0 && (
            <Geographies geography={"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"}>
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
    )
}

export default World;