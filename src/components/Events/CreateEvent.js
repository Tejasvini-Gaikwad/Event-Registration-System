import * as yup from 'yup'
import Card from 'react-bootstrap/Card';
import { ErrorMessage, Field, Form,Formik } from 'formik';
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import "react-datepicker/dist/react-datepicker.css";
import { createEventAction, updateEventAction } from '../../actions/eventAction';
import { useDispatch, useSelector } from 'react-redux';
import BasicBreadcrumbs from '../../common/BasicBreadcrumbs';

const breadcrum = [{key:'/event',value:"index", component:"Event"}]

const steps = ['Basic Info', 'Date Info', 'Tickit Info'];
const CreateEvent = () => {
    const { state } = useLocation();
    const navigate = useNavigate("");
    const {data,errors} = useSelector((state) => state.EventReducer);
    const dispatch = useDispatch();
    const [value, setValue] = useState('10:00');
    const [value2, setValue2] = useState('10:00');
    const [dispatchTime, setDispatchTime] =useState('')
    const [checkButton , setCheckButton] = useState('Next')
    const previousValues = state;
    const initialValues = {
        name:'',
        mode:'',
        description:'',
        venue:'',
        start_date:new Date(),
        end_date:new Date(),
        start_time:'',
        end_time:'',
        platform:'',
        status:'',
        entry_fees:'',
        no_of_tickets:'',
        max_tickets_per_event:'',
        status : ''
    }

    const checkClicked = (e,button) => {
        setCheckButton(button);
        if(checkButton === "Next"){
            e.preventDefault()
        }
    }
    if(previousValues){
        if(errors.length > 0 && checkButton === 'Update'){
            const errorString = errors.reduce((acc,item)=>{
                return acc+","+item
            })
            swal({
                title: 'Update failed',
                text: errorString,
                icon: 'error',
            }).then((result) => {
                if (result===true) {
                    // navigate('/')
                }
            })
        }else if(checkButton === 'Update' && data.data.message && data.data.message === 'Event updated sucessfully'){
            swal({
                title: 'Success',
                text: 'Event updated sucessfully',
                icon: 'success',
            }).then((result) => {
                if (result===true) {
                    // navigate('/')
                }
            })
        }
    }
    
    const event = {};
    const onSubmit = (values) => {
        if(previousValues){
            dispatch(updateEventAction({...values,id:previousValues.id}))
            // swal({
            //     title: 'Success',
            //     text: "Event updated successfuly!",
            //     icon: 'success',
            //     showCancelButton: false,
            //     confirmButtonColor: '#3085d6',
            //     confirmButtonText: 'Great'
            // }).then((result) => {
            //     if (result===true) {
            //         navigate('/event')
            //     }
            // })
        }
        else{
            const res = {...event, event:values}
            dispatch(createEventAction(res))
            swal({
                title: 'Success',
                text: "Event added successfuly!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Great'
            }).then((result) => {
                if (result===true) {
                    navigate('/event')
                }
            })
        }
    }

    const validationSchema = yup.object({
        name:yup.string().required("Required"),
        mode:yup.string().required("Required"),
        description:yup.string().required("Required"),
        venue:yup.string().required("Required"),
        start_date:yup.date().required("Required"),
        end_date:yup.date().required("Required"),
        start_time:yup.string().required("Required"),
        end_time:yup.string().required("Required"),
        platform:yup.string().required("Required"),
        status:yup.string().required("Required"),
        entry_fees:yup.number().required("Required"),
        no_of_tickets:yup.number().required("Required"),
        max_tickets_per_event:yup.number().required("Required"),
    })

    const statusArray = [
        {key:'', value:'Select Status'},
        {key:'open', value:'open'},
        {key:'closed', value:'closed'}
    ]

    const modeArray = [
        {keyMode:"", value:"Select Mode"},
        {keyMode:'online', value:"online"},
        {keyMode:'offline', value:"offline"}
    ]
    
        const [activeStep, setActiveStep] = useState(0);
        const [skipped, setSkipped] = useState(new Set())

        const isStepOptional = (step) => {
            return step === 1;
        };
        
        const isStepSkipped = (step) => {
            return skipped.has(step);
        };

        const handleNext = (e) => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        checkClicked(e,"Next")
    }

    const handleBack = (e) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        checkClicked(e,"Back")
    };

    function getStepContent(step){
        switch(step){
            case 0:
                return(
                    <>
                        <Row>
                            <Col xs={6}>
                                <Field type="text" name="name" id="name" className="form-control" placeholder="Enter Name" />
                                <ErrorMessage name="name" className="error" component="div" /><br />
                            </Col>
                            <Col>
                                <Field as="select" name="mode" id="mode" className="form-control">
                                    {
                                        modeArray.map((option) => {
                                            return (
                                                <option key={option.keyMode}>{option.value}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="mode" className="error" component="div" />
                            </Col>
                        </Row><br />
                        <Row>
                            <Col xs={6}>
                                <Field as="textarea" name="description" id="description" className="form-control" placeholder="Enter Description" />
                                <ErrorMessage name="description" className="error" component="div" /><br />
                            </Col>
                            <Col xs={6}>
                                <Field type="text" name="venue" id="venue" className="form-control" placeholder="Enter Venue" />
                                <ErrorMessage name="venue" className="error" component="div" />
                            </Col>
                        </Row><br />
                        <Row>
                            <Col xs={6}>
                                <Field type="text" name="platform" id="platform" className="form-control" placeholder="Enter Platform" />
                                <ErrorMessage name="platform" className="error" component="div" />
                            </Col>
                            <Col xs={6}>
                                <Field as="select" name="status" id="status" className="form-control">
                                    {
                                        statusArray.map((option) => {
                                            return (
                                                <option key={option.key}>{option.value}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="status" className="error" component="div" />
                            </Col>
                        </Row>
                    </>
                )

            case 1:
                return (
                    <>
                        <Row>
                            <Col>
                            <Field name="start_date">
                                {
                                    ({form, field}) => {
                                        const {setFieldValue} = form;
                                        const {value} = field
                                        return <DatePicker dateFormat="yyyy-MM-dd" name="start_date" id="start_date" selected={value} onChange={(val)=>{setFieldValue('start_date',val)}} className="form-control" minDate={new Date()}/>
                                    }
                                }
                            </Field>
                            </Col>
                            <Col>
                                <Field name="start_time" id="start_time" type="time" className="form-control"></Field>
                                <ErrorMessage name="start_time" className="error" component="div" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                            <Field name="end_date">
                                {
                                    ({form, field}) => {
                                        const {setFieldValue} = form;
                                        const {value} = field
                                        return <DatePicker dateFormat="yyyy-MM-dd" name="end_date" id="end_date" selected={value} onChange={(val)=>{setFieldValue('end_date',val)}} className="form-control" minDate={new Date()}/>
                                    }
                                }
                            </Field>
                            </Col>
                            <Col>
                                <Field name="end_time" id="end_time" type="time" className="form-control"></Field>
                                <ErrorMessage name="end_time" className="error" component="div" />
                            </Col>
                        </Row>
                    </>
                )
            case 2:
                return (
                    <>
                        <Row>
                            <Col xs={6}>
                                <Field type="text" name="entry_fees" id="entry_fees" className="form-control" placeholder="Enter Entry Fees" />
                                <ErrorMessage name="entry_fees" className="error" component="div" /></Col>
                            <Col xs={6}>
                                <Field type="text" name="no_of_tickets" id="no_of_tickets" className="form-control" placeholder="Enter No. of tickits" />
                                <ErrorMessage name="venue" className="error" component="div" />
                            </Col>
                            </Row>
                            <br />
                            <Row>
                            <Col xs={6}>
                                <Field type="text" name="max_tickets_per_event" id="max_tickets_per_event" className="form-control" placeholder="Enter Max No. of tickits" />
                                <ErrorMessage name="max_tickets_per_event" className="error" component="div" />
                            </Col>
                        </Row><br />
                    </>
                )
        }

    }

    return (
        <>
        <Box height={20} />
        <BasicBreadcrumbs data={breadcrum}/>
        <div className="card col-6 offset-3 register" style={{"width": "50%"}}>
        <Card className='card'>
            <Card.Header>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                        }
                        if (isStepSkipped(index)) {
                        stepProps.completed = false;
                        }
                        return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                        );
                    })}
                </Stepper>
            </Card.Header>
            
            <Card.Body>
                <Formik initialValues={previousValues || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {
                        formik => {
                            return (
                                <Form>
                                    {getStepContent(activeStep)}
                                    
                                    
                                    {/* <span className="error"></span><br/> */}
                        
                                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={(e) => {handleBack(e)}}
                                            sx={{ mr: 1 }}
                                            >
                                            Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {/* {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                            )} */}
                                           
                                            {activeStep === steps.length - 1 ? (previousValues ? <Button type="submit" onClick={(e)=>{checkClicked(e,'Update')}} disabled={!formik.isValid && activeStep===2}>Update</Button> : <Button type="submit" onClick={(e)=>{checkClicked(e,"Add")}} disabled={!formik.isValid && activeStep===2}>Add</Button>) : <Button onClick={(e)=>handleNext(e)} >Next</Button>}
                                        </Box>
                                    {/* <Button type="submit" disabled={!formik.isValid}>Register</Button> */}
                                </Form>        
                            )
                        }
                    }
                    
                </Formik>
            </Card.Body>
        </Card>
    </div>
    {/* )} */}
    </>
    )
}

export default CreateEvent