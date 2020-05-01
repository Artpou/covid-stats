import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

function filterData(data) {
  var tmp = data.filter(d => (
    d.location === this.state.select &&
    new Date(d.date) > new Date(Date.now()).setDate(new Date(Date.now()).getDate()-this.state.range)
  ));
  this.setState({currentData: tmp}, () => {console.log(tmp)});
}

function Slider({data, setFilter}) {
    const [ value, setValue ] = useState(10);

    var d = new Date(Date.now());
    d.setDate(d.getDate()-5);
    
    return (
      <RangeSlider
        value={value}
        max={10}
        variant='light'
        onChange={event => {
            if(event.target.value !== value)
                setValue(Number(event.target.value))
        }}
      />
    );
}

export default Slider;