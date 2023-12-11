import { FormControl } from '@mui/base'
import { Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

export default function SelectColumn({ csv, setOperationColumn, importentColumns, setImportentColumns }) {

  const handleOpretionColumn = (event) => {
    setOperationColumn(event.target.value)
  }

  const handleImportentColumns = (event) => {
    const currentIndex = importentColumns.indexOf(event.target.value);
    const newChecked = [...importentColumns];

    if (currentIndex === -1) {
      newChecked.push(event.target.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setImportentColumns(newChecked);
  }

  return (
    <>
      <div className='w-full h-full px-20 pb-8'>
        <div className='flex justify-between'>
          <div className='w-full'>
            <h1 className='text-lg pb-2'>Select to make operation on it</h1>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleOpretionColumn}
              >
                {Object.keys(csv[0]).map((key, index) => (
                  <div key={key}>
                    <FormControlLabel value={key} control={<Radio />} label={key}  />
                    {/* {key} */}
                  </div>
                ))}
              </RadioGroup>

            </FormControl>
          </div>
          <div className='w-full'>
            <h1 className='text-lg pb-2'>Select importent columns</h1>
            {Object.keys(csv[0]).map((key, index) => (
              <div key={key}>
                <Checkbox
                  sx={{
                    color: pink[500],
                    '&.Mui-checked': {
                      color: pink[500],
                    },
                  }}
                  id={key}
                  value={key}
                  onChange={handleImportentColumns}
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  label={key}
                />
                {key}
              </div>
            ))}

          </div>
        </div>

      </div>
    </>)
}
