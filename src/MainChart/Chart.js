import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';

function renderLineChart({data, mode}) {
  return (
    <ResponsiveContainer height={400} className="ChartContainer">
    <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip />
        <XAxis dataKey="date"/>
        <YAxis />
        <Area type="monotone" dataKey={mode ==="global" ? "total_cases" : "new_cases"} stackId="1" stroke="#8884d8" fill="#8884d8">
        </Area>
        <Area type="monotone" dataKey={mode ==="global" ? "total_deaths" : "new_deaths"} stackId="2" stroke="#990a06" fill="#990a06" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;