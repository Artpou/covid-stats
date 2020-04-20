import React from 'react';
import { AreaChart,LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function renderLineChart({data}) {
  return (
    <LineChart width={730} height={350} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line dot={false}  type="monotone" dataKey="total_cases" stroke="#8884d8" />
      <Line dot={false} type="monotone" dataKey="total_deaths" stroke="#b30000" />
    </LineChart>
  );
}

export default renderLineChart;