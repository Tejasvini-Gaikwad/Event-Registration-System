import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../actions/action";
import '../Login.css'
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useEffect, useState } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const result = useSelector((state) => state);
    const data = useSelector((state) => state);
    const userData = data.LoginReducer;
    const [buttonClicked, setButtonClicked] = useState(false)
    const getUserInfo = JSON.parse(localStorage.getItem('user-info'));
    useEffect(()=>{
        if(getUserInfo && buttonClicked===true){
            swal({
                title: 'Success',
                text: "Login Successful!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Great, show me the site!'
              }).then((result) => {
                if (result===true) {
                    const role_id = JSON.parse(localStorage.getItem('user-info')).role_id;
                    if(getUserInfo.role_id === 3){
                        navigate('/dashboard')
                    }else{
                        navigate('/event')
                    }
                }
              })
        }
    },[data])
    
    // if(getUserInfo && getUserInfo.role_id !== 3){
    //     navigate('/event')
    // }
    const initialValues = {
        email:'',
        password:''
    }

    const user = {};
    const onSubmit = (values) => {
        const res = {...user, user:values}
        dispatch(checkLogin(res))
        setButtonClicked(true)
        // swal("Success", "Login Successfull!", "success");
    }

    const validationSchema = yup.object({
        email:yup.string().required("Required").email("Invalid Format"),
        password:yup.string().required("Required")
    })

    return (
                 <div className="card col-6 offset-3 login" style={{"width": "45%"}}>
                    <Card className='card'>
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                {
                                    formik => {
                                        return (
                                            <Form>
                                                <label>Email<span className="error">*</span></label>
                                                <Field type="text" name="email" id="email" className="form-control"/>
                                                <ErrorMessage name="email" className="error" component="div" /><br />
                                                <label>Password<span className="error">*</span></label>
                                                <Field type="password" name="password" id="password" className="form-control"/>
                                                <ErrorMessage name="password" className="error" component="div" /><br />
                                                <span className="error">{data.LoginReducer.msg}</span><br/>
                                                <Button type="submit" disabled={!formik.isValid}>Login</Button>
                                            </Form>        
                                        )
                                    }
                                }
                                
                            </Formik>
                            <br />
                            <span>Not a user ??</span><br />
                            <Link to="/register">Create a new account</Link><br />
                        </Card.Body>
                    </Card>
                </div>
            
        )
    }

export default Login