import React from 'react';

function WorldData({data, mode}) {
        const d = data.filter(d => d.location === "World")[0];
        return (
        (data && data.length>0) ? 
                <div className="text-center m-2">
                        <h1>{d.location}</h1>
                        <h5>cas confirmés :
                        {mode === "global" ?
                          d.total_cases
                          :
                          d.new_cases}
                        </h5>
                        <h5>morts confirmés :
                        {mode === "global" ?
                          d.total_deaths
                          :
                          d.new_deaths}
                        </h5>
                        <i>last update : {d.date}</i>
                </div>
        :
                null
        );
}

export default WorldData;