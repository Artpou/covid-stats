import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, LabelList } from 'recharts';

function renderLineChart({data, mode}) {

  var filter = [];
    data.forEach(element => {
      if(mode === "global") {
        filter.push({
          "date": element.date,
          "cas confirmés": element.total_cases,
          "morts": element.total_deaths,
        });
      } else {
        filter.push({
          "date": element.date,
          "cas confirmés": element.new_cases,
          "morts": element.new_deaths,
        });
      }      
    });

    console.log(filter);

  return (
    <ResponsiveContainer height={400}>
    <AreaChart data={filter}>
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip />
        <XAxis dataKey="date"/>
        <YAxis />
        <Area type="monotone" dataKey="cas confirmés" stackId="1" stroke="#8884d8" fill="#8884d8">
        </Area>
        <Area type="monotone" dataKey="morts" stackId="2" stroke="#990a06" fill="#990a06" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default renderLineChart;