import Box from '@mui/material/Box'
import { useEffect, useState } from 'react';
import { Badge, Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEventAction, eventAction, searchByEntryFees, searchByName, searchByVenue, userEventAction, viewEventAction } from '../actions/eventAction';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../Event.css'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'mode', label: 'Mode', minWidth: 100 },
    { id: 'venue', label: 'Venue', minWidth: 100 },
    { id: 'start_date', label: 'Start Date', minWidth: 100 },
    { id: 'end_date', label: 'End Date', minWidth: 100 },
    { id: 'platform', label: 'Platform', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'entry_fees', label: 'Entry Fees', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
  ];
const Event = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUserInfo = JSON.parse(localStorage.getItem('user-info'))
    const [buttonClicked, SetButtonClicked] = useState(false)
    const [events, setEvents] = useState([])
    const {data,isError,isLoading,msg} = useSelector((state) => state.EventReducer);
    const [getAll, setGetAll] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    useEffect(()=>{ 
        if(getUserInfo.role_id && getUserInfo.role_id === 1){
            dispatch(userEventAction(getUserInfo.id))
        }else{
            if(getAll === true){
                dispatch(eventAction())
            }
        }
        // if(!isDelete){
            setEvents(data);
        // }
        

    },[isLoading,isDelete])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    if(buttonClicked === true){
        if(data.length === 1){
            navigate('/view-event', {state:data[0]})
        }
    }
    const viewEvent = (id) => {
        dispatch(viewEventAction(id))
        if(isLoading === false && isError=== false){
            SetButtonClicked(true)
        }
    }

    const deleteEvent = (id) => {
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
                dispatch(DeleteEventAction(id));
                setIsDelete(true);
                swal("Deleted!", "Record has been deleted.", "success").then((res)=>{
                    if (res===true) {
                        if(getUserInfo.role_id && getUserInfo.role_id === 1){
                            dispatch(userEventAction(getUserInfo.id))
                            setIsDelete(false)
                        }else{
                            // if(getAll === true){
                                dispatch(eventAction())
                                setIsDelete(false)
                            // }
                        }
                        setEvents(data);
                        navigate('/event')
                    }
                })
                
            }
          })  
    }

    const updateEvent = (id) => {
        const res = data.find((item) => item.id === id);
        let start_time = new Date(res.start_time).getUTCHours()+':'+new Date(res.start_time).getUTCMinutes()
        let end_time = new Date(res.end_time).getUTCHours()+':'+new Date(res.end_time).getUTCMinutes()
        const result_data = {...res, start_date: new Date(res.start_date), end_date:new Date(res.end_date), start_time:start_time, end_time : end_time}
        navigate('/create-event', {state:result_data})
    }

    const [paramData, setParamData] = useState("")
    const searchItems = (column_name,val) => {
        switch(column_name){
            case 'name' :
                const new_arr = [];
                if(events){
                    events.filter((item) => item.name.includes(val))
                }
                dispatch(searchByName({'id':getUserInfo.id, 'name':val}));
                setEvents(data)
                if(val.length > 0){
                    setGetAll(false)
                }else{
                    setGetAll(true)
                }
                break;
            case 'venue' :
                dispatch(searchByVenue({'id':getUserInfo.id, 'name':val}));
                setEvents(data)
                if(val.length > 0){
                    setGetAll(false)
                }else{
                    setGetAll(true)
                }
                break;

            case 'entry_fees' :
                dispatch(searchByEntryFees({'id':getUserInfo.id, 'name':val}));
                setEvents(data)
                if(val.length > 0){
                    setGetAll(false)
                }else{
                    setGetAll(true)
                }
                break;
                
        }
    }
    return (
        <>
        <Box height={70} />
        <Container>
        <Button onClick={()=>navigate('/create-event')}style={{"float":"left","marginBottom":"10px"}}>Create Event</Button>
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
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {(column.id==='name' || column.id==='venue' || column.id==='start_date' || column.id==='entry_fees') ? 
                            <input type ="text" name="search_name" id="search_name" onChange={(e) => searchItems(column.id,e.target.value)} className="form-control"/>:""}
                            
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    {isLoading === true ? 
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}><Spinner /></TableCell>    
                            </TableRow>
                        </TableBody> :
                        isError === true ? 
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7}>{msg}</TableCell>     
                            </TableRow>
                        </TableBody> :
                    <TableBody>
                        {events?events
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
                                        :(column.id==='status')?value==='open'?<Badge bg="success">{value}</Badge>:<Badge bg="danger">{value}</Badge>: (column.id==='action') ?(getUserInfo.role_id !==2 ?  (<><Button size="sm" onClick={()=>{viewEvent(row.id)}}>View</Button>{' '}<Button size="sm" variant="info" onClick={()=>updateEvent(row.id)}>Update</Button>{' '}<Button size="sm" variant="danger" onClick={()=>deleteEvent(row.id)}>Delete</Button></>) : <Button onClick={()=>{viewEvent(row.id)}}>View</Button> ): value}
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
        </Container>
        </>
    )
}

export default Event;