import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            email: email,
            password: password
        }
        axios.post(`/api/login`, submitData).then(res => {
            // console.log('res', res)
            if (res.data.status == 200) {
                navigate('/view-user');
                localStorage.setItem('accessToken', res.data.accessToken);
                Cookies.set('refreshToken', res.data.refreshToken);

                // localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('user_info', JSON.stringify(res.data.user))
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Login successful.',
                    showConfirmButton: false,
                    timer: 800 // This will close the alert after 2 seconds
                });

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
    }
    return (
        <div>

            <div class="login-page bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 offset-lg-1">
                            {/* <h2 class="mb-3 text-center">Login Now</h2> */}
                            <div class="bg-white shadow rounded">
                                <div class="row">
                                    <div class="col-md-7 pe-0">
                                        <div class="form-left h-100 py-5 px-5">
                                            <h2 class="mb-3 text-center">Login</h2>

                                            <form onSubmit={handleSubmit} class="row g-4">
                                                <div class="col-12">
                                                    <label>Email<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                        <input type="text" class="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <label>Password<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                        <input type="password" class="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div class="col-sm-6">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                        <label class="form-check-label" for="inlineFormCheck">Remember me</label>
                                                    </div>
                                                </div>



                                                <div class="col-12 d-flex justify-content-between align-items-center">
                                                    <Link to="/register" class="float-end text-primary text-underline ">Register</Link>
                                                    <button type="submit" class="btn btn-primary px-5 py-2 float-end mt-4">Login</button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-md-5 ps-0 d-none d-md-block">
                                        <div class="form-right h-100 bg-primary text-white text-center pt-5">
                                            {/* <i class="bi bi-bootstrap"></i> */}
                                            <i class="bi bi-person-circle"></i>

                                            <h2 class="fs-1 text-secondary">Welcome Back!!!</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-end text-secondary mt-3">Bootstrap 5 Login Page Design</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login