import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Snackbar } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { getcompanyId, getuserId } from '../api/data'
import { getToken } from '../api/token'
import { SnackbarComp } from '../components/snackbar'

export default function AddUser() {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [user, setUser] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setComfirmPassword] = useState('')
  const [teams, setTeams] = useState([])

  const navegat = useNavigate()

  const [isAdmin, setIsAdmin] = useState(false)
  let selectedTeam = []

  const [open, setOpen] = useState(false);
  const [barType, setbarType] = useState('success');
  const [massege, setMassege] = useState('');
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTeamSelect = (e, teamID) => {
    let check = true
    selectedTeam.forEach(user => {
      console.log('user', user.id)
      if (user.id === teamID) {
        check = false
      }
    });

    console.log(check)
    if (check) {
      selectedTeam.push({ id: teamID },)
    }
    else {
      const updatedList = selectedTeam.filter((selcted) => selcted.id !== teamID);
      selectedTeam = updatedList
    }
    console.log(selectedTeam)
  }



  const handleAddUser = () => {
    if (confirmPassword != password) {
      setMassege("ConfirmPassword Dosen't match with Password")
      setbarType('error')
      setOpen(true)
    }
    else {
      let values = {
        first_name: first_name,
        last_name: last_name,
        username: user,
        email: email,
        password: password
      }
      console.log(values)

      if (isAdmin === false) {
        if (selectedTeam.length === 0) {
          let values = {
            first_name: first_name,
            last_name: last_name,
            username: user,
            email: email,
            password: password
          }
          console.log(values)

          api
            .post("/api/user/create_normal_user", values)
            .then((res) => {
              console.log(res);
              setMassege('User Created Successfuly')
              setbarType('success')
              setOpen(true)
              setTimeout(() => {

                navegat('/Employes')
              }, 2000);

            })
            .catch((err) => {
              console.log(err);
              console.log(err.message);
              setMassege('Change User Name or Email ')
              setbarType('error')
              setOpen(true)
            });

        }
        else {
          let values_Team = {
            first_name: first_name,
            last_name: last_name,
            username: user,
            email: email,
            password: password,
            teams: selectedTeam
          }

          console.log(values_Team)
          api
            .post("/api/user/create_normal_user_with_team", values_Team)
            .then((res) => {
              console.log(res);
              setMassege('User Created Successfuly')
              setbarType('success')
              setOpen(true)
              setTimeout(() => {

                navegat('/Employes')
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              console.log(err.message);
              setMassege('Change User Name or Email')
              setbarType('error')
              setOpen(true)
            });
        }

      }
      else {
        let values = {
          first_name: first_name,
          last_name: last_name,
          username: user,
          email: email,
          password: password,
        }
        console.log(values)

        api
          .post("/api/user/create_super_user", values)
          .then((res) => {
            console.log(res);
            setMassege('User Created Successfuly')
            setbarType('success')
            setOpen(true)
            setTimeout(() => {

              navegat('/Employes')
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            console.log(err.message);
            setMassege('Change User Name or Email')
            setbarType('error')
            setOpen(true)

          });

      }
    }
  }

  useEffect(() => {
    api.get(`/api/team/get_company_all_teams/${getcompanyId()}`)
      .then((res) => {
        console.log(res.data)
        setTeams(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='px-24 py-4 space-y-2'>
      <h1 className='text-2xl py-2'>Add user :</h1>
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
                  onChange={(e) => { setComfirmPassword(e.target.value) }}
                />
              </td>
            </tr>
            {/* <tr>
              <td className='py-2 ' >
                <p>Description</p>
              </td>
              <td className='py-2 pl-5'>
                <input
                  className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                  type="text"
                  onChange={(e) => { setDescription(e.target.value) }}
                />
              </td>
            </tr> */}
            <tr>
              <td className='py-2 ' >
                <p>Admin</p>
              </td>
              <td className='py-2 pl-5'>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isAdmin}
                    // onChange={handleChangetype(e, index)}
                    onChange={(e) => setIsAdmin(e.target.value)}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>

            <tr>
              <td className='py-2 ' >
                <p>Add to Team:</p>
              </td>
              <td className='py-2 pl-5'>
                <FormGroup row>
                  {teams.map((team, index) =>
                    <div key={index}>
                      <FormControlLabel onChange={(e) => { handleTeamSelect(e, team.id) }} control={<Checkbox />} label={team.name} />
                    </div>
                  )}
                </FormGroup>

              </td>
            </tr>

          </tbody>
        </table>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => { handleAddUser() }}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add user
          </span>
        </button>
      </div>

      <SnackbarComp handleClose={handleClose} open={open} barType={barType} massege={massege} />

    </div>
  )
}
