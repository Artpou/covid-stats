import React, { Component } from 'react';

import * as d3 from 'd3';

const dataUrl = "https://covid.ourworldindata.org/data/owid-covid-data.csv";


class covidData extends Component {
    constructor() {
        super();

        this.data = [];
        this.lastData = [];
        this.date = "";

        this.state = { 
            loading: true,
         };

         this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        this.filterData();
    }

    filterData() {
        var tmp = [];
        var min;
        d3.csv(dataUrl, function (d) {
          if (!tmp.some(e => e.location === d.location)) {
            //ajout du nouveau pays
            tmp.push(d);
            //setLastData([...lastData, d]);
          } else {
            //update du nombre de cas du pays
            //this.lastData[this.lastData.length - 1].total_cases = d.total_cases;
            tmp[tmp.length-1] = d;
          }
          if(!min || d.date < min) {
            min = d.date;
            console.log(min);
          }
          return d;
        })
        .then(loaded => {
          this.data = loaded;
          this.date = min;
          //tri des pays en fonction des cas
          tmp.sort(function (a, b) {
            return b.total_cases - a.total_cases
          });
          this.lastData = tmp;
        })
        .then(() => {
          this.setState({loading: false});
        });
    }
}

export default covidData;