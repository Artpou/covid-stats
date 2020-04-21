import React from 'react';
import { Table as Tab } from 'react-bootstrap';


function getColor(params) {
  
}

const Row = ({data}) => (
    <tr>
      <th>{data.date}</th>
      <th>{data.cases}</th>
      <th>{data.deaths}</th>
    </tr>
);

function Table({data, mode}) {
  return (
    <Tab striped bordered hover variant="dark">
      <thead>
      <tr>
        <th>date</th>
        <th>cas{mode === "global" ? (" totaux") : ("/jour") }</th>
        <th>morts{mode === "global" ? (" totals") : ("/jour") }</th>
      </tr>
      </thead>
      <tbody>
        {data.map((row) => (
            <Row data={row}></Row>
        )).reverse()}
      </tbody>
    </Tab>
  );
}

export default Table;