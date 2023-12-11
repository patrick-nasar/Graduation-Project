import { Dialog, DialogContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { getadmin, getteamId } from '../../api/data'
import { InputFlowname } from '../../components/inputFlowname'
import InputCSV from '../../components/New Flow/inputCSV'
import { adddata } from '../../redux/flowData'
import loadimg from '../../img/aprioriload.gif'

export const SentimentMain = () => {
    const [fileName, setFileName] = useState('')
    const [csv, setcsv] = useState([])
    const [csvFileToSend, setCsvFileToSend] = useState()
    const [tempCSV, setTempCSV] = useState([])
    const [DATASET_ID, setDATASET_ID] = useState()
    const [flowName, setFlowName] = useState('')
    const [flowDiscription, setFlowDiscription] = useState('')
    const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')
    const [columnSelected, setcolumnSelected] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [openload, setOpenLoad] = useState(false);
    const [openFlowName, setOpenFlowName] = useState(false);
    const [viewSelectCol, setviewSelectCol] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpenFlowName(false)
    };

    const handleClick = () => {
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
            })
            .catch((err) => { console.log(err) })
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
                    flowName: flowName,
                    flowDescription: flowDiscription,
                    datasetId: DATASET_ID,
                    targetColumn: columnSelected,

                }
                console.log(values)

                // setOpenLoad(true)
                api.post('/sentiment/sentiment_add_flow_for_admin', values)
                    .then((res) => {
                        console.log(res)
                        dispatch(adddata(res.data))
                        setOpen(false)
                        navigate('/SentimentResult')
                    })
                    .then((err) => {
                        console.log(err)
                    })
            }
            else {
                var values = {
                    flowName: flowName,
                    flowDescription: flowDiscription,
                    datasetId: DATASET_ID,
                    targetColumn: columnSelected,
                    teamId: getteamId()
                }
                console.log(values)

                // setOpenLoad(true)
                api.post('/sentiment/sentiment_add_flow_for_user', values)
                    .then((res) => {
                        console.log(res)
                        dispatch(adddata(res.data))
                        setOpen(false)
                        navigate('/SentimentResult')
                    })
                    .then((err) => {
                        console.log(err)
                    })
            }
        }

    }


    return (
        <div className='space-y-3'>
            <InputCSV fileName={fileName} setFileName={setFileName} csv={csv} setcsv={setcsv} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />



            {csv.length != 0 &&
                <div className='px-28'>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Select target Column</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={(e) => setcolumnSelected(e.target.value)}
                        >
                            {Object.keys(csv[0]).map((key, index) => (
                                <div key={key}>
                                    <FormControlLabel value={key} control={<Radio />} label={key} />
                                    {/* {key} */}
                                </div>
                            ))}
                        </RadioGroup>

                    </FormControl>
                </div>
            }

            {createORUploadedDataset === 'create' && DATASET_ID === undefined &&
                <div className='flex justify-center'>

                    <button
                        onClick={() => {
                            handleClick()
                        }}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden duration-500 text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Upload Your File
                        </span>
                    </button>
                </div>
            }


            {DATASET_ID != undefined &&
                <div className='px-8 space-y-3'>

                    <div className='flex justify-center'>
                        <button
                            onClick={() => setOpenFlowName(true)}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden duration-500 text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                submit
                            </span>
                        </button>
                    </div>
                </div>
            }


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
