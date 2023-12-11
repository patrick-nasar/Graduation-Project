import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import ApInput from '../../components/aprioriComp/apInput';
import ApResult from '../../components/aprioriComp/apResult';
import { InputFlowname } from '../../components/inputFlowname';
import FooterCreateNewFlow from '../../components/New Flow/footerCreateNewFlow';
import StepperBar from '../../components/New Flow/stepper';
import sendimg from '../../img/sendingFile.png'
import { AprioriInfo } from './aprioriInfo';
import loadimg from '../../img/aprioriload.gif'
import { getadmin, getteamId } from '../../api/data';
import { useDispatch } from 'react-redux'
import { adddata } from '../../redux/flowData'
import { ApStatistics } from './apStatistics';


export default function Apriori() {

  const navigate = useNavigate();
  const [csv, setcsv] = useState([])
  const [tempcsv, setTempCSV] = useState([])
  const [csvFileToSend, setCsvFileToSend] = useState([])
  const [DATASET_ID, setDATASET_ID] = useState()
  const [fileName, setFileName] = useState('')
  const [dataType, setDataType] = useState('')

  const [selectedIDColumns, setselectedIDColumns] = useState([])
  const [itemColumn, setitemColumn] = useState('')
  const [min_support, setmin_support] = useState(0.0005)
  const [min_confidence, setmin_confidence] = useState(0.8)
  const [min_lift, setmin_lift] = useState(1.2)
  const [min_len, setmin_len] = useState(2)
  const [max_len, setmax_len] = useState(5)

  const [flowName, setFlowName] = useState('')
  const [flowDiscription, setFlowDiscription] = useState('')

  const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')

  const dispatch = useDispatch()

  const [stepnum, setStepnum] = useState(0)
  const steps = [
    'Upload dataset',
    'Select ',
    'Statistics ',
    'Finish'
  ];


  const [open, setOpen] = useState(false);
  const [openFlowName, setOpenFlowName] = useState(false);
  const [openload, setOpenLoad] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenFlowName(false)
  };


  const handleCreateFlow = () => {
    if (flowDiscription == '' || flowName == '') { }
    else {
      setOpenFlowName(false)
      setOpenLoad(true)
      let x = []
      for (let i = 0; i < selectedIDColumns.length; i++) {
        x.push({ column: selectedIDColumns[i] })
      }
      var values = {
        min_support: min_support,
        teamId: getteamId(),
        datasetType: dataType,
        min_confidence: min_confidence,
        min_lift: min_lift,
        min_len: min_len,
        max_len: max_len,
        flowName: flowName,
        flowDescription: flowDiscription,
        datasetId: DATASET_ID,
        groupbyColumns: x,
        itemColumn: itemColumn,
      }

      console.log(values)
      console.log(getadmin())

      if (getadmin() === 'true') {
        console.log('admin route', values)
        api.post('/frequent_pattern_itemset/frequentItemSet_add_flow_for_admin', values)
          .then((res) => {
            console.log(res)
            dispatch(adddata(res.data))
            setOpenLoad(false)
            navigate('/ApResult')
          })
          .catch((err) => {
            console.log(err)
            setOpenLoad(false)
          })
      }
      else {
        console.log('admin route', values)
        api.post('/frequent_pattern_itemset/frequentItemSet_add_flow_for_user', values)
          .then((res) => {
            console.log(res)
            dispatch(adddata(res.data))
            setOpenLoad(false)
            navigate('/ApResult')
          })
          .catch((err) => {
            console.log(err)
            setOpenLoad(false)
          })
      }
    }

  }

  const handleincreas = () => {
    //input
    if (stepnum === 0 && csv.length > 0 && dataType != '') {
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
      console.log('wdawd')
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
      setStepnum(stepnum - 1)
    }
    else {
      setStepnum(stepnum - 1)
    }
  }


  return (
    <>
      {/* <button onClick={() => {
        console.log('dataset id', DATASET_ID)
        console.log('csv', csv)
        console.log('dataset type', dataType)
        console.log()
        console.log()
      }}
      >adwadawdawd</button> */}

      <StepperBar stepnum={stepnum} steps={steps} />
      <FooterCreateNewFlow handleincreas={handleincreas} handledecrease={handledecrease} />

      {stepnum === 0 && <ApInput setcsv={setcsv} fileName={fileName} setFileName={setFileName} dataType={dataType} setDataType={setDataType} setCsvFileToSend={setCsvFileToSend} setTempCSV={setTempCSV} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />}
      {stepnum === 1 && <AprioriInfo csv={csv} dataType={dataType} setitemColumn={setitemColumn} setmin_support={setmin_support} setmin_confidence={setmin_confidence} setmin_len={setmin_len} setmin_lift={setmin_lift} setmax_len={setmax_len} selectedIDColumns={selectedIDColumns} setselectedIDColumns={setselectedIDColumns} />}
      {stepnum === 2 && <ApStatistics DATASET_ID={DATASET_ID} dataType={dataType} itemColumn={itemColumn} selectedIDColumns={selectedIDColumns} />}




      {/* /* Sending file loading  */}
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
      {/* <div dangerouslySetInnerHTML></div> */}

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

    </>
  )
}
