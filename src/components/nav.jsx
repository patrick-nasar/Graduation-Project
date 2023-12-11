import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useDarkMode from '../hook/useDarkMode';
import logo from '../img/logo.png'
import { getadmin, getteamId, getteamName, getuserId, getuserName, removeadmin, removecompanyId, removeteamId, removeteamName, removeuserId, removeuserName, setteamId, setteamName } from '../api/data';
import { getRefreshToken, getToken, removeRefreshToken, removeToken } from '../api/token';
import { useNavigate } from "react-router-dom";

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import api from '../api/api';
import useScrollDirection from '../hook/hideNAV';


export default function Nav() {
  const [colorTheme, setTheme] = useDarkMode();
  const [userName, setUserName] = useState(getuserName());
  const [userID, setUserID] = useState(getuserId());
  const [admin, setAdmin] = useState(getadmin() === 'true')
  const [teams, setTeams] = useState([])

  console.log(getadmin())
  const scrollDirection = useScrollDirection();
  // const [userName, setUserName] = useState('adw');
  const navigate = useNavigate();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorElTeam, setAnchorElTeam] = React.useState(null);
  const openTeam = Boolean(anchorElTeam);


  const handleClickTeam = (event) => {
    api.get(`/api/user/get_user_teams/${getuserId()}`)
      .then((res) => {
        console.log('teams this is in nav useefect', res)
        console.log(res.data[0].team.name)
        setTeams(res.data)
      })
      .catch((err) => { console.log(err) })
    console.log(teams)

    setAnchorElTeam(event.currentTarget);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleLogOut = () => {
    removeToken()
    removeRefreshToken()
    removeadmin()
    removecompanyId()
    removeuserId()
    removeuserName()
    removeteamId()
    removeteamName()

    navigate('/')
    window.location.reload();
  }


  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElTeam(null);
  };

  const handleSelectTeam = (id, name) => {
    console.log(id, name)
    setteamName(name)
    setteamId(id)
    window.location.reload()
  }


  useEffect(() => {
    if (getToken() != null && getteamId() === null) {
      api.get(`/api/user/get_user_teams/${getuserId()}`)
        .then((res) => {
          console.log('teams this is in nav useefect', res)
          console.log(res.data[0].team.name)
          setTeams(res.data)
          setteamName(res.data[0].team.name)
          setteamId(res.data[0].team.id)
        })
        .catch((err) => { console.log(err) })
      console.log(teams)
    }

  }, [])

  // console.log('admin: ', typeof (admin))
  return (

    <div className={` sticky z-10 ${scrollDirection === "down" ? "-top-24" : "top-0"} w-full h-16 p-2 flex items-center justify-between border-b dark:border-b-slate-700  shadow-md transition-all duration-1000 bg-white dark:bg-slate-700 dark:text-white`}>
      <div className='flex justify-center items-center'>
        <Link to='/'>
        <img src={logo} className='w-24 h-24' />
        </Link>
        <div className='ml-5 space-x-5 '>
          {getadmin() != null &&
            <>
              <Link
                className='relative px-1 after:h-[2px] after:w-full after:bg-[#1976d2] after:absolute after:left-0 after:bottom-[-0.7rem] after:scale-x-0 after:hover:scale-x-105 after:transition after:duration-300 '
                to='/Flows'>Flows</Link>
              {admin === true ?
                <>
                  <Link
                    className='relative px-1 after:h-[2px] after:w-full after:bg-[#1976d2] after:absolute after:left-0 after:bottom-[-0.7rem] after:scale-x-0 after:hover:scale-x-105 after:transition after:duration-300 '
                    to='/Employes'>Manage Company</Link>
                  {/* <Link
                className='relative px-1 after:h-[2px] after:w-full after:bg-[#1976d2] after:absolute after:left-0 after:bottom-[-0.7rem] after:scale-x-0 after:hover:scale-x-105 after:transition after:duration-300 '
              to='/AddUser'>add User</Link> */}
                </>
                :
                <Link
                  className='relative px-1 after:h-[2px] after:w-full after:bg-[#1976d2] after:absolute after:left-0 after:bottom-[-0.7rem] after:scale-x-0 after:hover:scale-x-105 after:transition after:duration-300 '
                  to='/Team'>Team</Link>
              }
            </>
          }
        </div>
      </div>
      <div className=' space-x-1 pr-2'>
        <Button
          sx={{ color: 'black' }}
          onClick={() => { setTheme(colorTheme) }}>
          {colorTheme == 'dark' ?
            <DarkModeOutlinedIcon />
            :
            <LightModeOutlinedIcon className='text-white' />
          }
        </Button>
        {userName === null ?
          <>
            <Link
              className='px-3 py-[0.6rem] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg tracking-wide'
              to='/Login'>login</Link>
            <Link
              className='px-3 py-[0.6rem] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg tracking-wide'
              to='/Register'>register</Link>
          </>
          :
          <>

            {/*Team Select */}
            {admin != true &&
              <>
                <Button
                  id="basic-button"
                  aria-controls={openTeam ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openTeam ? 'true' : undefined}
                  variant="outlined"
                  sx={{ color: 'black' }}
                  onClick={handleClickTeam}
                >

                  Working in Team: {getteamName()}
                  {/* <div className='rounded-full bg-black w-8 h-8 ' /> */}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElTeam}
                  open={openTeam}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >

                  {teams.map((team) => (
                    <MenuItem key={team.team.id} onClick={() => { handleSelectTeam(team.team.id, team.team.name) }}>
                      <button>
                        Team: {team.team.name}
                      </button>
                    </MenuItem>
                  ))}


                </Menu>
              </>
            }

            {/*account dropdown menu */}
            < Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              className='text-black'
              onClick={handleClick}
            >
              {userName}
              {/* <div className='rounded-full bg-black w-8 h-8 ' /> */}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/EditUser/${userID}/edit`}>
                  Profile
                </Link>
              </MenuItem>

              {getadmin() === 'true' ?
                <MenuItem onClick={handleClose}>
                  <Link to='/Company'>
                    Company
                  </Link>
                </MenuItem>
                :
                <></>
              }
              <MenuItem onClick={() => {
                handleLogOut();
              }}>Logout</MenuItem>
            </Menu>
          </>
        }
      </div>
    </div >

  )
}
