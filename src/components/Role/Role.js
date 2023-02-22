import Box from '@mui/material/Box'
import { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { roleAction } from '../../actions/roleAction';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
  ];
const Role = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(roleAction())
    },[])
    const role_data = useSelector((state) => state).RoleReducer;
    const roles = role_data.data;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
        <Box height={70} />
        <Container>
        <Button style={{"float":"left","marginBottom":"10px"}} onClick={()=>navigate('/create-role')}>Create Role</Button>
        <span style={{"textAlign":"center"}}>Roles</span>
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
                    {role_data.isLoading === true ? 
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}><Spinner /></TableCell>    
                            </TableRow>
                        </TableBody> :
                        role_data.isError === true ? 
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>{role_data.msg}</TableCell>     
                            </TableRow>
                        </TableBody> :
                    <TableBody>
                        {roles ? roles
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
                                        :  value}
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
            count={roles.length}
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

export default Role;