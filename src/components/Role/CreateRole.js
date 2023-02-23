import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from "formik"
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import Box from '@mui/material/Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch ,useSelector} from 'react-redux';
import { roleAction } from '../../actions/roleAction';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import BasicBreadcrumbs from '../../common/BasicBreadcrumbs';

const breadcrum = [{key:'/role',value:"index", component:"Role"}]

const CreateRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        name:'',
    }

    const {data} = useSelector((state) => state.RoleReducer);

    const role = {};
    const onSubmit = (values,{ resetForm }) => {
        const res = {...role, role:values}
        dispatch(roleAction(res))
        if(data.message){
            swal({
                title: 'Success',
                text: data.message,
                icon: 'success',
                showCancelButton: false,
              }).then((result) => {
                if (result===true) {
                    resetForm();
                }
              })
        }

    }

    const validationSchema = yup.object({
        name:yup.string().required("Required")
    })

    return (
        <>
        <Box height={70} />
        <BasicBreadcrumbs data={breadcrum}/>
        <div className="card col-6 offset-3" style={{"width": "45%"}}>
            <Card className='card'>
                <Card.Header>Add Role</Card.Header>
                <Card.Body>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {
                            formik => {
                                return (
                                    <Form>
                                        <Row>
                                            <Col xs={6}>
                                                <Field type="text" name="name" id="name" className="form-control"/>
                                                <ErrorMessage name="name" className="error" component="div" /><br />
                                            </Col>
                                            <Col xs={6}>
                                                <Button type="submit" disabled={!formik.isValid}>Add</Button>
                                            </Col>
                                        </Row>
                                    </Form>        
                                )
                            }
                        }
                        
                    </Formik>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default CreateRole