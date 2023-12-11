import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import api from '../api/api'
import InputCSV from '../components/New Flow/inputCSV'
import Papa from 'papaparse'
import Fimg from '../img/add-file.gif'
import { useNavigate } from 'react-router-dom'

export const AddDataSet = () => {
    const [csv, setcsv] = useState([])
    const [csvFileToSend, setCsvFileToSend] = useState([])
    const [fileName, setFileName] = useState('')
    const hiddenFileInput = React.useRef(null);

    const navegat = useNavigate()

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

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
            }
        });
        setFileName(file.name)
    };


    const handleSendFile = () => {
        if (csv.length > 0) {
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
                    setOpen(true)
                    setTimeout(() => {
                        navegat('/Employes')
                    }, 2000);

                })
                .catch((err) => { console.log(err) })
        }
    }

    return (
        <div>

            <h1 className='text-2xl pt-6 px-16'>Add Dataset:</h1>
            {/* <InputCSV setcsv={setcsv} fileName={fileName} setFileName={setFileName} setCsvFileToSend={setCsvFileToSend} setTempCSV={setTempCSV} setcreateORUploadedDataset={setcreateORUploadedDataset}/> */}
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
            </div>
            {fileName != '' &&
                <>
                    {/* Edite file name */}
                    <div className='flex justify-center items-center px-20 py-5'>
                        <div className='h-2 w-2 bg-blue-600 rounded-full' />
                        <p className='pl-2 pr-3'>Edit file name</p>
                        <input
                            className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                            type="text"
                            placeholder={fileName}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                }
                                else {
                                    setFileName(e.target.value)
                                }
                            }}
                        />
                    </div>

                    {/*file name */}
                    <div className='flex justify-evenly items-center pb-4'>
                        <button
                            onClick={() => { handleSendFile() }}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Send File
                            </span>
                        </button>
                    </div>

                </>
            }

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    DataSet is added
                </Alert>
            </Snackbar>

        </div >
    )
}
