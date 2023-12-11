import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import Wave from 'react-wavify'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import api from "../api/api";
import { setRefreshToken, setToken } from "../api/token";
import { getuserId, setadmin, setcompanyId, setuserId, setuserName } from '../api/data';
import { Alert, Snackbar } from "@mui/material";

export default function Login() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [ErrorText, setErrorText] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };



    const handleSubmit = () => {
        let values = {
            username: userName,
            password: password
        }
        console.log('value', values)

        if (values.username === "") {

            setErrorText('Username is empty ')
            setOpen(true)
        }
        else if (values.password === "") {

            setErrorText('Password is empty')
            setOpen(true)
        }

        else {
            const login = async () => {
                await api
                    .post("/api/auth/login/", values)
                    .then((res) => {
                        console.log(res);
                        var decoded = jwt_decode(res.data.access);
                        console.log(decoded)
                        setuserId(decoded.user_id)
                        setToken(res.data.access);
                        setRefreshToken(res.data.refresh);
                        setuserName(decoded.username)
                        setcompanyId(decoded.company_id)
                        setadmin(decoded.is_superuser)
                        navigate('/Flows')
                        window.location.reload(false);
                    })
                    .catch((err) => {
                        setErrorText('awdwad')
                        setOpen(true)
                        console.log(err);
                        console.log(err.message);
                    });
            }

            login().catch((err) => { console.log('err', err) })
        }
    };

    return (
        <div>
            <div className="relative w-full h-[79dvh] text-white flex flex-col justify-center items-center text-center z-90
            bg-gradient-to-r from-green-400 to-blue-500 "
            // style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'bottom center' }}
            >
                <img src={logo} className='w-48 h-48' />
                <div className=' md:w-1/2 h-fit px-7 py-10 bg-white rounded-md space-y-7 shadow-md backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937] sm:w-11/12 '>
                    <h1 className='text-2xl font-bold'>Sign in to your account</h1>
                    <form className='space-y-6 text-left m-3 pb-5 '>
                        <div className='space-y-2'>
                            <p className='font-bold pl-1'>User name</p>
                            <input type='text' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                onChange={(e) => { setUserName(e.target.value) }} />
                        </div>
                        <div className='space-y-2'>
                            <p className='font-bold pl-1'>Password</p>
                            <input type='password' className='w-full h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151]  rounded-lg focus:outline-none focus:ring focus:ring-sky-400'
                                onChange={(e) => { setPassword(e.target.value) }} />

                        </div>
                        <button
                            type="button"
                            className='text-xl w-full h-12 bg-[#2563eb] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                            onClick={() => handleSubmit()}
                        >Login
                        </button>
                    </form>
                    <Link to='/register' className='text-xl text-[#2563eb]'>Don't have an account?</Link>
                </div>
            </div>
            <div className=' w-full p-0 m-0 bg-gradient-to-r from-green-400 to-blue-500'>
                <Wave
                    className=' '
                    fill='#2563eb'
                    paused={false}
                    options={{
                        height: 10,
                        amplitude: 10,
                        speed: 0.38,
                        points: 9
                    }}
                />
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
        </div>
    )
}
