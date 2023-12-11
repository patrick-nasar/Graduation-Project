import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import api from '../../api/api';
import { getcompanyId } from '../../api/data';

export default function Users({ teamID }) {
    const [users, setUsers] = useState([])
    const [AddUsersToTeam, setAddUsersToTeam] = useState([])
    const [userNameToDelete, setuserNameToDelete] = useState()
    const [userIDToDelete, setuserIDToDelete] = useState()
    const [TeamName, setTeamName] = useState('')


    const [open, setOpen] = useState(false);
    const [openAddToTeam, setOpenAddToTeam] = useState(false);

    const handleAddUserDialog = () => {
        api.get(`/api/user/get_all_users_in_company/${getcompanyId()}`)
            .then((res) => {
                console.log(res)
                setAddUsersToTeam(res.data)
                setOpenAddToTeam(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleadUserAPI = (userid) => {
        let values = {
            id: userid,
            teams: [{
                id: teamID
            }]
        }
        console.log(values)
        api.post('/api/user/add_user_to_team', values)
            .then((res) => {
                console.log(res)
                setOpenAddToTeam(false)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleClose = () => {
        setOpen(false);
        setOpenAddToTeam(false);
    }

    // console.log('teamsid', teamID)
    useEffect(() => {
        if (teamID != null) {
            api.get(`/api/team/get_company_one_team/${teamID}`)
                .then((res) => {
                    console.log('res', res)
                    console.log('data', res.data[0].users)
                    setUsers(res.data[0].users)
                    setTeamName(res.data[0].name)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            console.log('all users')
            api.get(`/api/user/get_all_users_in_company/${getcompanyId()}`)
                .then((res) => {
                    console.log('res', res)
                    console.log('data', res.data)
                    setUsers(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div>
            <div className='py-4 px-7 '>
                <div className='w-full flex justify-between items-center '>
                    <h1 className='py-4 font-bold text-lg capitalize'>{TeamName != '' && TeamName} Users :</h1>
                    <div className='space-x-3'>
                        {teamID != null &&
                            <>
                                <button
                                    onClick={() => { handleAddUserDialog() }}
                                    className='py-[0.4rem] px-3 border border-[#1976d2] rounded-lg shadow-sm '>
                                    Add new user to team
                                </button>
                            </>
                        }
                        <Link to='/AddUser'
                            className='py-2 px-3 border border-[#1976d2] rounded-lg shadow-sm '>
                            Create New User
                        </Link>

                    </div>

                </div>
                <div className=' py-4 grid grid-cols-3 gap-5 '>
                    {users.map((user, index) => (
                        <ul key={index}
                            className={`py-2 px-3 space-y-2 bg-white border-[1px] border-sky-500 rounded-lg  shadow-sm hover:shadow-md hover:scale-105 transform duration-300`}>
                            <li>
                                <div className='flex justify-between'>
                                    <div>
                                        User Name: <span className='font-semibold '>{user.username}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            // handelDelete(user.username)
                                            setuserNameToDelete(user.username)
                                            setuserIDToDelete(user.id)
                                            setOpen(true)
                                        }}
                                        className='  text-red-600 hover:scale-110 transition duration-500'>
                                        <Tooltip title={teamID != null ? 'Delete From Team' : 'Delete'}>
                                            <DeleteOutlineOutlinedIcon />
                                        </Tooltip>
                                    </button>
                                </div>
                            </li>
                            <li>ID: {user.id}</li>
                            <li>Email: {user.email}</li>

                            <li>Admin: {user.is_superuser ? ' Yes' : ' No'}</li>

                            <li>First Name: {user.first_name} </li>
                            <li>Last Name: {user.last_name} </li>

                            <li>Last Login: {user.last_login ? user.last_login.slice(0, 10) : ' Did not login yet'} </li>
                            <li>Staff: {user.is_staff ? ' Yes' : ' No'} </li>
                            {/* <li>Active: {user.is_active ? ' Yes' : ' No'} </li> */}
                            <li>{teamID != null
                                ?
                                <></>
                                :
                                <>
                                    <span>Teams: </span>
                                    {user.teams.map((team, index) => (
                                        <span key={index}>{team.name} - </span>
                                    ))}
                                </>
                            }</li>


                        </ul>
                    ))
                    }

                </div>
            </div>

            {/* Delete */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title">
                    {teamID != null ? `Do you want to delete ${userNameToDelete} from ${TeamName} ?` : `Do you want to delete ${userNameToDelete} ?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        NOTE: You can't recover {userNameToDelete} after delete
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                        console.log(`${userNameToDelete} not deleted`)
                    }}>
                        { } Don't Delete
                    </Button>

                    <Button onClick={() => {
                        if (teamID != null) {

                            let values = {
                                id: userIDToDelete,
                                teams: [{ id: teamID }]
                            }

                            console.log(values)
                            api.delete(`/api/user/delete_user_from_team`, { data: values })
                                .then((res) => {
                                    console.log(res)
                                    window.location.reload()
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        else {
                            api.delete(`/api/user/delete_user/${userIDToDelete}`)
                                .then((res) => {
                                    console.log(res)
                                    window.location.reload()
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        handleClose()
                    }} autoFocus>

                        {teamID != null ? <span className='text-red-600'>Delete from team</span> : <span className='text-red-600'>Delete</span>}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add user to TeamName */}
            <Dialog
                open={openAddToTeam}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='md'
            >
                <DialogTitle id="alert-dialog-title">
                    {`Add user to ${TeamName} `}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-2'>
                            {AddUsersToTeam.map((user, index) => (
                                <div key={index}>
                                    <button className='w-36 h-14 border border-blue-500 rounded-md text-black'
                                        onClick={() => handleadUserAPI(user.id)}
                                    >
                                        {user.username}
                                    </button>
                                    {/* <button className='w-32 h-14 border border-blue-500 rounded-md text-black' key={user.username}>
                                        {user.username}
                                    </button>
                                    <button className='w-32 h-14 border border-blue-500 rounded-md text-black' key={user.username}>
                                        {user.username}
                                    </button> */}
                                </div>
                            ))}
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog >
            
        </div >
    )
}
