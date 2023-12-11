import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api/api'
import { getcompanyId, getuserId } from '../../api/data'
// import{ parse , jsonToCSV} from 'papaparse'
import Papa from 'papaparse'
import axios from 'axios'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';




export const DataSets = () => {
  const [dataSets, setdataSets] = useState([])
  const [dataSetsID, setdataSetsID] = useState()
  const [dataSetsName, setdataSetsName] = useState()
  const [csv, setcsv] = useState()
  const [xxxx, setxxxx] = useState([])
  const [editDatasetName, setEditDatasetName] = useState('')


  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false)
    setEditDatasetName('')
  };

  useEffect(() => {
    api.get(`/api/dataset/get_datasets_company/${getcompanyId()}`)
      .then((res) => {
        console.log('dataseet', res.data)
        setdataSets(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // console.log(dataSets[1].teams.length)
  return (
    <>
      <div className='w-full flex justify-between items-center px-7 '>
        <h1 className='py-4 font-bold text-lg '>Datasets: </h1>
        <div className='space-x-3'>
          <Link
            to='/Add_DataSet'
            className='py-[0.4rem] px-3 border border-[#1976d2] rounded-lg shadow-sm '>
            Add new dataset
          </Link>

        </div>

      </div>
      <div className='grid grid-cols-3 gap-4 py-3 px-7 '>
        {/* <button onClick={()=>console.log(dataSets[0].teams.length)}>awd</button> */}
        {dataSets.map((dataset) => (
          <ul key={dataset.id}
            className={`py-2 px-3 space-y-2 bg-white border-[1px] border-sky-500 rounded-lg  shadow-sm hover:shadow-md hover:scale-105 transform duration-300`}>
            <li>
              <div className='flex justify-between'>
                <div>
                  Dataset Name: <span className='font-semibold w-9 text-ellipsis overflow-hidden'>{dataset.name.slice(0,20)}</span>
                </div>
                <div className='space-x-2'>
                  <button
                    onClick={(e) => {
                      setdataSetsID(dataset.id)
                      setdataSetsName(dataset.name)
                      setOpenEdit(true)
                    }}
                    className='hover:scale-110 transition duration-500'>
                    <Tooltip title='Edit Dateset'>
                      <EditOutlinedIcon />
                    </Tooltip>
                  </button>
                  <button
                    onClick={(e) => {
                      setdataSetsID(dataset.id)
                      setdataSetsName(dataset.name)
                      setOpen(true)
                    }}
                    className='  text-red-600 hover:scale-110 transition duration-500'>
                    <Tooltip title='Delete Dateset'>
                      <DeleteOutlineOutlinedIcon />
                    </Tooltip>
                  </button>
                </div>
              </div>
            </li>
            <li>Created_at: {dataset.created_at.slice(0, 10)}</li>
            <li>Updated_at: {dataset.updated_at.slice(0, 10)}</li>
            {/* <button onClick={() => { console.log(dataset.teams) }}>adwa123123123123 wd</button> */}
            <li>Teams:
              {dataset.teams.length != 0 ?
                <>
                  {dataset.teams.map((team) => (
                    <span key={team.id}> {team.name} , </span>
                  ))}
                </>
                :
                <span> No Team </span>
              }
            </li>
            {/* <li>teams: {dataset.name}</li>
            <li>teams: {dataset.name}</li> */}
          </ul>
        ))
        }

      </div >

      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullWidth
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${dataSetsName} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            NOTE: You can't recover {dataSetsName} after delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            console.log(`${dataSetsName} not deleted`)
          }}>
            Don't Delete
          </Button>

          <Button onClick={() => {
            api.delete(`/api/dataset/delete_dataset/${dataSetsID}`)
              .then((res) => {
                console.log(res)
                window.location.reload()
              })
              .catch((err) => {
                console.log(err)
              })

            handleClose()
          }} autoFocus>

            <span className='text-red-600'>Delete</span>
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit ${dataSetsName} Name `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter New Name Here "
              fullWidth
              variant="standard"
              onChange={(e) => { setEditDatasetName(e.target.value) }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
          }}>
            cancel
          </Button>

          <Button onClick={() => {
            if (editDatasetName === '') { console.log(editDatasetName) }
            else {
              console.log(editDatasetName)
              api.put(`/api/dataset/update_dataset/${dataSetsID}`, {
                name: editDatasetName
              })
                .then((res) => {
                  console.log(res)
                  window.location.reload()
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }} autoFocus>

            <span>Done</span>
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
