import React, { useState } from 'react'
import Papa from 'papaparse'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from '@mui/material';
import api from '../../api/api';


import Fimg from '../../img/add-file.gif'
import uploadedgif from '../../img/uploadeddataset.gif'
import { getadmin, getcompanyId, getuserId } from '../../api/data';
var FileSaver = require('file-saver');


export default function InputCSV({ setcsv, fileName, setFileName, setTempCSV, setCsvFileToSend, setcreateORUploadedDataset, setDATASET_ID }) {
    const hiddenFileInput = React.useRef(null);
    const [ff, setff] = useState()
    const [datasetsForDialog, setdataSetsForDialog] = useState([])

    const [open, setOpen] = useState(false)
    const handleClose = event => {
        setOpen(false)
    };

    const handleOpenDialogUploadedCSV = () => {

        if (getadmin() === 'true') {
            api.get(`/api/dataset/get_datasets_company/${getcompanyId()}`)
                .then((res) => {
                    console.log('dataseet', res)
                    setdataSetsForDialog(res.data)
                    setOpen(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            api.get(`/api/dataset/get_all_user_datasets/${getuserId()}`)
                .then((res) => {
                    console.log('dataseet', res)
                    setdataSetsForDialog(res.data)
                    setOpen(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        setCsvFileToSend(event.target.files[0])
        let file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                setcsv(results.data)
                setTempCSV(results.data)
                setcreateORUploadedDataset('create')
            }
        });
        setFileName(file.name)
    };

    const handleSelecteUplodaedFile = (name, id) => {
        api.get(`/api/dataset/get_one_dataset/${id}`)
            .then((res) => {
                console.log('dataseet', res)
                console.log('dataseet2222', res.data.file)
                api.get('/api' + res.data.file)
                    .then((res) => {
                        console.log('file', res)
                        let file = res.data;
                        Papa.parse(file, {
                            header: true,
                            dynamicTyping: true,
                            complete: function (results) {
                                setcsv(results.data)
                                setTempCSV(results.data)
                            }
                        });
                        setcreateORUploadedDataset('uploaded')
                        setFileName(name)
                        console.log('awdawd')
                        handleClose()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                setDATASET_ID(id)
            })
            .catch((err) => {
                console.log(err)
            })

        // setCsvFileToSend(event.target.files[0])
        // let file = event.target.files[0];
        // Papa.parse(file, {
        //     header: true,
        //     dynamicTyping: true,
        //     complete: function (results) {
        //         setcsv(results.data)
        //         setTempCSV(results.data)
        //     }
        // });
        // setFileName(file.name)
    };

    return (
        <>
            <div className='w-full p-8 mt-3 flex justify-evenly items-center'>
                {/* <input type="file" id='file' onChange={handleFileChange} style={{display:'none'}} /> */}
                <button
                    onClick={handleClick}
                    className='w-[40%] bg-white h-60 flex items-center justify-center rounded-xl border-dashed border-2 border-[#1976d2] hover:scale-105 transition duration-500'>
                    <img src={Fimg} className='w-28 h-28' />
                    <span className='text-lg font-bold pl-2'>Upload your CSV file</span>
                </button>
                <input
                    type="file"
                    accept=".csv"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => handleOpenDialogUploadedCSV()}
                    className='w-[40%] bg-white h-60 flex items-center justify-center rounded-xl border-dashed border-2 border-[#1976d2] hover:scale-105 transition duration-500'>
                    <img src={uploadedgif} className='w-28 h-28' />
                    <span className='text-lg font-bold pl-2'>Choose an uploaded CSV file</span>
                </button>
            </div>
            {fileName &&
                <>
                    <div className='flex justify-center items-center space-x-3 text-lg p-2'>
                        <div className='h-2 w-2 bg-blue-600 rounded-full' />
                        <p>Uploaded File  Name: {fileName}</p>
                        <div className='h-2 w-2 bg-blue-600 rounded-full' />
                    </div>

                </>
            }



            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={false}
                maxWidth='md'>
                <DialogTitle>Choose CSV File</DialogTitle>
                <DialogContent>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 p-2'>
                        {datasetsForDialog.map((dataset, index) => (
                            <div key={index}>
                                <button className='w-56 h-20 border border-blue-500 rounded-md text-black hover:shadow-md'
                                    onClick={() => handleSelecteUplodaedFile(dataset.name, dataset.id)}
                                >
                                    {dataset.name.slice(0,26)}
                                </button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
