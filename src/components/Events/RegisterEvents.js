import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from "formik";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DeleteRegistrationAction, registeredEvents, updateTicketAction, userRegisteredEvents } from '../../actions/eventAction';
import swal from 'sweetalert';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import * as yup from 'yup'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'user_id', label: 'Name', minWidth: 100 },
    { id: 'event_id', label: 'Event', minWidth: 100 },
    { id: 'ticket_bought', label: 'Ticket Bought', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

const RegisterEvents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {data,isError,isLoading,msg} = useSelector((state) => state.EventReducer);
    const events = data;
    const getUserInfo = JSON.parse(localStorage.getItem('user-info'))
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const [previousValues, setPreviousValues]= useState([])
    useEffect(() => {
        if(getUserInfo.role_id === 2){
            dispatch(userRegisteredEvents(getUserInfo.id))
        }else{
            dispatch(registeredEvents())
        }
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const initialValues = {
        'ticket_bought' : ''
    }

    const user_event = {};
    const onSubmit = (values,{ resetForm }) => {
        const res = {...user_event, user_event:{...values,user_id:userInfo.id, event_id:previousValues.event_id,id:previousValues.id}}
        dispatch(updateTicketAction(res))
    }

    const validationSchema = yup.object({
        ticket_bought:yup.number().typeError('tickit bought must be a number').required('Required')
    })

    const deleteRegisteredEvent = (id) => {
        swal({
            title: '',
            text: "Are you sure you want to delete record?",
            icon: 'warning',
            buttons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result===true) {
                dispatch(DeleteRegistrationAction(id));
                swal("Deleted!", "Record has been deleted.", "success").then((res)=>{
                    if (res===true) {
                        window.location.reload()   
                    }
                })
                
            }
          })  
    }
    const res = {}
    const updateTicket = (data) => {
        handleOpen()
        setPreviousValues(data)
        
    }
    return (
        <>
        <Box height={70} />
            Event Registration
            <Container>
                <Paper sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            {isLoading === true ? 
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={2}><Spinner /></TableCell>    
                                    </TableRow>
                                </TableBody> :
                                isError === true ? 
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={2}>{msg}</TableCell>     
                                    </TableRow>
                                </TableBody> :
                            <TableBody>
                                {events ? events
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : (column.id==='action') ? (getUserInfo.role_id === 2 ? <><Button variant='info' onClick={()=>updateTicket(row)}>Update Ticket</Button>{' '}<Button variant='danger' onClick={()=>{deleteRegisteredEvent(row.id)}}>Delete</Button></> : <Button variant='danger' onClick={()=>{deleteRegisteredEvent(row.id)}}>Delete</Button>) : value}
                                            </TableCell>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                }):"No Record Found"}
                            </TableBody>}
                        </Table>
                    </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={events.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
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
                                                {/* <span class="error">{err_msg}</span> */}
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
            </Container>
        </>
    )
}

export default RegisterEvents