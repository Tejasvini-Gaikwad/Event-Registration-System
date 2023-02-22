import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCounts } from '../actions/action';
import '../App.css'

const Dashboard = () => {
    const dispatch = useDispatch();
    const count_data = useSelector((state) => state).LoginReducer.data;
    useEffect(() => {
        dispatch(getCounts());
    },[])
    return (
        <>
        <Container>
        <Box height={70} />
            <h5 style={{"color":"white"}}>Dashboard Statistics</h5>
            
            <Row>
                <Col xs={3}> 
                    <Card className='cardCss'>
                        <Card.Body>
                            Registants <br />
                                <span className="circle" style={{"backgroundColor":"#66e0ff"}}>{count_data.registants}</span>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor:'#66e0ff' }}></Card.Footer>
                    </Card>
                </Col>
                <Col xs={3}> 
                    <Card>
                        <Card.Body>
                            Organizers <br />
                            <span className="circle" style={{"backgroundColor":"#cc33ff"}}>{count_data.registants}</span>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor:'#cc33ff' }}></Card.Footer>
                    </Card>
                </Col>
                <Col xs={3}> 
                    <Card>
                        <Card.Body>
                            Registered Users <br />
                                <span className="circle" style={{"backgroundColor":"#ff6666"}}>{count_data.registered_users}</span>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor:'#ff6666' }}></Card.Footer>
                    </Card>
                </Col>
                <Col xs={3}> 
                    <Card>
                        <Card.Body>
                            Events <br />
                                <span className="circle" style={{"backgroundColor":"#ffccff"}}>{count_data.events}</span>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor:'#ffccff' }}></Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard