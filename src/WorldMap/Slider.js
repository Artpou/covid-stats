import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const Slider = ({data, min, setFilter}) => {
  const [ value, setValue ] = useState(0);
  var minDay = (new Date(min)-new Date(Date.now())) / (1000 * 3600 * 24);

  function filterData(day) {
    var date = new Date();
    date.setDate(date.getDate()-day);
    date = date.toLocaleDateString();
    return data.filter(d => (
      date === new Date(d.date).toLocaleDateString()
    ));
  }    

  return (
    <RangeSlider
        value={value}
        min={Math.round(minDay)}
        max={0}
        variant='light'
        onChange={event => {
              setValue(Number(event.target.value));
              console.log(event.target.value);
              setFilter(filterData(-event.target.value));
        }}
    />
  );
}

export default Slider;