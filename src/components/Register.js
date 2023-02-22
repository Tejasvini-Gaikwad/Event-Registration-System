import * as yup from 'yup'
import Card from 'react-bootstrap/Card';
import { ErrorMessage, Field, Form,Formik } from 'formik';
import { Button, Dropdown } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import '../Register.css';
import swal from 'sweetalert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../actions/action';
import { updateUserAction } from '../actions/usersAction';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate("");
    const previousValues = useLocation().state;
    const state_res = useSelector((state) => state).LoginReducer;
    const initialValues = {
        role_id:'',
        first_name:'',
        last_name:'',
        email:'',
        contact_no:'',
        password:'',
        confirmPassword:''
    }

    if(state_res.errors.length){
        const errorString = state_res.errors.reduce((acc,item)=>{
            return acc+","+item
        })
        swal({
            title: 'Registartion failed',
            text: errorString,
            icon: 'error',
            showCancelButton: false,
          }).then((result) => {
            if (result===true) {
                // navigate('/')
            }
          })
    }
    // const finalResult = 
    
    const user = {};
    const onSubmit = (values) => {
        if(previousValues){
            const res = {...user, user:values, id:previousValues.id}
        dispatch(updateUserAction(res))
        }else{
            const res = {...user, user:values}
            dispatch(registerAction(res))
            if(state_res.errors.length === 0){
            swal({
                title: 'Success',
                text: "Your registration is successful!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Great, show me the site!'
              }).then((result) => {
                if (result===true) {
                    navigate('/')
                }
              })
            }
        }
        
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = yup.object({
        role_id:yup.string().required("Required"),
        first_name:yup.string().required("Required"),
        last_name:yup.string().required("Required"),
        email:yup.string().required("Required").email("Invalid Email Format"),
        contact_no:yup.string().matches(new RegExp('[0-9]{7}'),'Phone number not valid').required( 'Phone number is required!' ).min(10).max(10),
        password:yup.string().matches(/[a-z]+/, "password must contain one lowercase character").matches(/[A-Z]+/, "password must contain one uppercase character").matches(/[@$!%*#?&]+/, "password must contain one special character").matches(/\d+/, "password must contain one number").required("Required").min(8),
        confirmPassword:yup.string().required("Required").oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    const roleArray = [
        {key:'', value:'Select Role'},
        {key:"1", value:'Organizer'},
        {key:"2", value:'Registrant'}
    ]
    return (
        <div className="card col-6 offset-3 register" style={{"width": "50%"}}>
        <Card className='card'>
            <Card.Header>Registration</Card.Header>
            <Card.Body>
                <Formik initialValues={previousValues || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {
                        formik => {
                            return (
                                <Form>
                                    <Row>
                                        <Col xs={12}>
                                            <Field as="select" name="role_id" id="role_id" className="form-control">
                                                {
                                                    roleArray.map((option) => {
                                                        return (
                                                            <option key={option.value} value={option.key}>{option.value}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="role_id" className="error" component="div" />
                                        </Col>
                                    </Row><br />
                                    <Row>
                                        <Col xs={6}>
                                            <Field type="text" name="first_name" id="first_name" className="form-control" placeholder="First Name" />
                                            <ErrorMessage name="first_name" className="error" component="div" /><br />
                                        </Col>
                                        <Col xs={6}>
                                            <Field type="text" name="last_name" id="last_name" className="form-control" placeholder="Last Name" />
                                            <ErrorMessage name="last_name" className="error" component="div" />
                                        </Col>
                                        
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={6}>
                                            <Field type="text" name="email" id="email" className="form-control" placeholder="Enter Email" />
                                            <ErrorMessage name="email" className="error" component="div" />
                                        </Col>
                                        <Col xs={6}>
                                            <Field type="text" name="contact_no" id="contact_no" className="form-control" placeholder="Enter Phone Number" />
                                            <ErrorMessage name="contact_no" className="error" component="div" />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={6}>
                                            <Field type="password" name="password" id="password" className="form-control" placeholder="Enter Password" />
                                            <ErrorMessage name="password" className="error" component="div" />
                                        </Col>
                                        <Col xs={6}>
                                            <Field type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Enter Confirm Password" />
                                            <ErrorMessage name="confirmPassword" className="error" component="div" /><br />
                                        </Col>
                                        <span className="error"></span><br/>
                                    </Row>
                                    <Row>
                                        <Button type="submit" disabled={!formik.isValid}>Register</Button>
                                        <Link to="/">Login</Link>
                                    </Row>
                                </Form>        
                            )
                        }
                    }
                    
                </Formik>
            </Card.Body>
        </Card>
    </div>
    )
}

export default Register;