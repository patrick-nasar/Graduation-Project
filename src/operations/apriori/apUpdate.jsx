import { FormControl } from '@mui/base'
import { Checkbox, Dialog, DialogContent, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import { InputFlowname } from '../../components/inputFlowname'
import loadimg from '../../img/aprioriload.gif'
import { useDispatch } from 'react-redux'
import { adddata } from '../../redux/flowData'
import { useNavigate } from 'react-router-dom';
import { SnackbarComp } from '../../components/snackbar'

export const ApUpdate = () => {
    const ids = useParams()
    const [result, setresult] = useState()
    const [frequentItemSet, setfrequentItemSet] = useState()
    const [algorithm, setalgorithm] = useState()
    const [view, setview] = useState(false)
    const [cloName, setcloName] = useState([])
    const [selectedIDColumns, setselectedIDColumns] = useState([])
    const [dataType, setDataType] = useState('')

    const [itemColumn, setitemColumn] = useState('')
    const [min_support, setmin_support] = useState()
    const [min_confidence, setmin_confidence] = useState()
    const [min_lift, setmin_lift] = useState()
    const [min_len, setmin_len] = useState()
    const [max_len, setmax_len] = useState()


    const [flowName, setFlowName] = useState('')
    const [flowDiscription, setFlowDiscription] = useState('')

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [barType, setbarType] = useState('error');
    const [massege, setmassege] = useState('');
    const [open, setOpen] = useState(false);
    const [openFlowName, setOpenFlowName] = useState(false);
    const [openload, setOpenLoad] = useState(false);

    
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleClose = () => {
        setOpen(false);
        setOpenFlowName(false)
    };


    const handleselectedColumns = (event) => {
        const currentIndex = selectedIDColumns.indexOf(event.target.value);
        const newChecked = [...selectedIDColumns];

        if (currentIndex === -1) {
            newChecked.push(event.target.value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setselectedIDColumns(newChecked);
    }

    function validate(evt) {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = evt.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const handleCreateFlow = () => {
        if (flowDiscription === '' || flowName === '' || itemColumn === '' || min_support === '' || itemColumn === '' || min_confidence === '' || min_lift === '' || max_len === '' || min_len === '') {
            console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            setbarType('error')
            setmassege('Fill all the filds')
            setOpenSnackBar(true)
        }
        else {
            setOpenFlowName(false)
            setOpenLoad(true)

            var values = {
                datasetId: ids.DataSetid,
                flowName: flowName,
                flowDescription: flowDiscription,
                datasetType: dataType,
                groupbyColumns: selectedIDColumns,
                itemColumn: itemColumn,
                min_support: min_support,
                min_confidence: min_confidence,
                min_lift: min_lift,
                min_len: min_len,
                max_len: max_len,
                // teamId: getteamId(),
            }
            console.log(values)

            api.put(`/frequent_pattern_itemset/frequentitemset_update_flow/${ids.Flowid}`, values)
                .then((res) => {
                    console.log(res)
                    dispatch(adddata(res.data))
                    setOpenLoad(false)
                    navigate('/ApResult')
                })
                .catch((err) => {
                    console.log(err)
                })


        }

    }
    console.log(ids)
    useEffect(() => {
        api.get(`/frequent_pattern_itemset/frequentItemSet_get_one_flow/${ids.Flowid}`)
            .then((res) => {
                console.log(res)
                setresult(res.data.result)
                setalgorithm(res.data.algorithm)
                setfrequentItemSet(res.data.frequentItemSet)
                setDataType(res.data.frequentItemSet.FIS.datasetType)
                setitemColumn(res.data.frequentItemSet.FIS.itemColumn)
                setmin_support(res.data.frequentItemSet.FIS.min_support)
                setmin_confidence(res.data.frequentItemSet.FIS.min_confidence)
                setmin_lift(res.data.frequentItemSet.FIS.min_lift)
                setmin_len(res.data.frequentItemSet.FIS.min_len)
                setmax_len(res.data.frequentItemSet.FIS.max_len)

                setview(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            <div className='px-24 py-4 space-y-2'>
                <div className='space-y-3'>
                    <table className=''>
                        <tbody >

                            {dataType === 'item_spleted_rep_row' &&
                                <>
                                    <tr>
                                        <td className='py-2 ' >
                                            <p>Id Column</p>
                                        </td>
                                        <td className='py-2 pl-5'>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                // onChange={handleChangetype(e, index)}
                                                // onChange={ev => console.log(ev)}
                                                >
                                                    {cloName.map((column) => (
                                                        <div key={column}>
                                                            <FormControlLabel
                                                                onChange={handleselectedColumns}
                                                                value={column}
                                                                control={<Checkbox />} label={column} />
                                                            لسا مانو حالص
                                                        </div>
                                                    ))}

                                                </RadioGroup>
                                            </FormControl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-2 ' >
                                            <p>Product Column</p>
                                        </td>
                                        <td className='py-2 pl-5'>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                // onChange={handleChangetype(e, index)}
                                                // onChange={ev => console.log(ev)}
                                                >
                                                    {cloName.map((column) => (
                                                        <div key={column}>
                                                            <FormControlLabel onClick={() => { setitemColumn(column) }} value={column} control={<Radio />} label={column} />
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </td>
                                    </tr>
                                </>
                            }
                            <tr>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <p>min support</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder={`The orginal value is ${min_support}`}
                                        type="text"
                                        onChange={(e) => { setmin_support(e.target.value) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <p>min confidence</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder={`The orginal value is ${min_confidence}`}
                                        type="text"
                                        onChange={(e) => { setmin_confidence(e.target.value) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <p>min lift</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder={`The orginal value is ${min_lift}`}
                                        type="text"
                                        onChange={(e) => { setmin_lift(e.target.value) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <p>min len</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder={`The orginal value is ${min_len}`}
                                        type="text"
                                        onChange={(e) => { setmin_len(e.target.value) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <p>max len</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder={`The orginal value is ${max_len}`}
                                        type="text"
                                        onChange={(e) => { setmax_len(e.target.value) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2 ' >
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                        onClick={() => { setOpenFlowName(true) }}>
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Updata
                                        </span>
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>

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


            <SnackbarComp handleClose={handleClose} open={openSnackBar} barType={barType} massege={massege} />
            <InputFlowname openFlowName={openFlowName} handleClose={handleClose} setFlowName={setFlowName} handleCreateFlow={handleCreateFlow} setFlowDiscription={setFlowDiscription} />

        </div>
    )
}
