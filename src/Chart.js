import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, LabelList } from 'recharts';

function renderLineChart({data}) {
  return (
    <ResponsiveContainer height={400} className="ChartContainer">
    <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip />
        <XAxis dataKey="date"/>
        <YAxis />
        <Area type="monotone" dataKey="cases" stackId="1" stroke="#8884d8" fill="#8884d8">
        </Area>
        <Area type="monotone" dataKey="deaths" stackId="2" stroke="#990a06" fill="#990a06" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;