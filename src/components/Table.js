import React from 'react';
import { Table as Tab } from 'react-bootstrap';
import { rgb } from 'd3';
import { addSpaces, toCompactDate } from '../util/converter';

const t = 1;

const Row = ({data}) => (
  <tr>
  <th>{toCompactDate(data.date)}</th>
  <th>{addSpaces(data.total_cases)}</th>
  <th>{addSpaces(data.total_deaths)}</th>
</tr>
);

const ColoredRow = ({data, max}) => (
    <tr>
      <th >{toCompactDate(data.date)}</th>
      {data.cases === 0 ? (
        <th>{addSpaces(data.new_cases)}</th>
      ) : (
        <th style={{ backgroundColor: rgb(0, 121, 242, data.new_cases/max.cases)}}>{addSpaces(data.new_cases)}</th>
      )}

      {data.cases === 0 ? (
        <th>{data.new_deaths}</th>
      ) : (
        <th style={{ backgroundColor: rgb(153, 10, 6, data.new_deaths/max.deaths)}}>{addSpaces(data.new_deaths)}</th>
      )}
    </tr>
);

function Table({data, mode, theme}) {
  var max = {cases: 0, deaths: 0};

  if(mode !== "global") {
    max.cases = Math.max.apply(Math, data.map(function(o) { return o.new_cases; }));
    max.deaths = Math.max.apply(Math, data.map(function(o) { return o.new_deaths; }));
  } 

  return (
    <Tab bordered hover variant={theme.variant} striped={mode === "global"}>
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