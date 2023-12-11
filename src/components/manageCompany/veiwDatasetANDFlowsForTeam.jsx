import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import api from '../../api/api'
import { getcompanyId } from '../../api/data';

export const VeiwDatasetsAndFlowsForTeam = ({ teamID, teamSelected }) => {
  const [datasets, setDatasets] = useState([])
  const [flows, setFlows] = useState([])
  const [datasetsForDialog, setdatasetsForDialog] = useState([])
  const [TeamName, setTeamName] = useState('')
  const [datasetToDeleteID, setdatasetToDeleteID] = useState('')
  const [datasetToDeleteName, setdatasetToDeleteName] = useState('')
  const [editDatasetName, setEditDatasetName] = useState('')
  const [AllFlows, setAllFlows] = useState('')

  const [openAddDataSetToTeam, setOpenAddDataSetToTeam] = useState(false);
  const [openDeleteDataSet, setOpenDeleteDataSet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [opernAddFlow, setopernAddFlow] = useState(false)
  const [openDeleteFlow, setopenDeleteFlow] = useState(false)

  const handleClose = () => {
    setOpenAddDataSetToTeam(false)
    setOpenDeleteDataSet(false)
    setOpenEdit(false)
    setopernAddFlow(false)
  }

  const handleAddFlowDialog = () => {
    api.get(`/autoMLCore/flow/get_all_flows/${getcompanyId()}`)
      .then((res) => {
        console.log(res)
        setAllFlows(res.data)
        setopernAddFlow(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAddDatasetDialog = () => {
    api.get(`/api/dataset/get_datasets_company/${getcompanyId()}`)
      .then((res) => {
        console.log(res)
        setdatasetsForDialog(res.data)
        setOpenAddDataSetToTeam(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleDeleteDatasetFromTeam = () => {
    let values = {
      id: datasetToDeleteID,
      teams: [{
        id: teamID
      }]
    }

    console.log(values)
    api.delete('/api/dataset/delete_dataset_from_team', { data: values })
      .then((res) => {
        console.log(res)
        handleClose()
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        handleClose()
      })

  }

  const handleadDatasetAPI = (datasetId) => {
    let values = {
      id: datasetId,
      teams: [{
        id: teamID
      }]
    }

    console.log(values)
    api.post('/api/dataset/add_dataset_to_team', values)
      .then((res) => {
        console.log(res)
        setOpenAddDataSetToTeam(false)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleadAddFlowAPI = (flowID) => {
    const values = {
      id: flowID,
      teams: [
        { id: teamID }
      ]
    }

    api.post('/autoMLCore/flow/add_flow_to_team', values)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const handleDeleteFlowFromTeam = () => {
    let values = {
      id: datasetToDeleteID,
      teams: [
        { id: teamID }
      ]
    }
    console.log(values)
    api.delete('/autoMLCore/flow/delete_flow_from_team', { data: values })
      .then((res) => {
        console.log(res)
        handleClose()
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        handleClose()
      })

  }

  useEffect(() => {
    api.get(`/api/team/get_company_one_team/${teamID}`)
      .then((res) => {
        console.log('res', res)
        setDatasets(res.data[0].datasets)
        setFlows(res.data[0].flows)
        setTeamName(res.data[0].name)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className='py-4 px-7 '>
        {/* DATASET VEIW  */}
        <div className='w-full flex justify-between items-center '>
          <h1 className='py-4 font-bold text-lg '>Datasets :</h1>
          <div className='space-x-3'>
            <button
              onClick={() => { handleAddDatasetDialog() }}
              className='py-[0.4rem] px-3 border border-[#1976d2] rounded-lg shadow-sm '>
              Add new dataset to team
            </button>
          </div>
        </div>
        {datasets.length != 0 ?
          <div className='grid grid-cols-4 gap-3'>
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className='flex justify-between items-center px-3 w-64 h-20 border border-blue-500 rounded-md text-black '
              >
                <h2 className='w-40 text-ellipsis overflow-hidden'>  {dataset.name} </h2>
                <div className='space-x-2'>
                  <button
                    onClick={(e) => {
                      setdatasetToDeleteID(dataset.id)
                      setdatasetToDeleteName(dataset.name)
                      setOpenEdit(true)
                    }}
                    className='hover:scale-110 transition duration-500'>
                    <Tooltip title='Edit Dateset'>
                      <EditOutlinedIcon />
                    </Tooltip>
                  </button>
                  <button
                    onClick={() => {
                      setdatasetToDeleteID(dataset.id)
                      setdatasetToDeleteName(dataset.name)
                      setOpenDeleteDataSet(true)
                    }}
                    className='  text-red-600 hover:scale-110 transition duration-500'>
                    <Tooltip title={teamID != null ? 'Delete From Team' : 'Delete'}>
                      <DeleteOutlineOutlinedIcon />
                    </Tooltip>
                  </button>
                </div>
              </div>
            ))

            }
          </div>
          :
          <p>No dataset</p>
        }

        {/* flow VEIW  */}
        <div className='w-full flex justify-between items-center '>
          <h1 className='py-4 font-bold text-lg '>Flows :</h1>
          <div className='space-x-3'>
            <button
              onClick={() => { handleAddFlowDialog() }}
              className='py-[0.4rem] px-3 border border-[#1976d2] rounded-lg shadow-sm '>
              Add new flow to team
            </button>
          </div>
        </div>
        {flows.length != 0 ?
          <div className='grid grid-cols-4 gap-3'>
            {flows.map((flow) => (
              <div
                key={flow.id}
                className='flex justify-between items-center px-3 w-64 h-20 border border-blue-500 rounded-md text-black'
              // onClick={() => handleadflowAPI(flow.id)}
              >
                <h2>  {flow.name} </h2>
                <button
                  onClick={() => {
                    setdatasetToDeleteID(flow.id)
                    setdatasetToDeleteName(flow.name)
                    setopenDeleteFlow(true)
                  }}
                  className='  text-red-600 hover:scale-110 transition duration-500'>
                  <Tooltip title={teamID != null ? 'Delete From Team' : 'Delete'}>
                    <DeleteOutlineOutlinedIcon />
                  </Tooltip>
                </button>
              </div>
            ))

            }
          </div>
          :
          <p>No Flows</p>
        }
      </div>


      {/* add Flow to user */}
      <Dialog
        open={opernAddFlow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {`Add Flow to ${TeamName} `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 p-2'>
              {Object.keys(AllFlows).map((flow) => (
                AllFlows[flow].map((oneFlow, index) => (
                  <div key={index}>
                    <button className='w-56 h-20 border border-blue-500 rounded-md text-black'
                      onClick={() => handleadAddFlowAPI(oneFlow.flow.id)}
                    >
                      {oneFlow.flow.name}
                    </button>
                  </div>
                ))
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog >

      {/* Delete flow -----------------------------------------------------------------*/}
      <Dialog
        open={openDeleteFlow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${datasetToDeleteName} form team ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            NOTE: You can't recover {datasetToDeleteName} after delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            console.log(`${datasetToDeleteName} not deleted`)
          }}>
            Don't Delete
          </Button>

          <Button onClick={() => {
            handleDeleteFlowFromTeam()
          }} autoFocus>

            <span className='text-red-600'>Delete flow from teamssss</span>
          </Button>
        </DialogActions>
      </Dialog>

      {/* add dataset to user */}
      <Dialog
        open={openAddDataSetToTeam}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {`Add dataset to ${TeamName} `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 p-2'>
              {datasetsForDialog.map((dataset, index) => (
                <div key={index}>
                  <button className='w-56 h-20 border border-blue-500 rounded-md text-black text-ellipsis overflow-hidden px-3'
                    onClick={() => handleadDatasetAPI(dataset.id)}
                  >
                    {dataset.name}
                  </button>
                </div>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog >

      {/* Delete dataset -----------------------------------------------------------------*/}
      <Dialog
        open={openDeleteDataSet}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${datasetToDeleteName} form team ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            NOTE: You can't recover {datasetToDeleteName} after delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            console.log(`${datasetToDeleteName} not deleted`)
          }}>
            Don't Delete
          </Button>

          <Button onClick={() => {
            handleDeleteDatasetFromTeam()
          }} autoFocus>

            <span className='text-red-600'>Delete dataset from team</span>
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit dataset Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit ${datasetToDeleteName} Name `}
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
              api.put(`/api/dataset/update_dataset/${datasetToDeleteID}`, {
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
