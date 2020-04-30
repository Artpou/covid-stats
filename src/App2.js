import React, { useState, useEffect} from 'react';
import './App.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import * as d3 from 'd3';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import MainChart from './MainChart/MainChart';
import WorldMap from './WorldMap/WorldMap';

export const App2 = () =>  {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("chart");

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40vh;
  width: 100px;
`;

  async function loadData() {
    var tmp = [];
    d3.csv("https://covid.ourworldindata.org/data/owid-covid-data.csv", function (d) {
      if (!tmp.some(e => e.location === d.location)) {
        //ajout du nouveau pays
        tmp.push(d);
        //setLastData([...lastData, d]);
      } else {
        //update du nombre de cas du pays
        //this.lastData[this.lastData.length - 1].total_cases = d.total_cases;
        tmp[tmp.length-1] = d;
      }
      return d;
    })
    .then(loaded => {
      setData(loaded);
      //tri des pays en fonction des cas
      tmp.sort(function (a, b) {
        return b.total_cases - a.total_cases
      });
      setLastData(tmp);
    })
    .then(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if(loading) {
      loadData();
    }
  }, []);

  function handleChangePage(event) {
    console.log(event.target.value);
    setPage({range: event.target.value});
  }

    return (
      <div className="App-container">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => {setPage("chart")}} selected>Chart</Nav.Link>
            <Nav.Link onClick={() => {setPage("worldmap")}}>Worldmap</Nav.Link>
            <Nav.Link>Statistics</Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
        </Navbar>
        <loadData></loadData>
        {loading ? 
          <Container className="justify-content-md-center">
            <ScaleLoader
              css={override}
              color={"#990a06"}
              loading={loading}
            />
          </Container>
        : 
          {
            'chart': <MainChart data={data} lastData={lastData}></MainChart>,
            'worldmap': <WorldMap data={lastData} lastData={lastData}></WorldMap>
          }[page]
        }
      </div>
    );
}

export default App2;