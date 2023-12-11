import React from 'react'
import { FormControl } from '@mui/base'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'


export const GeolocationEditInfo = ({ csv, setTitleColumn, setDirectionColumn }) => {
    return (
        <div>


            <div className='flex justify-between px-20'>
                <div>
                    {/* Title Column */}
                    <div className='flex justify-center items-center'>
                        <div className='h-2 w-2 bg-blue-600 rounded-full' />
                        <h1 className='text-lg pl-2 pr-3 py-5'>Select Title Column:  </h1>
                    </div>
                    <FormControl>
                        <RadioGroup

                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={(event) => setTitleColumn(event.target.value)}
                        >
                            {Object.keys(csv[0]).map((key, index) => (
                                <div key={key}>
                                    <FormControlLabel value={key} control={<Radio />} label={key} />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    {/* Direction Column */}
                    <div className='flex justify-center items-center'>
                        <div className='h-2 w-2 bg-blue-600 rounded-full' />
                        <h1 className='text-lg pl-2 pr-3 py-5'>Select Direction Column:  </h1>
                    </div>
                    <FormControl>
                        <RadioGroup

                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={(event) => setDirectionColumn(event.target.value)}
                        >
                            {Object.keys(csv[0]).map((key, index) => (
                                <div key={key}>
                                    <FormControlLabel value={key} control={<Radio />} label={key} />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}
