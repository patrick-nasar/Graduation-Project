import React, { useState } from 'react'
import logo from '../img/logo.png';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { setRefreshToken, setToken } from "../api/token";
import Wave from 'react-wavify';
import { Alert, Snackbar } from "@mui/material";
import jwtDecode from 'jwt-decode';
import { setadmin, setcompanyId, setuserId, setuserName } from '../api/data';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();

    const [step, setStep] = useState(true)

    const [username, setUsernamefild] = useState('')
    const [compName, setCompName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [companySpecialization, setCompanySpecialization] = useState('')
    const [accomplish, setAccomplish] = useState('')
    const [e_mail, setE_mail] = useState('')
    const [company_email, setCompany_email] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const validName = new RegExp(".[a-zA-Z]{1,20}$");
    const validcompName = new RegExp(".{1,50}$");
    const validEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/);
    const validPassword = new RegExp(".{8,30}$");
    const validPhone = new RegExp("^09[0-9]{8}$");

    const [ErrorText, setErrorText] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };


    const handlenext = (e) => {
        e.preventDefault()
        setStep(!step)
    }

    function validate(evt) {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = evt.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const handleregister = () => {
        let values = {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: e_mail,
            password: password,
            company: {
                name: compName,
                address: city + '-' + country + '-' + street,
                phone: phoneNumber,
                work_email: company_email,
                what_try_to_accomplish: accomplish,
                camp: 'awdaw'
            },
        }
        console.log(values);
        if (values.email === "" || values.password === "" || values.first_name === "" || values.last_name === "" || values.username === ""
            || values.company.work_email === "" || values.company.name === "" || values.company.address === "" || values.company.phone === "" || values.company.what_try_to_accomplish === "" || values.company.camp === "") {

            setErrorText('PLEASE FILL ALL FILEDS')
            console.log("e p empty")
            setOpen(true);
        }
        else if (password != confirmpassword) {
            console.log("pas and conf not same")
            setErrorText('PASSWORD AND CONFERM PASSWORD ARE NOT THE SAME')
            console.log("e p empty")
            setOpen(true);
        }
        else if (
            !validEmail.test(values.email)) {
            setErrorText('ADMIN EMAIL NOT VALID')
            setOpen(true)
        }
        else if
            (!validEmail.test(values.company.work_email)) {
            setErrorText('COMPANY EMAIL NOT VALID')
            setOpen(true)
        }
        else if
            (!validPassword.test(values.password)) {
            setErrorText('PASSWORD LUNGTH SHUOLD BE MORE THAN 8 ')
            setOpen(true)
        }
        else if
            (!validName.test(values.first_name)) {
            setErrorText('FIRST NAME NOT VALID')
            setOpen(true)
        }
        else if
            (!validName.test(values.last_name)) {
            setErrorText('LAST NAME NOT VALID')
            setOpen(true)
        }
        else if
            (!validPhone.test(values.company.phone)) {
            setErrorText('PHONE NUMBER NOT VALID')
            setOpen(true)
        }

        else {

            axios
                .post("http://127.0.0.1:8000/api/auth/register", values)
                .then((res) => {
                    console.log(res);
                    console.log(res);
                    var decoded = jwtDecode(res.data.access);
                    console.log(decoded)
                    setToken(res.data.access);
                    setRefreshToken(res.data.refresh);
                    setuserId(decoded.user_id)
                    setuserName(decoded.username)
                    setcompanyId(decoded.company_id)
                    setadmin(decoded.is_superuser)
                    navigate('/Flows')
                    window.location.reload(false);
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                    console.log(err.response.data[0]);
                    // console.log(err.response.data);
                    setErrorText('bggb')
                    setOpen(true);
                });
        }
    };


    return (
        <>
            <div className='bg-gradient-to-r from-green-400 to-blue-500'>
                {step ?
                    <div className="text-white w-full h-full flex flex-col justify-center items-center text-center ">
                        <div className='md:w-1/2 h-full p-7'>
                            <img src={logo} className='w-48 h-48 mx-auto' />
                            <div className=' m-auto px-7 py-10 bg-white rounded-md space-y-7 shadow-md backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937] sm:w-11/12'>
                                <h1 className='text-2xl font-bold'>Create your company</h1>
                                <form className='space-y-6 text-left m-3 pb-5'>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Company Name</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setCompName(e.target.value) }}
                                            value={compName} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Company email {/*<span className='text-bla'>*</span>*/}</p>
                                        <input type='email' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setCompany_email(e.target.value) }}
                                            value={company_email} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>City</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setCity(e.target.value) }}
                                            value={city} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Country</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setCountry(e.target.value) }}
                                            value={country} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Street</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setStreet(e.target.value) }}
                                            value={street} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Phone Number</p>
                                        <input type='text'
                                            className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onKeyPress={() => validate()}
                                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                                            value={phoneNumber} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Company Specialization</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setCompanySpecialization(e.target.value) }}
                                            value={companySpecialization} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>what are you trying to accomplish ?</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setAccomplish(e.target.value) }}
                                            value={accomplish} />
                                    </div>
                                    <button type='button' className='text-xl w-full h-12 bg-[#2563eb] rounded-lg focus:border-[#2563eb] focus:ring-sky-400'
                                        onClick={(e) => { handlenext(e) }}>Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-white w-full h-full flex flex-col justify-center items-center text-center">
                        <div className='md:w-1/2 h-full p-7'>
                            <img src={logo} className='w-48 h-48 mx-auto' />
                            <div className='m-auto px-7 py-10 bg-white rounded-md space-y-7 shadow-md backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937] sm:w-11/12'>
                                <h1 className='text-2xl font-bold'>Create admin</h1>
                                <form className='space-y-6 text-left m-3 pb-5'>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>User name</p>
                                        <input placeholder='You will login with your username' type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 placeholder-white placeholder-opacity-70 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400 '
                                            onChange={(e) => { setUsernamefild(e.target.value) }}
                                            value={username} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>E-mail</p>
                                        <input type='email' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setE_mail(e.target.value) }}
                                            value={e_mail} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>First name</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setFirstname(e.target.value) }}
                                            value={firstname} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Last name</p>
                                        <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setLastname(e.target.value) }}
                                            value={lastname} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Create Password</p>
                                        <input type='password' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            value={password} />
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='font-bold pl-1'>Confirm Password</p>
                                        <input type='password' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                                            value={confirmpassword} />
                                    </div>
                                    <button className='text-xl w-full h-12 bg-[#2563eb] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleregister()
                                        }}>Register</button>
                                    <button className='text-xl w-[30%] h-12 bg-[#2563eb] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                                        onClick={(e) => { setStep(!step) }}>Back</button>
                                </form>
                            </div>
                        </div>
                    </div>

                }
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {ErrorText}
                </Alert>
            </Snackbar>


            <div className=' w-full p-0 m-0 bg-gradient-to-r from-green-400 to-blue-500'>
                <Wave
                    className=' '
                    fill='#2563eb'
                    paused={false}
                    options={{
                        height: 20,
                        amplitude: 10,
                        speed: 0.38,
                        points: 9
                    }}
                />
            </div>
        </>
    )
}
