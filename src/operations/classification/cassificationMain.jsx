import React, { useState } from 'react'
import { Dialog, DialogContent } from '@mui/material'
import FooterCreateNewFlow from '../../components/New Flow/footerCreateNewFlow'
import StepperBar from '../../components/New Flow/stepper'
import api from '../../api/api'
import sendimg from '../../img/sendingFile.png'
import { InputFlowname } from '../../components/inputFlowname'
import { getadmin, getteamId } from '../../api/data'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adddata } from '../../redux/flowData'
import loadimg from '../../img/aprioriload.gif'
import InputCSV from '../../components/New Flow/inputCSV'
import { DatasetStatistics } from '../../components/datasetStatistics'
import { ClassificationSelectcloumn } from '../../components/classification/classificationSelectcloumn'
import { ClassificationStatistics } from '../../components/classification/classificationStatistics'



export const CassificationMain = () => {
    const [fileName, setFileName] = useState('')
    const [csv, setcsv] = useState([])
    const [csvFileToSend, setCsvFileToSend] = useState()
    const [tempCSV, setTempCSV] = useState([])
    const [titleColumn, setTitleColumn] = useState('')
    const [directionColumn, setDirectionColumn] = useState('')
    const [DATASET_ID, setDATASET_ID] = useState()
    const [flowName, setFlowName] = useState('')
    const [flowDiscription, setFlowDiscription] = useState('')
    const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')

    //selecte columns
    const [targetColumn, setTargetColumn] = useState('')
    const [trainMode, setTrainMode] = useState('FASTEST')
    var KeepFeatures = []
    var IgnoreFeatures = []
    var TextFeatures = []
    var DateFeatures = []
    var CategoricalFeatures = []
    var NumericFeatures = []
    var OrdinalFeatures = []


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [stepnum, setStepnum] = useState(0)
    const steps = [
        'Upload dataset',
        'Dataset Statistics',
        'Select columns',
        'Classification Statistics',
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
            setStepnum(stepnum + 1)
        }

        else if (stepnum === 3) {
            setOpenFlowName(true)
            // setStepnum(stepnum + 1)
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
                    targetColumn: targetColumn,
                    trainMode: trainMode,
                    flowName: flowName,
                    flowDescription: flowDiscription,
                    datasetId: DATASET_ID,

                    KeepFeatures: KeepFeatures,
                    IgnoreFeatures: IgnoreFeatures,
                    TextFeatures: TextFeatures,
                    DateFeatures: DateFeatures,
                    CategoricalFeatures: CategoricalFeatures,
                    NumericFeatures: NumericFeatures,
                    OrdinalFeatures: OrdinalFeatures,

                }
                console.log(values)

                api.post('/classification/classifiaction_add_flow_admin_video_09102', values)
                    .then((res) => {
                        console.log(res)
                        dispatch(adddata(res.data))
                        setOpen(false)
                        navigate('/Cassification_Result')
                    })
                    .then((err) => {
                        console.log(err)
                    })
            }
            else {
                var values = {
                    targetColumn: targetColumn,
                    trainMode: trainMode,
                    flowName: flowName,
                    flowDescription: flowDiscription,
                    datasetId: DATASET_ID,
                    teamId: getteamId(),

                    KeepFeatures: KeepFeatures,
                    IgnoreFeatures: IgnoreFeatures,
                    TextFeatures: TextFeatures,
                    DateFeatures: DateFeatures,
                    CategoricalFeatures: CategoricalFeatures,
                    NumericFeatures: NumericFeatures,
                    OrdinalFeatures: OrdinalFeatures,
                }
                console.log(values)

                api.post('/classification/classification_add_flow_for_user', values)
                    .then((res) => {
                        console.log(res)
                        dispatch(adddata(res.data))
                        setOpen(false)
                        navigate('/Cassification_Result')
                    })
                    .then((err) => {
                        console.log(err)
                    })
            }
        }

    }

    return (
        <div>
          


            <StepperBar stepnum={stepnum} steps={steps} />
            <FooterCreateNewFlow handleincreas={handleincreas} handledecrease={handledecrease} />

            {(() => {
                switch (stepnum) {
                    case 0: return <InputCSV fileName={fileName} setFileName={setFileName} csv={csv} setcsv={setcsv} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />
                    
                    case 1: return <DatasetStatistics DATASET_ID={DATASET_ID} />

                    case 2: return <ClassificationSelectcloumn csv={csv} setTargetColumn={setTargetColumn} setTrainMode={setTrainMode} trainMode={trainMode} KeepFeatures={KeepFeatures} IgnoreFeatures={IgnoreFeatures} TextFeatures={TextFeatures} DateFeatures={DateFeatures} CategoricalFeatures={CategoricalFeatures} NumericFeatures={NumericFeatures} OrdinalFeatures={OrdinalFeatures} />

                    case 3: return <ClassificationStatistics DATASET_ID={DATASET_ID} />
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

            {/* Result form server loading  */}
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
