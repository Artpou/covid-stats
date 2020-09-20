import React, { useState, useEffect} from 'react';
import MainChart from './MainChart';
import WorldMap from './WorldMap';
import About from './About';

import { GlobalStyles } from '../styles/globalStyles';
import { themes, ThemeContext } from '../styles/Themes';
import Logo from '../assets/covid-stats.png';

import { Navbar, Nav, Container, Button, FormCheck } from 'react-bootstrap';
import * as d3 from 'd3';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ThemeProvider } from 'styled-components';

const override = css`
display: block;
margin: 0 auto;
border-color: red;
margin-left: auto;
margin-right: auto;
margin-top: 40vh;
width: 100px;
`;

export const App = () =>  {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("chart");
  const [date, setDate] = useState();
  const [theme, setTheme] = useState(themes.light);
  console.log(localStorage.getItem("theme"));

  function toggleTheme() {
    setTheme(
        theme === themes.dark
          ? themes.light
          : themes.dark,
    );
  }

  async function loadData() {
    var tmp = [];
    var min;
    d3.csv("https://covid.ourworldindata.org/data/owid-covid-data.csv", function (d) {
      if (!tmp.some(e => e.location === d.location)) {
        //ajout du nouveau pays
        tmp.push(d);
        //setLastData([...lastData, d]);
      } else {
        //update du nombre de cas du pays
        //this.lastData[this.lastData.length - 1].total_cases = d.total_cases;
        if(d.new_cases < 0) d.new_cases = 0;
        if(d.new_deaths < 0) d.new_deaths = 0;
        tmp[tmp.length-1] = d;
      }
      if(!min || d.date < min) {
        min = d.date;
      }
      return d;
    })
    .then(loaded => {
      setData(loaded);
      setDate(min);
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

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <div className="main">
          <Navbar bg={theme.variant} variant={theme.variant}  expand="lg">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={Logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => {setPage("chart")}} selected>Chart</Nav.Link>
                <Nav.Link onClick={() => {setPage("worldmap")}}>Worldmap</Nav.Link>
                <Nav.Link  onClick={() => {setPage("about")}}>About</Nav.Link>
              </Nav>
                <Button variant={theme.button_mode} onClick={toggleTheme} >{theme.toggle}</Button>
            </Navbar.Collapse>
          </Navbar>

          <ThemeContext.Provider value={theme}>
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
              'worldmap': <WorldMap data={data} lastData={lastData} min={date}></WorldMap>,
              'about': <About></About>
            }[page]
          }
          </ThemeContext.Provider>         
        </div>
      </ThemeProvider>
    );
}

export default App;