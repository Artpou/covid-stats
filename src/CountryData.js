import React from 'react';

function CountryData({data}) {

        var country = (data.length === 0) ? 0 : data[data.length - 1].country;
        var cases = (data.length === 0) ? 0 : data[data.length - 1].cases;
        var deaths = (data.length === 0) ? 0 : data[data.length - 1].deaths;
        var last_update = (data.length === 0) ? 0 : data[data.length - 1].date;

        return (
        <div className="text-center m-2">
                <h1>{country}</h1>
                <h5>cas confirmés : {cases}</h5>
                <h5>décès : {deaths}</h5>
                <i>last update : {last_update}</i>
        </div>
        );
}

export default CountryData;