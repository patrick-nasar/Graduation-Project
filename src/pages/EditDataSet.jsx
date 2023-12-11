import React, { useState } from 'react'
import FooterCreateNewFlow from '../components/New Flow/footerCreateNewFlow';
import InputCSV from '../components/New Flow/inputCSV';
import Preprocessing from '../components/New Flow/preprocessing';
import StepperBar from '../components/New Flow/stepper'
import api from "../api/api";
import { useNavigate } from "react-router-dom";

import ViewDatasetWarcking from '../components/New Flow/viewDatasetWorking';
import downloadgif from '../img/downloadfile.gif'
import { CSVLink } from 'react-csv';
import { SnackbarComp } from '../components/snackbar';
import { DatasetStatistics } from '../components/datasetStatistics';



export default function EditDeataSet() {
    const navigate = useNavigate();

    const [csv, setcsv] = useState([])
    const [csvFileToSend, setCsvFileToSend] = useState([])
    const [fileName, setFileName] = useState('')
    const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')
    const [dataSetID, setDATASET_ID] = useState()

    const [tempCSV, setTempCSV] = useState(csv)
    const [columnType, setColumnType] = useState([]);
    const [tempColumnType, setTempColumnType] = useState([]);
    const [changeColumnName, setChangeColumnName] = useState([]);
    const [deleteRows, setDeleteRows] = useState([]);
    const [deleteColumns, setDeleteColumns] = useState([]);

    // let ChangeColumnName = []
    // let ChangeColumnType = []
    // let DeleteColumns = []
    // let DeleteRows = []


    const [barType, setbarType] = useState();
    const [massege, setmassege] = useState();
    const [open, setOpen] = useState(false);
    const [stepnum, setStepnum] = useState(0)
    const steps = [
        'Upload Dataset',
        'View Dataset',
        'Statistics',
        'Clean Dataset',
        'Extract Dataset',
    ];

    const changeColumnNameFunction = (colname, newnameC) => {
        console.log(colname, newnameC)
        let newnames = { ...changeColumnName, [colname]: newnameC }
        console.log('xxxxxxxxx', newnames)
        setChangeColumnName(newnames)
    }

    const DeleteColumnsFunction = (cloumnName) => {
        let deletedCol = [...deleteColumns, cloumnName]
        setDeleteColumns(deletedCol)
    }

    const DeleteRowsFunction = (row) => {
        let rows = [...deleteRows, row]
        setDeleteRows(rows)
    }

    const UndoAllChenges = () => {
        // setTempCSV(csv)
        setChangeColumnName([])
        setDeleteColumns([])
        setDeleteRows([])
        setTempColumnType(columnType)
    }

    const handleDownloadFile = () => {
        let values = {
            rename: changeColumnName,
            changeColumnType: columnType,
            deleteColumns: deleteColumns,
            deleteRows: deleteRows
        }
        console.log(values)

        api.put(`/api/dataset/update_dataset_file/${dataSetID}`, values)
            .then((res) => {
                console.log(res)
                setbarType('success')
                setmassege('Dataset has been edited successfuly')
                setOpen(true)
            })
            .catch((err) => {
                console.log(err)
                setbarType('error')
                setmassege('Somthing wrong happend ')
                setOpen(true)
            })

    }



    const handleincreas = () => {
        //input
        if (stepnum === 0 && csv.length > 0) {
            if (createORUploadedDataset === 'create') {
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
                        setStepnum(stepnum + 1)
                    })
                    .catch((err) => { console.log(err) })
            }
            else {
                setStepnum(stepnum + 1)
            }

        }
        //View csv
        else if (stepnum === 1) {
            setStepnum(stepnum + 1)
        }
        //statistics
        else if (stepnum === 2) {
            setStepnum(stepnum + 1)
        }
        //Clean csv
        else if (stepnum === 3) {
            setColumnType(tempColumnType)
            setStepnum(stepnum + 1)
        }
        else if (stepnum === 4) {
            console.log("wtf")
        }
    }

    const handledecrease = () => {
        console.log(stepnum)
        if (stepnum === 0) { }
        else if (stepnum === 3) {
            setStepnum(stepnum - 1)
        }
        else {
            setStepnum(stepnum - 1)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <>
            <div className='animate-fade'>
                <>
                    <StepperBar steps={steps} stepnum={stepnum}
                        handleincreas={handleincreas} handledecrease={handledecrease} />
                    <FooterCreateNewFlow handleincreas={handleincreas} handledecrease={handledecrease} />
                </>
                {stepnum === 0 &&
                    <InputCSV csv={csv} setcsv={setcsv} fileName={fileName} setFileName={setFileName} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />}
                {stepnum === 1 &&
                    <ViewDatasetWarcking csv={csv} fileName={fileName} />}
                {stepnum === 2 &&
                    <DatasetStatistics DATASET_ID={dataSetID} />}
                {stepnum === 3 &&
                    <Preprocessing csv={csv} tempCSV={tempCSV} setTempCSV={setTempCSV} columnType={columnType} setColumnType={setColumnType} tempColumnType={tempColumnType} setTempColumnType={setTempColumnType} changeColumnNameFunction={changeColumnNameFunction} DeleteColumnsFunction={DeleteColumnsFunction} DeleteRowsFunction={DeleteRowsFunction} UndoAllChenges={UndoAllChenges} />}
                {stepnum === 4 &&
                    <>
                        <CSVLink data={tempCSV}>
                            <div className='w-full p-8 mt-3 flex justify-center items-center'>
                                <button
                                    onClick={() => handleDownloadFile()}
                                    className='w-1/2 bg-white h-60 flex items-center justify-center rounded-xl border-dashed border-2 border-[#1976d2] hover:scale-105 transition duration-500'>
                                    <img src={downloadgif} className='w-28 h-28' />
                                    <span className='text-lg'>Download your new CSV file</span>
                                </button>
                            </div>
                        </CSVLink>
                    </>
                }


                <SnackbarComp handleClose={handleClose} open={open} barType={barType} massege={massege} />
                {/* dialog after cleandata */}
                {/* <button onClick={() => {
                    console.log('csv', csv)
                    console.log('tempcsv', tempCSV)
                    console.log('columnType', columnType)
                    console.log('tempColumnType', tempColumnType)
                    // console.log('operationColumn', operationColumn)
                    // console.log('importentColumns', importentColumns)
                    // console.log('operation', operation)
                    // console.log('Fev column', importentColumns)
                    console.log('rename', changeColumnName)
                    console.log('tempColumnType', tempColumnType)
                    console.log('DeleteColumns', deleteColumns)
                    console.log('DeleteRows', deleteRows)
                    console.log('csv', csv)
                    console.log('temp csv', tempCSV)
                }}>a142235347658wadawda</button> */}
            </div >
        </>
    )
}
