import React from 'react';

function CountryData({data}) {

        var country = (data.length === 0) ? 0 : data[data.length-1].location;
        var total_cases = (data.length === 0) ? 0 : data[data.length-1].total_cases;
        var total_deaths = (data.length === 0) ? 0 : data[data.length-1].total_deaths;
        var last_update = (data.length === 0) ? 0 : data[data.length-1].date;
        console.log(data);

        return (
        <div className="country-data m-2">
                <h1>{country}</h1>
                <h5>cas confirmés : {total_cases}</h5>
                <h5>décès : {total_deaths}</h5>
                <i>last update : {last_update}</i>
        </div>
        );
      }

export default CountryData;