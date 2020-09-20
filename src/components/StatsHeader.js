import React from 'react';
import { Accordion, Card, Col, Row, Table } from 'react-bootstrap';
import { addSpaces, toLocalDate } from '../util/converter';
import { filterByCountry, lastElement } from '../util/filter';

function StatsHeader({data, option}) {
        const d = lastElement(filterByCountry(data, option.selected));
        return (
        d ? 
                <Card className="text-center m-2">
                        <h1>{d.location}</h1>
                        <Row>
                                <Col>
                                        <h5>{addSpaces(d.total_cases)} cas</h5>
                                        + {addSpaces(d.new_cases)}

                                </Col>
                                <Col>
                                        <h5>{addSpaces(d.total_deaths)} décès</h5>
                                        + {addSpaces(d.new_deaths)}

                                </Col>
                        </Row>
                        {d.total_tests ?
                        <Accordion defaultActiveKey="0">
                                <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                informations supplémentaires
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <Table size="sm">
                                        <tbody>
                                                <tr>
                                                        <td>tests</td>
                                                        <td>{d.new_tests}</td>
                                                </tr>
                                                <tr>
                                                        <td>tests aujourd'hui</td>
                                                        <td>{d.new_tests_smoothed}</td>
                                                </tr>
                                                <tr>
                                                        <td>tests positifs</td>
                                                        <td>{d.positive_rate} %</td>
                                                </tr>
                                        </tbody>
                                        </Table>
                                </Card.Body>
                                </Accordion.Collapse>
                                </Card>
                        </Accordion>
                        : <hr></hr>}


                        <i>date : {toLocalDate(d.date)}</i>
                </Card>
        :
                null
        );
}

export default StatsHeader;