import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { getcompanyId } from '../api/data'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';

export const Companymain = () => {

    let companyId = getcompanyId()
    const [compName, setCompName] = useState('')
    const [workEmail, setworkEmail] = useState('')
    const [address, setaddress] = useState('')
    const [created_at, setcreated_at] = useState('')
    const [companyType, setcompanyType] = useState('')
    const [tryaccomplish, settryaccomplish] = useState('')
    const [phone, setphone] = useState()


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

    const handleUpdate = () => {
        if (compName === '' || workEmail === '' || address === '' || created_at === '' || companyType === '' || tryaccomplish === '' || phone === '') {
            console.log('empty')
        }
        else {
            let values = {
                name: compName,
                address: address,
                phone: phone,
                work_email: workEmail,
                what_try_to_accomplish: tryaccomplish,
                camp: companyType
            }
            api.put(`/api/company/update_company/${getcompanyId()}`, values)
                .then((res) => {
                    console.log(res)
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => {
        setOpenDelete(false);

    };
    useEffect(() => {
        api.get(`/api/company/get_user_company/${companyId}`)
            .then((res) => {
                console.log(res)
                setCompName(res.data.name)
                setaddress(res.data.address)
                setcompanyType(res.data.camp)
                setcreated_at(res.data.created_at)
                setphone(res.data.phone)
                settryaccomplish(res.data.what_try_to_accomplish)
                setworkEmail(res.data.work_email)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className='px-24 py-4 space-y-2'>
            <h1 className='text-2xl py-2'>Company:</h1>
            <div className='space-y-3'>

                <table className=''>
                    <tbody >
                        <tr>
                            <td className='py-2 ' >
                                <p>Compny Name</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    placeholder={compName}
                                    type="text"
                                    onChange={(e) => { setCompName(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Work Email</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    placeholder={workEmail}
                                    type="text"
                                    onChange={(e) => { setworkEmail(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Phone</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    onKeyPress={() => validate()}
                                    placeholder={phone}
                                    type="text"
                                    onChange={(e) => { setphone(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Address</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    placeholder={address}
                                    type="text"
                                    onChange={(e) => { setaddress(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>Company Type</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    placeholder={companyType}
                                    type="text"
                                    onChange={(e) => { setcompanyType(e.target.value) }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className='py-2 ' >
                                <p>What try to accomplish</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <input
                                    className='w-80 h-11 p-2  bg-white bg-opacity-10 border border-sky-600 dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                    placeholder={tryaccomplish}
                                    type="text"
                                    onChange={(e) => { settryaccomplish(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2 ' >
                                <p>created at</p>
                            </td>
                            <td className='py-2 pl-5'>
                                <p>{created_at}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='py-6 ' >

                                <button
                                    onClick={() => { handleUpdate() }}
                                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white dark:text-white dark:hover:text-gray-900 ">
                                    <span className="relative px-5 py-2.5 tracking-wide hover:tracking-widest transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Update
                                    </span>
                                </button>
                            </td>
                            <td className='py-6 pl-5' >
                                <button
                                    onClick={() => setOpenDelete(true)}
                                    type="button"
                                    className="text-red-700 hover:text-white border-2 border-red-700 hover:bg-red-800 font-medium rounded-lg px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 ">
                                    <div className='flex items-center'>
                                        <DeleteOutlineOutlinedIcon fontSize='small' />
                                        Delete Company
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Delete Dialog */}
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        NOTE: You can't recover anything after delete
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDelete(false);
                    }}>
                        Don't Delete
                    </Button>

                    <Button onClick={() => {

                        setOpenDelete(false);
                    }} autoFocus>

                        <span className='text-red-600'>Delete</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
