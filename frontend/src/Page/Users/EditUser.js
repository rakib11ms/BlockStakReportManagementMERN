import MasterDashboardLayout from '../../Components/MasterDashboardLayout'
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
function EditUser() {
    let { id } = useParams();

    console.log('id', id)

    const [allFavColors, setAllFavColors] = useState([]);
    const [allProfession, setAllProfession] = useState([]);

    const [profession, setProfession] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [favouriteColors, setFavouriteColors] = useState([]);
    console.log('fav colors', favouriteColors)


    async function fetchProfessionData() {
        axios.get(`/api/all-profession`).then(res => {
            // console.log('res', res)
            if (res.data.status == 200) {

                setAllProfession(res.data.allProfession)
            }
        })
    }
    async function editUserData() {
        axios.get(`/api/edit-user/${id}`).then(res => {
            if (res.data.status == 200) {
                setName(res.data.edit_user.name)
                setEmail(res.data.edit_user.email);
                setPhone(res.data.edit_user.phone)
                setAddress(res.data.edit_user.address)
                setProfession(res.data.edit_user.profession._id)
                // if(res.data.edit_user.favourite_colors.includes('black')){
                //     setFavouriteColors()
                // }
                setFavouriteColors(res.data.edit_user.favourite_colors)
                // setPassword(res.data.edit_user.password)

                // setAllProfession(res.data.allProfession)
            }
        })
    }
    useEffect(() => {
        fetchProfessionData();
        editUserData();

    }, [])

    const handleFavColorChange = (e) => {
        if (e.target.value == "black") {
            if (e.target.checked) {
                setFavouriteColors([...favouriteColors, e.target.value])

            }
            else {
                setFavouriteColors(
                    favouriteColors.filter((val) => {
                        return val !== "black"
                    })
                )

            }
        }
        if (e.target.value == "white") {
            if (e.target.checked) {
                setFavouriteColors([...favouriteColors, e.target.value])


            }
            else {
                setFavouriteColors(
                    favouriteColors.filter((val) => {
                        return val !== "white"
                    })
                )
            }
        }
        if (e.target.value == "red") {
            if (e.target.checked) {
                setFavouriteColors([...favouriteColors, e.target.value])


            }
            else {
                setFavouriteColors(
                    favouriteColors.filter((val) => {
                        return val !== "red"
                    })
                )
            }
        }
        if (e.target.value == "others") {
            if (e.target.checked) {
                setFavouriteColors([...favouriteColors, e.target.value])


            }
            else {
                setFavouriteColors(
                    favouriteColors.filter((val) => {
                        return val !== "others"
                    })
                )
            }
        }
    }

    const submitData = {
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone,
        favourite_colors: favouriteColors,
        profession: profession
    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/register`, submitData).then(res => {
            console.log('res', res)
            if (res.data.status == 200) {
                navigate('/view-user')
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Registration successful.',
                    showConfirmButton: false,
                    timer: 800 // This will close the alert after 2 seconds
                });

            }
            else if (res.data.status == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${res.data.error}`,
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
        <MasterDashboardLayout>
            <div className='card-body bg-white'>
                <div className='d-flex justify-content-between '>
                    <div>
                        <h3>Create User</h3>

                    </div>
                    <div className="">
                        <button className='btn btn-light border py-2'>
                            <Link to="/view-user">
                                View
                            </Link>
                        </button>
                    </div>
                </div>
                <div class="row bg-white">
                    <div class="col-md-12 pe-0">
                        <div class="form-left h-100 py-5 px-5">

                            <form class="row g-4" onSubmit={handleSubmit}>
                                <div className='col-md-6'>
                                    <div class="col-12">
                                        <label>Name<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-person"></i></div>
                                            <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label>Email<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-envelope"></i>
                                            </div>
                                            <input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label>Phone<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-telephone"></i></div>
                                            <input type="number" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label>Password<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-lock"></i></div>
                                            <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label>Profession<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-file-earmark-person"></i></div>
                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setProfession(e.target.value)}>
                                                <option selected disabled>Choose Profession</option>
                                                {
                                                    allProfession.map((item, i) => {
                                                        return (
                                                            <option value={item._id} selected>{item.name}</option>

                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6'>


                                    <div class="col-12">
                                        <label>Favourite Colors<span class="text-danger">*</span></label>

                                        <div class="d-flex my-2 mb-3">
                                            <div class="form-check mx-2">
                                                <input class="form-check-input" type="checkbox" value="black" id="flexCheckDefault" onChange={handleFavColorChange} checked={favourite_colors.includes('black')?true:false} />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Black
                                                </label>
                                            </div>
                                            <div class="form-check mx-2">
                                                <input class="form-check-input" type="checkbox" value="red" id="flexCheckDefault" onChange={handleFavColorChange} checked={favourite_colors.includes('black')?true:false} />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Red
                                                </label>
                                            </div>
                                            <div class="form-check mx-2">
                                                <input class="form-check-input" type="checkbox" value="white" id="flexCheckDefault" onChange={handleFavColorChange} checked={favourite_colors.includes('black')?true:false} />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    White
                                                </label>
                                            </div>
                                            <div class="form-check mx-2">
                                                <input class="form-check-input" type="checkbox" value="others" id="flexCheckDefault" onChange={handleFavColorChange} checked={favourite_colors.includes('black')?true:false} />
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Others
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-12">
                                        <label>Address<span class="text-danger">*</span></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-text"><i class="bi bi-house"></i></div>
                                            <input type="text" class="form-control" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-12 d-flex justify-content-between align-items-center">

                                        <button type="submit" class="btn btn-primary px-5 py-2 float-end mt-4">Create User</button>

                                    </div>
                                </div>





                            </form>
                        </div>
                    </div>


                </div>


            </div>
        </MasterDashboardLayout>
    )
}

export default EditUser