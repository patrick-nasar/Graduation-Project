import { FormControl } from '@mui/base'
import { Dialog, DialogContent, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import { InputFlowname } from '../../components/inputFlowname'
import loadimg from '../../img/aprioriload.gif'
import { useDispatch } from 'react-redux'
import { adddata } from '../../redux/flowData'
import { useNavigate } from 'react-router-dom';

export const GeoUpdate = () => {
    const id = useParams()
    const [columns, setColumns] = useState()
    const [Viewcolumns, setViewColumns] = useState(false)
    const [titlecol, settitlecol] = useState('');
    const [directioncol, setdirectioncol] = useState('');

    const [openFlowName, setOpenFlowName] = useState(false);
    const [flowName, setFlowName] = useState('')
    const [flowDiscription, setFlowDiscription] = useState('')
    const [openload, setOpenLoad] = useState(false);


    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleClose = () => {
        setOpenFlowName(false)
    };

    console.log(id)
    const handleCreateFlow = () => {
        if (flowDiscription === '' || flowName === '' || titlecol === '' || directioncol === '') {
            console.log('rere')
        }
        else {
            setOpenFlowName(false)
            setOpenLoad(true)

            var values = {
                titleColumn: titlecol,
                directionColumn: directioncol,
                flowDescription: flowDiscription,
                flowName: flowName,
                datasetId: id.DataSetid
            }

            console.log(values)

            api.put(`/geolocation/geolocation_update_flow/${id.Flowid}`, values)
                .then((res) => {
                    console.log(res)
                    dispatch(adddata(res.data))
                    setOpenLoad(false)
                    navigate('/Geolocation_Result')
                })
                .catch((err) => {
                    console.log(err)
                    setOpenLoad(false)

                })


        }
    }

    useEffect(() => {
        api.get(`/autoMLCore/columns/get_dataset_columns/${id.DataSetid}`)
            .then((res) => {
                console.log(res)
                let x = res.data.reduce((a, v) => ({ ...a, [v]: '' }), {})
                console.log(x)
                setColumns(x)
                setViewColumns(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            {Viewcolumns ?
                <>
                    <div className='flex justify-start items-center px-10'>
                        {/* Title Column */}
                        <div className='flex justify-center items-center'>
                            <div className='h-2 w-2 bg-blue-600 rounded-full' />
                            <h1 className='text-lg pl-2 pr-3 py-5'>Please Select Direction Column:</h1>
                        </div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                onChange={(event) => setdirectioncol(event.target.value)}
                            >
                                {Object.keys(columns).map((key, index) => (
                                    <div key={key}>
                                        <FormControlLabel value={key} control={<Radio />} label={key} />
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='flex justify-start items-center px-10'>
                        {/* Title Column */}
                        <div className='flex justify-center items-center'>
                            <div className='h-2 w-2 bg-blue-600 rounded-full' />
                            <h1 className='text-lg pl-2 pr-3 py-5'>Please Select Title Column:</h1>
                        </div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                onChange={(event) => settitlecol(event.target.value)}
                            >
                                {Object.keys(columns).map((key, index) => (
                                    <div key={key}>
                                        <FormControlLabel value={key} control={<Radio />} label={key} />
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='px-10'>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            onClick={() => { setOpenFlowName(true) }}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Updata
                            </span>
                        </button>
                    </div>
                </>
                :
                <>

                </>}


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
