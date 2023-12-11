import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../api/api'
import { getteamId, getteamName, getuserId } from '../api/data'

export const TeamForUser = () => {
    const [users, setUsers] = useState([])
    const [datasets, setDatasets] = useState([])
    const [flows, setflows] = useState([])
    const [show, setshow] = useState(false)

    useEffect(() => {
        console.log(getteamId())
        api.get(`/api/user/get_user_one_team/${getuserId()}/${getteamId()}`)
            .then((res) => {
                console.log(res.data[0])
                setUsers(res.data[0].team.users)
                setDatasets(res.data[0].team.datasets)
                setflows(res.data[0].team.flows)
                setshow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className='py-4 px-7 '>
            {/* <button onClick={()=>{
                console.log(users)
                console.log(datasets)
                console.log(flows)
                }}>awdawd</button> */}
            {show ?
                <>
                    <h1 className='py-4 font-bold text-lg '>Users in {getteamName()}:</h1>
                    <div className=' py-4 grid grid-cols-3 gap-5'>
                        {users.map((user, index) => (
                            <ul key={index}
                                className={`py-2 px-3 space-y-2 bg-white border-[1px] border-sky-500 rounded-lg  shadow-sm hover:shadow-md `}>
                                <li>
                                    <div className='flex justify-between'>
                                        <div>
                                            User Name: <span className='font-semibold'>{user.username}</span>
                                        </div>
                                    </div>
                                </li>
                                <li>Email: {user.email}</li>
                                <li>First Name: {user.first_name} </li>
                                <li>Last Name: {user.last_name} </li>

                                {/* <li>Admin: {user.is_superuser ? ' Yes' : ' No'}</li>
                                <li>ID: {user.id}</li>
                                <li>Last Login: {user.last_login ? user.last_login.slice(0, 10) : ' Did not login yet'} </li>
                                <li>Staff: {user.is_staff ? ' Yes' : ' No'} </li>
                                <li>Active: {user.is_active ? ' Yes' : ' No'} </li> */}

                            </ul>
                        ))}
                    </div>

                    <h1 className='py-4 font-bold text-lg '>Datasets in {getteamName()}:</h1>
                    <div className=' py-4 grid grid-cols-3 gap-5'>
                        {datasets.map((dataset, index) => (
                            <div key={index}
                                className={`py-2 px-3 space-y-2 bg-white border-[1px] border-sky-500 rounded-lg  shadow-sm hover:shadow-md `}>
                                <p>Name: {dataset.name}</p>
                            </div>
                        ))}
                    </div>

                    <h1 className='py-4 font-bold text-lg '>Flow in {getteamName()}:</h1>
                    <div className=' py-4 grid grid-cols-3 gap-5'>
                        {flows.map((flow, index) => (
                            <div key={index}
                                className={`py-2 px-3 space-y-2 bg-white border-[1px] border-sky-500 rounded-lg  shadow-sm hover:shadow-md `}>
                                <p>Name: {flow.name}</p>
                                <p>Description: {flow.description}</p>
                            </div>
                        ))}
                    </div>

                </>
                :
                <></>
            }
        </div >
    )
}
