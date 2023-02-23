import { useLocation, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@mui/material/Box'
import { Button } from "react-bootstrap";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import swal from 'sweetalert';
import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { registerEvent } from "../../actions/eventAction";
import BasicBreadcrumbs from '../../common/BasicBreadcrumbs';

const breadcrum = [{key:'/event',value:"index", component:"Event"}]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ViewEvent = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const res_data = useSelector((state) => state).EventReducer;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const previousValues = {

    }
    const initialValues = {
        'ticket_bought' : ''
    }
    if(res_data.errors){
        swal({
            title: 'Registartion failed',
            text: res_data.errors,
            icon: 'error',
          }).then((result) => {
            if (result===true) {
                window.location.reload()
            }
          })
    }
    
    const count = 0;
    if(buttonClicked === true && res_data.msg && res_data.msg==='Success' && count===0){
        swal({
            title: 'Success',
            text: res_data.data.message,
            icon: 'success',
            showCancelButton: false,
          }).then((result) => {
            setOpen(false)
            window.location.reload();
          })
          count++;
    }

    const user_event = {};
    const onSubmit = (values,{ resetForm }) => {
        const res = {...user_event, user_event:{...values,user_id:userInfo.id, event_id:state.id}}
        dispatch(registerEvent(res))
        setButtonClicked(true);
    }

    const validationSchema = yup.object({
        ticket_bought:yup.number().typeError('tickit bought must be a number').required('Required')
    })
    return (
        <>
        <Container>
        <Box height={70} />
        <BasicBreadcrumbs data={breadcrum}/>
            <h5 style={{"color":"white"}}>Dashboard Statistics</h5>
            
            <Row>
                <Col xs={6}> 
                    <Card className='cardCss'>
                        <Card.Header  style={{backgroundColor:'#e6ffff' }}>Basic Info</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6}> 
                                    Name : {state.name}
                                </Col>
                                <Col xs={6}> 
                                    Description : {state.description}
                                </Col>
                            </Row><br />
                            <Row>
                                <Col xs={6}> 
                                    Mode : {state.mode}
                                </Col>
                                <Col xs={6}> 
                                    Venue : {state.venue}
                                </Col>
                            </Row><br />
                            <Row>
                                <Col xs={6}> 
                                    Platform : {state.platform}
                                </Col>
                                <Col xs={6}> 
                                    Status : {state.status}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6}> 
                    <Card>
                        <Card.Header  style={{backgroundColor:'#ffd6cc' }}>Date Info</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6}> 
                                    Start Date : {state.start_date}
                                </Col>
                                <Col xs={6}> 
                                    Start Time : {state.start_time}
                                </Col>
                            </Row><br />
                            <Row>
                                <Col xs={6}> 
                                    End Date : {state.end_date}
                                </Col>
                                <Col xs={6}> 
                                    End Time : {state.end_time}
                                </Col>
                            </Row><br />
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                <Row>
                <Col xs={6}> 
                    <Card>
                        <Card.Header  style={{backgroundColor:'#ccffcc' }}>Tickit Info</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6}> 
                                    No of tickets : {state.no_of_tickets}
                                </Col>
                                <Col xs={6}> 
                                    Max tickets per event : {state.max_tickets_per_event}
                                </Col>
                            </Row><br />
                            <Row>
                                <Col xs={6}> 
                                    Entry Fees : {state.entry_fees}
                                </Col>
                                <Col xs={6}>
                                    {console.log(state,'state')}
                                    {state.status==='open' ? <Button variant='primary' onClick={handleOpen}>Register</Button> : ""}
                                
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                    >
                                        <Fade in={open}>
                                        <Box sx={style}>
                                           <Formik initialValues={previousValues || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                           
                                            {formik => {
                                                return (
                                                    <Form>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <Field type="text" name="ticket_bought" id="ticket_bought" className="form-control" placeholder="Enter No of Ticket" />
                                                                <ErrorMessage name="ticket_bought" className="error" component="div" />
                                                            </Col>
                                                            <Col xs={4}>
                                                            <Button type="submit" disabled={!formik.isValid}>Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }}
                                            </Formik>
                                        </Box>
                                        </Fade>
                                    </Modal>
                                </Col>
                            </Row><br />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default ViewEvent