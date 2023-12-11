import React, { useState } from 'react'
import FooterCreateNewFlow from '../components/New Flow/footerCreateNewFlow';
import InputCSV from '../components/New Flow/inputCSV';
import Preprocessing from '../components/New Flow/preprocessing';
import SelectColumn from '../components/New Flow/selectColumn';
import SelectOpretion from '../components/New Flow/selectOpretion';
import StepperBar from '../components/New Flow/stepper'
import ViewDataset from '../components/New Flow/viewDataset';
import api from "../api/api";
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingCop from '../components/New Flow/loadingComp';

export default function CreateNewFlow() {
    const navigate = useNavigate();
    let rowValue = []
    const count = {};


    const [csv, setcsv] = useState([])
    const [fileName, setFileName] = useState('')

    const [tempCSV, setTempCSV] = useState(csv)
    const [columnType, setColumnType] = useState([]);
    const [tempColumnType, setTempColumnType] = useState([]);

    const [operationColumn, setOperationColumn] = useState('')
    const [importentColumns, setImportentColumns] = useState([])

    const [operation, setOperation] = useState('')

    const [show, setShow] = useState(true);

    const [open, setOpen] = useState(false);
    const [stepnum, setStepnum] = useState(0)
    const steps = [
        'Upload dataset',
        'View dataset',
        'Clean data',
        'Select opretion',
        'Select column',
    ];

    const handleincreas = () => {
        //input
        if (stepnum === 0 && csv.length > 0) {
            setStepnum(stepnum + 1)
        }
        //view csv
        else if (stepnum === 1) {
            setStepnum(stepnum + 1)
        }
        //Clean csv
        else if (stepnum === 2) {
            setOpen(true);
            setStepnum(stepnum + 1)
        }
        //Operation
        else if (stepnum === 3) {
            setStepnum(stepnum + 1)
        }
        //column
        else if (stepnum === 4) {
            setStepnum(stepnum + 1)
            setShow(false)
            console.log("wtf2")
            // let values = {
            //     csv: csv,
            //     fileName: fileName,
            //     columnType: columnType,
            //     operation: operation,
            //     operationColumn: operationColumn,
            //     importentColumns: importentColumns,
            // }
            // api
            //     .post("/api/login", values)
            //     .then((res) => {
            //           navigate('/Deploy')
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //         console.log(err.message);
            //         // setOpenEP(true);
            //     });
        }
        else if (stepnum === 5) {
            console.log("wtf")
        }
    }

    const handledecrease = () => {
        if (stepnum === 0) { }
        else {
            setStepnum(stepnum - 1)
        }
    }
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div className=''>
                {show &&
                    <>
                        <StepperBar steps={steps} stepnum={stepnum}
                            handleincreas={handleincreas} handledecrease={handledecrease} />
                        <FooterCreateNewFlow handleincreas={handleincreas} handledecrease={handledecrease} />

                    </>
                }
                {/* <button onClick={() => {
                    // console.log('csv', csv)
                    // console.log('tempcsv', tempCSV)
                    // console.log('columnType', columnType)
                    // console.log('tempColumnType', tempColumnType)
                    // console.log('operationColumn', operationColumn)
                    // console.log('importentColumns', importentColumns)
                    // console.log('operation', operation)
                    // console.log('Fev column', importentColumns)
                    Object.keys(csv[0]).map((key, index) => {
                        rowValue[index] = csv.map((row) => row[key])

                    })

                    console.log(rowValue)
                    console.log(rowValue[0])
                    console.log(rowValue[0][0])
                    Object.keys(csv[0]).map((key, index) => {
                        for (let i = 0; i < rowValue[0].length; i++) {
                            let ele
                            ele = rowValue[index][i];
                            if (!count[key]) count[key] = {}

                            if (count[key][ele]) {
                                count[key][ele] += 1;
                            } else {
                                count[key][ele] = 1;
                            }
                        }
                    })

                    console.log('count', count)
                    // console.log(
                    //     Object.keys(csv[0]).map((key, index) => (
                    //         csv.map((row) => row[key])
                    //     )
                    //     )
                    // )
                }}>awadawda</button> */}

                {stepnum === 0 &&
                    <InputCSV setcsv={setcsv} fileName={fileName} setFileName={setFileName} setTempCSV={setTempCSV} />}
                {stepnum === 1 &&
                    <ViewDataset csv={csv} fileName={fileName} />}
                {stepnum === 2 &&
                    <Preprocessing csv={csv} tempCSV={tempCSV} setTempCSV={setTempCSV} columnType={columnType} setColumnType={setColumnType} tempColumnType={tempColumnType} setTempColumnType={setTempColumnType} />}
                {stepnum === 3 &&
                    <SelectOpretion operation={operation} setOperation={setOperation} />}
                {stepnum === 4 &&
                    <SelectColumn csv={csv} setOperationColumn={setOperationColumn} importentColumns={importentColumns} setImportentColumns={setImportentColumns} />}
                {stepnum === 5 &&
                    <LoadingCop />}

                {/* dialog after cleandata */}
                <Dialog
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to save changes ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            NOTE: You can't undo the chenges after save
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setTempColumnType(columnType)
                            handleClose()
                        }}>
                            Don't save
                        </Button>

                        <Button onClick={() => {
                            setcsv(tempCSV)
                            setColumnType(tempColumnType)
                            handleClose()
                        }} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        </>
    )
}
