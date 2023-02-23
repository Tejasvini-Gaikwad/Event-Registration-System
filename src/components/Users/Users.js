import Box from '@mui/material/Box'
import { useEffect, useState } from 'react';
import {  Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { deleteAction, updateUserAction, usersAction } from '../../actions/usersAction';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 100 },
    { id: 'last_name', label: 'Last Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'contact_no', label: 'Contact No', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'pincode', label: 'Pincode', minWidth: 100 },
    { id: 'role_id', label: 'Role', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
  ];
const Users = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(usersAction())
    },[])
    const {data,isError,isLoading,msg} = useSelector((state) => state.UsersReducer);
    const users = data;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteRecord, setDelete] = useState(false);
    const navigate = useNavigate();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const roles = ['Registrants', 'Organizer', 'Admin']
    const deleteUser = (id) => {
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
                swal("Deleted!", "Record has been deleted.", "success");
            }
          })
        dispatch(deleteAction(id));
    }

    const updateUser = (id) => {
        const currentUpdateUser = users.find((item) => item.id === id);
        navigate('/register', {state : currentUpdateUser})
    }
    return (
        <>
        <Box height={70} />
        <Container>
        Users
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
                        {users ? users
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
                                        : (column.id === 'role_id') ? (roles[value-1]) : (column.id === 'action') ? (<><Button size="small" variant="outlined" onClick={()=>deleteUser(row.id)} startIcon={<DeleteIcon />}>Delete</Button></>) : value ? value : '-'}
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
            count={users.length}
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

export default Users;