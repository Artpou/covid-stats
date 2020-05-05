import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import Select from 'react-select';

const language = {
    english: {value:"en",label:<div><img src='https://www.countryflags.io/us/flat/32.png' style={{marginRight: 10, height: 32}}/></div>},
    french: {value:"fr",label:<div><img src='https://www.countryflags.io/us/flat/32.png' style={{marginRight: 10, height: 32}}/></div>},
};

const About = () => {
    return (
        <Container>
            <Card>
                <p>Site de visualisation des données du covid-19 en temps réel.
                Ce site a été réalisé avec React. La base de données est en accès public à l'adresse suivante : 
                <a href="https://covid.ourworldindata.org/data/owid-covid-data.csv">https://covid.ourworldindata.org/data/owid-covid-data.csv</a></p>
                
                Liste des principaux modules : 

                <ul>
                    <li>bootstrap-react</li>
                    <li>recharts</li>
                    <li>react-select</li>
                    <li>react-simple-maps</li>
                    <li>ReactTooltip</li>
                    <li>styled-components</li>
                </ul>
                Site réalisé par <a href="https://arthur-poullin.netlify.app/">Arthur Poullin</a>
            </Card>
        </Container>
    );
}

export default About;