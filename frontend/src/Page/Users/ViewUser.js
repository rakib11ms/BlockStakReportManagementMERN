import React, { useState, useEffect } from 'react';
import MasterDashboardLayout from '../../Components/MasterDashboardLayout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function ViewUser() {
  // Retrieve the JSON string from localStorage
  const user_data = JSON.parse(localStorage.getItem('user_info'));

  console.log('User Info:', user_data);


  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  // console.log('all users', allUsers)
  const [loading, setLoading] = useState(true);

  async function fetchAllUsers() {
    axios.get(`/api/all-users`).then(res => {
      console.log('res', res)
      if (res.data.status == 200) {
        setLoading(false)
        const final_result = res.data.all_users.map((item, i) => {
          return (
            {
              sl: i + 1,
              _id: item._id,
              name: item.name,
              email: item.email,
              password: item.password,
              phone: item.phone,
              profession: item.profession.name,
              address: item.address,
              role: item.role ? item.role.name : '',
              favourite_colors: item.favourite_colors
            }
          )

        })
        setAllUsers(final_result)
      }
    })
  }
  const [renderData, setRenderData] = useState('')
  useEffect(() => {
    fetchAllUsers();
  }, [renderData]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


  const columns = [
    // { id: '_id', label: 'ID' },
    { id: 'sl', label: 'SL' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'address', label: 'Address' },
    { id: 'profession', label: 'Profession' },
    { id: 'favourite_colors', label: 'Fav Colors' },
    { id: 'role', label: 'Role' },
    {
      id: 'action',
      label: 'Action',
      render: (data) => (
        <div>
          <IconButton color="primary" aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const handleDelete = (Id) => {
    console.log('id', Id)

    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/delete-user/${Id}`).then(res => {
          // console.log('res', res)
          if (res.data.status == 200) {
            // navigate('/view-user');
            setRenderData(res.data)
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');


          }
          else if (res.data.status == 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `${res.data.message}`,
              showConfirmButton: false,
            });
          }
        }).catch((error) => {

          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong.',
            confirmButtonText: 'OK',
          })

        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });


  }


  return (
    <MasterDashboardLayout>
      <div class="card card-body">
        <div className='d-flex justify-content-between '>
          <div>
            <h3>View user list</h3>

          </div>
          <div className="">
            <button className='btn btn-light border py-2'>
              <Link to="/create-user">
                Create
              </Link>
            </button>
          </div>
        </div>
        <div className='my-3  '>
          <TextField
            label="Search"
            variant="outlined"
            padding='10'
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon color="action" fontSize="small" />,
            }}
            className='py-0'
          />
        </div>

        {
          loading ? 'Loading...' :
            <>

              <TableContainer component={Paper}>
                <Table style={{ border: '1px solid #e0e0e0' }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      allUsers.length <= 0 && <><h4 className='text-center py-3'>No Data found</h4></>
                    }

                    {allUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                        <TableRow key={user.sl}>
                          {columns.map((column) => (
                            <TableCell key={column.id}>
                              {column.id === 'action' ? (
                                <div className=''>
                                  <Link to={`/edit-user/${user._id}`}>

                                    <IconButton color="primary" aria-label="Edit">
                                      <EditIcon />

                                    </IconButton>
                                  </Link>

                                  <IconButton color="secondary" aria-label="Delete" onClick={() => handleDelete(user._id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              ) : (
                                user[column.id]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>



              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
        }
      </div>

    </MasterDashboardLayout>
  );
}

export default ViewUser;
