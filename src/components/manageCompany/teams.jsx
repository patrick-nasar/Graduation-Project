import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Checkbox, FormControlLabel, FormGroup, Tooltip } from '@mui/material';
import api from '../../api/api';
import { useEffect } from 'react';
import { getcompanyId } from '../../api/data';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Teams({ SetTeamSelected, SetTeamID }) {
    const [teams, setTeams] = useState([])
    const [users, setUsers] = useState([])
    const [teamID, setTeamID] = useState('');
    const [teamNameToDelete, setTeamNameToDelete] = useState('');
    const [teamIDToDelete, setTeamIDToDelete] = useState('');
    const [CreateOREdit, setCreateOREdit] = useState('');
    const [OldTeamName, setOldTeamName] = useState('');
    const [editORcreate, seteditORcreate] = useState('');
    const [createTeamUsers, setcreateTeamUsers] = useState('');
    let selectedUser = []



    const [open, setOpen] = useState(false);
    const [openteamUsers, setOpenteamUsers] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opencreat = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setOldTeamName('')
        setOpen(false);
        setAnchorEl(null);
        setOpenteamUsers(false)
    };


    const handleuserSelect = (e, username) => {
        let check = true
        selectedUser.forEach(user => {
            console.log('user', user.id)
            if (user.id === username) {
                check = false
            }
        });

        console.log(check)
        if (check) {
            selectedUser.push({ id: username },)
        }
        else {
            const updatedList = selectedUser.filter((selcted) => selcted.id !== username);
            selectedUser = updatedList
        }
        console.log(selectedUser)
    }


    const handleCreateWithUsers = () => {
        let values = {
            name: createTeamUsers,
            users: selectedUser
        }
        console.log(values)
        api.post('/api/team/create_team_with_users', values)
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }



    const handleCreate_Edit = () => {
        if (OldTeamName === '' && CreateOREdit === ('Create New Team')) {
            console.log('create')
            let value = { name: editORcreate }
            console.log(value)
            api
                .post("/api/team/create_team_without_users", value)
                .then((res) => {
                    console.log(res);
                    window.location.reload()
                    handleClose()
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                });
        }
        else {
            console.log(teams)
            console.log(teamID)
            console.log('edit')
            let value = { name: editORcreate }
            console.log(value)
            api
                .put(`/api/team/update_team/${teamID}`, value)
                .then((res) => {
                    console.log(res);
                    window.location.reload()
                    // handleClose()
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                });
        }
    }

    useEffect(() => {
        api.get(`/api/team/get_company_all_teams/${getcompanyId()}`)
            .then((res) => {
                console.log(res)
                setTeams(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <div>
            <div className='py-4 px-7 '>
                <div className='w-full flex justify-between items-center '>
                    <h1 className='py-4 font-bold text-lg '>Teams :</h1>
                    <>
                        {/*Team dropdown menu */}
                        < Button
                            id="basic-button"
                            aria-controls={opencreat ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opencreat ? 'true' : undefined}
                            className='text-black'
                            onClick={handleClick}
                        >
                            Create New Team
                            {/* <div className='rounded-full bg-black w-8 h-8 ' /> */}
                        </Button>
                        {/* create Team menu*/}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={opencreat}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                api.get(`/api/user/get_all_users_in_company/${getcompanyId()}`)
                                    .then((res) => {
                                        console.log('res', res)
                                        console.log('data', res.data)
                                        setUsers(res.data)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                                setOpenteamUsers(true)
                            }}>Create New Team With Users</MenuItem>
                            <MenuItem onClick={() => {
                                setCreateOREdit('Create New Team')
                                setOpen(true)
                            }}>
                                Create New Team Without Users
                            </MenuItem>
                        </Menu>
                    </>
                </div>
                <div className=' py-4 grid grid-cols-4 gap-5 '>
                    {teams.map((team, index) => (
                        <div key={index} className={`flex justify-between items-center px-3  text-left border border-sky-500 rounded-lg shadow-sm hover:shadow-md `}>
                            <button
                                key={index}
                                onClick={(e) => {
                                    SetTeamSelected(team.name)
                                    SetTeamID(team.id)
                                }}
                                className='flex-1 py-4 text-left'>
                                {team.name}
                            </button>
                            <div className='space-x-2'>
                                <button
                                    onClick={() => {
                                        setCreateOREdit(`Edit ${team.name} Name`)
                                        setOldTeamName(team.name)
                                        setTeamID(team.id)
                                        setOpen(true)
                                    }}
                                    className='py-4 hover:scale-110 transition duration-500'>
                                    <Tooltip title='Edit'>
                                        <EditOutlinedIcon />
                                    </Tooltip>
                                </button>
                                <button
                                    onClick={() => {
                                        setTeamNameToDelete(team.name)
                                        setTeamIDToDelete(team.id)
                                        setOpenDelete(true)
                                    }}
                                    className='py-4 text-red-600 hover:scale-110 transition duration-500'>
                                    <Tooltip title='Delete'>
                                        <DeleteOutlineOutlinedIcon />
                                    </Tooltip>
                                </button>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>

            {/* Create team without users or edit */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>{CreateOREdit}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={OldTeamName != '' ? "Enter New Name Here " : "Team Name"}
                        fullWidth
                        variant="standard"
                        onChange={(e) => { seteditORcreate(e.target.value) }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate_Edit}>{OldTeamName != '' ? "Edit Name" : "Create Team"}</Button>
                </DialogActions>
            </Dialog>

            {/* Create Team with user */}
            <Dialog open={openteamUsers} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Create Team with user</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Team Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setcreateTeamUsers(e.target.value) }}
                    />
                    <FormGroup row>
                        {users.map((users, index) =>
                            <div key={index}>
                                <FormControlLabel onChange={(e) => { handleuserSelect(e, users.id) }} control={<Checkbox />} label={users.username} />
                            </div>
                        )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateWithUsers}>Create Team</Button>
                </DialogActions>
            </Dialog>


            {/* Delete Dialog */}
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title">
                    {`Do you want to delete ${teamNameToDelete} ?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        NOTE: You can't recover {teamNameToDelete} after delete
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDelete(false);
                        console.log(`${teamNameToDelete} not deleted`)
                    }}>
                        Don't Delete
                    </Button>

                    <Button onClick={() => {
                        console.log(`${teamIDToDelete} deleted`)
                        api.delete(`/api/team/delete_team/${teamIDToDelete}`)
                            .then((res) => {
                                console.log(res)
                                window.location.reload()
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        setOpenDelete(false);
                    }} autoFocus>

                        <span className='text-red-600'>Delete</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
