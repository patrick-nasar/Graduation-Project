
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import { getcompanyId, getuserId, setuserName } from '../api/data'
import { getToken } from '../api/token'

export default function EditUser() {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [user, setUser] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')
    const [dateJoined, setdateJoined] = useState('')
    const [lastLogin, setlastLogin] = useState('')
    const [isAdmin, setIsAdmin] = useState()
    const [userTeams, setuserTeams] = useState([])
    const { id } = useParams();


    const handleEditUser = () => {
        let values = {
            first_name: first_name,
            last_name: last_name,
            username: user,
            email: email,
            password: password
        }
        console.log(values)

        api
            .put(`/api/user/update_user/${id}`, values)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    }

    useEffect(() => {
        api.get(`/api/user/get_user/${id}`)
            .then((res) => {
                console.log(res)
                setdateJoined(res.data.date_joined)
                setFirst_name(res.data.first_name)
                setLast_name(res.data.last_name)
                setemail(res.data.email)
                setlastLogin(res.data.last_login)
                setIsAdmin(res.data.is_superuser)
                setUser(res.data.username)
                setuserTeams(res.data.teams)
                console.log(userTeams)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='px-24 py-4 space-y-5'>
            <h1 className='text-2xl py-2'>Edit {user}:</h1>
            <div className='space-y-3'>
                <table className=''>
                    <tbody >
                        <tr>
                            <td className='py-2 ' >
                                <p>First name</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="text"
                                    placeholder={first_name}
                                    onChange={(e) => { setFirst_name(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Last name</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="text"
                                    placeholder={last_name}
                                    onChange={(e) => { setLast_name(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Email</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="text"
                                    placeholder={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>User name</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="text"
                                    placeholder={user}
                                    onChange={(e) => { setUser(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Password</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="password"
                                    placeholder={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Confirm Password</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    type="password"
                                    placeholder={confirmPassword}
                                    onChange={(e) => { setComfirmPassword(e.target.value) }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className='py-5 ' >
                                <p>User Teams</p>
                            </td>
                            <td className='py-5 pl-5'>
                                {userTeams.map((team, index) => (
                                    <span key={index} className='pr-4'>{team.name}</span>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Date Joined</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <p>{dateJoined}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='py-6 ' >

                                <button
                                    onClick={() => { handleEditUser() }}
                                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white dark:text-white dark:hover:text-gray-900 ">
                                    <span className="relative px-5 py-2.5 tracking-wide hover:tracking-widest transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Update
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
