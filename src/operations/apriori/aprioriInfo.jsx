import { FormControl } from '@mui/base';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'

export const AprioriInfo = ({ csv, dataType, setitemColumn, setmin_support, setmin_confidence, setmin_len, setmin_lift, setmax_len, selectedIDColumns, setselectedIDColumns }) => {

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

    return (
        <div>
            <div className='px-24 py-4 space-y-2'>
                <div className='space-y-3'>
                    <table className=''>
                        <tbody >
                            {dataType === 'item_spleted_per_row' &&
                                <>
                                    <tr>
                                        <td className='py-2 ' >
                                            <p>Id Columns</p>
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
                                                    {Object.keys(csv[0]).map((column) => (
                                                        <div key={column}>
                                                            <FormControlLabel
                                                                onChange={handleselectedColumns} value={column} control={<Checkbox />} label={column} />
                                                        </div>
                                                    ))}
                                                    {/* <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder='The default value is 2'
                                        type="text"
                                        onChange={(e) => { setitemColumn(e.target.value) }}
                                    /> */}
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
                                                    {Object.keys(csv[0]).map((column) => (
                                                        <div key={column}>
                                                            <FormControlLabel onClick={() => { setitemColumn(column) }} value={column} control={<Radio />} label={column} />
                                                        </div>
                                                    ))}
                                                    {/* <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder='The default value is 2'
                                        type="text"
                                        onChange={(e) => { setitemColumn(e.target.value) }}
                                    /> */}
                                                </RadioGroup>
                                            </FormControl>
                                        </td>
                                    </tr>
                                </>
                            }
                            <tr>
                                <td className='py-2 ' >
                                    <p>min support</p>
                                </td>
                                <td className='py-2 pl-5'>
                                    <input
                                        className='w-80 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                                        onKeyPress={() => validate()}
                                        placeholder='The default value is 0.0005'
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
                                        placeholder='The default value is 0.8'
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
                                        placeholder='The default value is 1.2'
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
                                        placeholder='The default value is 2'
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
                                        placeholder='The default value is 5'
                                        type="text"
                                        onChange={(e) => { setmax_len(e.target.value) }}
                                    />
                                </td>
                            </tr>


                        </tbody>
                    </table>

                </div>
            </div>


        </div>
    )
}
