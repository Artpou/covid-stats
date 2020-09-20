import React from 'react';
import { Accordion } from 'react-bootstrap';

function CountryData({data, mode}) {
        return (
        (data && data.length>0) ? 
                <div className="text-center m-2">
                        <h1>{data[data.length-1].location}</h1>
                        <h5>cas confirmés :
                        {mode === "global" ?
                          data[data.length-1].total_cases
                          :
                          data[data.length-1].new_cases}
                        </h5>
                        <h5>morts confirmés :
                        {mode === "global" ?
                          data[data.length-1].total_deaths
                          :
                          data[data.length-1].new_deaths}
                        </h5>

                        <i>last update : {data[data.length-1].date}</i>
                </div>
        :
                null
        );
}

export default CountryData;