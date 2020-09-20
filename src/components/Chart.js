import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, ResponsiveContainer } from 'recharts';
import { toCompactDate, convert } from '../util/converter';

function renderLineChart({data, mode}) {
  var getDate = (x)=>{return toCompactDate(x.date);}
  return (
    <ResponsiveContainer height={400} className="ChartContainer">
    <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0079F2" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#0079F2" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#990a06" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#990a06" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip />
        <XAxis dataKey={getDate}/>
        <YAxis/>
        <Area type="monotone" dataKey={mode ==="global" ? "total_cases" : "new_cases"} stackId="1" stroke="#0079F2" fill="url(#colorCases)"/>
        <Area type="monotone" dataKey={mode ==="global" ? "total_deaths" : "new_deaths"} stackId="2" stroke="#990a06" fill="url(#colorDeaths)"/>
        <Line type="monotone" dataKey={mode ==="global" ? "total_tests" : "new_tests"} stroke="#00db07"/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;