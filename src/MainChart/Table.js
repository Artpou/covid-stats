import React from 'react';
import { Table as Tab } from 'react-bootstrap';
import { rgb } from 'd3';

const t = 1;

const Row = ({data}) => (
  <tr>
  <th>{data.date}</th>
  <th>{data.total_cases}</th>
  <th>{data.total_deaths}</th>
</tr>
);

const ColoredRow = ({data, max}) => (
    <tr>
      <th >{data.date}</th>
      {data.cases === 0 ? (
        <th>{data.new_cases}</th>
      ) : (
        <th style={{ backgroundColor: rgb(136, 132, 216, data.new_cases/max.cases)}}>{data.new_cases}</th>
      )}

      {data.cases === 0 ? (
        <th>{data.new_deaths}</th>
      ) : (
        <th style={{ backgroundColor: rgb(153, 10, 6, data.new_deaths/max.deaths)}}>{data.new_deaths}</th>
      )}
    </tr>
);

function Table({data, mode}) {
  var max = {cases: 0, deaths: 0};
  if(mode !== "global") {
    max.cases = Math.max.apply(Math, data.map(function(o) { return o.new_cases; }));
    max.deaths = Math.max.apply(Math, data.map(function(o) { return o.new_deaths; }));
  } 

  return (
    <Tab bordered hover variant="dark">
      <thead>
      <tr>
        <th>date</th>
        <th>cas{mode === "global" ? (" totaux") : ("/jour") }</th>
        <th>morts{mode === "global" ? (" totals") : ("/jour") }</th>
      </tr>
      </thead>
      <tbody>
        {data.length > 0 && data.map((row) => (
            mode === "global" ?
            (<Row data={row}></Row>)
             : 
            (<ColoredRow data={row} max={max}></ColoredRow>)
        )).reverse()}
      </tbody>
    </Tab>
  )
}

export default Table;