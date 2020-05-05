import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';

function renderLineChart({data, mode}) {
  return (
    <ResponsiveContainer height={400} className="ChartContainer">
    <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#990a06" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#990a06" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip />
        <XAxis dataKey="date"/>
        <YAxis />
        <Area type="monotone" dataKey={mode ==="global" ? "total_cases" : "new_cases"} stackId="1" stroke="#8884d8" fill="url(#colorCases)">
        </Area>
        <Area type="monotone" dataKey={mode ==="global" ? "total_deaths" : "new_deaths"} stackId="2" stroke="#990a06" fill="url(#colorDeaths)"/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;