import React, { useState } from 'react'
import api from '../../api/api'
import FooterCreateNewFlow from '../../components/New Flow/footerCreateNewFlow'
import StepperBar from '../../components/New Flow/stepper'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import sendimg from '../../img/sendingFile.png'
import { InputFlowname } from '../../components/inputFlowname'
import { getadmin, getteamId } from '../../api/data'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adddata } from '../../redux/flowData'
import loadimg from '../../img/aprioriload.gif'
import InputCSV from '../../components/New Flow/inputCSV'
import { DatasetStatistics } from '../../components/datasetStatistics'
import { TimeSelectColumn } from '../../components/timeseries/geolocationEditInfo'

export const TimeMain = ({ medianPoint, latitude, longitude, title }) => {
  const [fileName, setFileName] = useState('')
  const [csv, setcsv] = useState([])
  const [csvFileToSend, setCsvFileToSend] = useState()
  const [tempCSV, setTempCSV] = useState([])
  const [dateColumn, setDateColumn] = useState('')
  const [targetColumn, setTargetColumn] = useState('')
  const [DATASET_ID, setDATASET_ID] = useState()
  const [flowName, setFlowName] = useState('')
  const [flowDiscription, setFlowDiscription] = useState('')
  const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [stepnum, setStepnum] = useState(0)
  const steps = [
    'Upload dataset',
    'Select column',
    'Dataset Statistics',
    'Finish'
  ];

  const [open, setOpen] = useState(false);
  const [openload, setOpenLoad] = useState(false);
  const [openFlowName, setOpenFlowName] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenFlowName(false)
  };

  const handleincreas = () => {
    //input
    if (stepnum === 0 && csv.length > 0) {
      if (createORUploadedDataset === 'create') {
        setOpen(true)
        let x = {
          file: csvFileToSend,
          name: fileName
        }
        api.post('/api/dataset/create_dataset', x, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((res) => {
            console.log(res);
            setDATASET_ID(res.data.id)
            handleClose()
            setStepnum(stepnum + 1)
          })
          .catch((err) => { console.log(err) })
      }
      else {
        // setDATASET_ID(res.data.id)
        setStepnum(stepnum + 1)
      }
    }
    //Edit
    else if (stepnum === 1) {
      setStepnum(stepnum + 1)
    }
    
    else if (stepnum === 2) {
      setOpenFlowName(true)
      console.log("wtf")
    }
  }

  const handledecrease = () => {
    console.log(stepnum)

    if (stepnum === 0) { }
    else if (stepnum === 1) {
      setDateColumn('')
      setTargetColumn('')
      setStepnum(stepnum - 1)
    }
    else {
      setStepnum(stepnum - 1)
    }
  }

  const handleCreateFlow = () => {
    if (flowDiscription == '' || flowName == '') {

    }
    else {
      setOpenFlowName(false)
      setOpenLoad(true)

      console.log(getadmin())
      console.log(typeof (getadmin()))
      if (getadmin() === 'true') {
        var values = {
          DateColumn: dateColumn,
          targetColumn: targetColumn,
          flowName: flowName,
          flowDescription: flowDiscription,
          datasetId: DATASET_ID
        }
        console.log(values)

        api.post('/timeSeries/timeSeries_add_flow_for_admin', values)
          .then((res) => {
            dispatch(adddata(res.data))
            setOpen(false)
            navigate('/Time_Result')
          })
          .then((err) => {
            console.log(err)
          })
      }
      else {
        var values = {
          DateColumn: dateColumn,
          targetColumn: targetColumn,
          flowName: flowName,
          flowDescription: flowDiscription,
          teamId: getteamId(),
          datasetId: DATASET_ID
        }
        console.log(values)

        api.post('/timeSeries/timeSeries_add_flow_for_user', values)
          .then((res) => {
            dispatch(adddata(res.data))
            setOpen(false)
            navigate('/Time_Result')
          })
          .then((err) => {
            console.log(err)
          })
      }
    }

  }


  return (
    <div >
      <StepperBar stepnum={stepnum} steps={steps} />
      <FooterCreateNewFlow handleincreas={handleincreas} handledecrease={handledecrease} />

      {(() => {
        switch (stepnum) {
          case 0: return <InputCSV fileName={fileName} setFileName={setFileName} csv={csv} setcsv={setcsv} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />
          case 1: return <TimeSelectColumn csv={csv} setDateColumn={setDateColumn} setTargetColumn={setTargetColumn} />
          case 2: return <DatasetStatistics DATASET_ID={DATASET_ID} />
        }
      })()}

      {/* Sending file loading */}
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >

        <DialogContent className='dark:bg-slate-800 dark:text-white'>
          <div className='flex justify-center items-center pb-3 pt-9 animate-bounce'>
            <img src={sendimg} className='w-32 h-32' />
          </div>
          <div className='flex justify-center items-center py-4'>
            <h1 className='text-2xl'> Sending File Please wait ...</h1>
          </div>
        </DialogContent>
      </Dialog>

      {/*Result form server loading */}
      <Dialog
        open={openload}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >

        <DialogContent className='dark:bg-slate-800 dark:text-white'>
          <div className='flex justify-center items-center pb-3 pt-9 '>
            <img src={loadimg} className='w-96 h-96' />
          </div>
          <div className='flex justify-center items-center py-4'>
            <h1 className='text-2xl'>Please wait...</h1>
          </div>
        </DialogContent>
      </Dialog>


      <InputFlowname openFlowName={openFlowName} handleClose={handleClose} setFlowName={setFlowName} handleCreateFlow={handleCreateFlow} setFlowDiscription={setFlowDiscription} />


    </div>
  )
}
