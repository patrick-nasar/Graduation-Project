import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Menu, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ClassificationSelectcloumn = ({ csv, setTargetColumn, trainMode, setTrainMode, KeepFeatures, IgnoreFeatures, TextFeatures, DateFeatures, CategoricalFeatures, NumericFeatures, OrdinalFeatures }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [anchorElTeam, setAnchorElTeam] = useState(null);
    const openTeam = Boolean(anchorElTeam);

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElTeam(null);
    };


    const handleSelectCol = (key, listname) => {
        // console.log(key, listname)
        let check = true
        switch (listname) {
            case 'KeepFeatures':
                KeepFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    KeepFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = KeepFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    KeepFeatures = updatedList
                    console.log(KeepFeatures)
                }
                console.log(KeepFeatures)
                break;

            case 'IgnoreFeatures':
                IgnoreFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    IgnoreFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = IgnoreFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    IgnoreFeatures = updatedList
                    console.log(IgnoreFeatures)
                }
                break;

            case 'TextFeatures':
                TextFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    TextFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = TextFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    TextFeatures = updatedList
                    console.log(TextFeatures)
                }
                break;

            case 'DateFeatures':
                DateFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    DateFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = DateFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    DateFeatures = updatedList
                    console.log(DateFeatures)
                }
                break;

            case 'CategoricalFeatures':
                CategoricalFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    CategoricalFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = CategoricalFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    CategoricalFeatures = updatedList
                    console.log(CategoricalFeatures)
                }
                break;

            case 'NumericFeatures':
                NumericFeatures.forEach(colName => {
                    if (colName.column === key) {
                        check = false
                    }
                });
                if (check) {
                    NumericFeatures.push({ column: key },)
                }
                else {
                    console.log(key)
                    const updatedList = NumericFeatures.filter((selcted) => selcted.column !== key);
                    console.log(updatedList)
                    NumericFeatures = updatedList
                    console.log(NumericFeatures)
                }
                break;

        }
    }

    return (
        <div className='px-11 py-4 space-y-12 '>
            {/* <button
                className='p-8'
                onClick={() => {
                    // console.log('targetColumn', targetColumn)
                    console.log('trainMode', trainMode)
                    console.log('KeepFeatures', KeepFeatures)
                    console.log('IgnoreFeatures', IgnoreFeatures)
                    console.log('TextFeatures', TextFeatures)
                    console.log('DateFeatures', DateFeatures)
                    console.log('CategoricalFeatures', CategoricalFeatures)
                    console.log('NumericFeatures', NumericFeatures)
                    console.log('OrdinalFeatures', OrdinalFeatures)
                }}>
                admma
            </button> */}
            <div>

                <Button
                    id="basic-button"
                    aria-controls={openTeam ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openTeam ? 'true' : undefined}
                    variant="outlined"
                    sx={{ color: 'black' }}
                    onClick={(event) => setAnchorElTeam(event.currentTarget)}
                >

                    Selected Mode: {trainMode}
                    {/* <div className='rounded-full bg-black w-8 h-8 ' /> */}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElTeam}
                    open={openTeam}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={() => { setTrainMode('FASTEST'); handleClose() }}
                    >
                        Fastest Mode
                    </MenuItem>
                    <MenuItem
                        onClick={() => { setTrainMode('HIGH_QUALITY'); handleClose() }}
                    >
                        High Quality Mode
                    </MenuItem>
                    <MenuItem
                        onClick={() => { setTrainMode('HIGHER_QUALITY'); handleClose() }}
                    >
                        Higher Quality Mode
                    </MenuItem>
                    <MenuItem
                        onClick={() => { setTrainMode('PRODUCTION'); handleClose() }}
                    >
                        Production Mode
                    </MenuItem>
                </Menu>
            </div>

            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                        <span className='font-bold text-black'>
                            Target Column:
                        </span>
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        className='px-5'
                        onChange={(event) => setTargetColumn(event.target.value)}
                    >
                        {Object.keys(csv[0]).map((key, index) => (
                            <div key={key} className='px-2'>
                                <FormControlLabel value={key} control={<Radio />} label={key} />
                                {/* {key} */}
                            </div>
                        ))}
                    </RadioGroup>

                </FormControl>
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Advanced Settings</Typography>
                    </AccordionSummary>


                    <AccordionDetails>
                        <Typography className='space-y-4'>
                            <div>
                                <div className='flex justify-start items-center space-x-2 '>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>Importent Columns : </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'KeepFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                            <div>
                                <div className='flex justify-start items-center space-x-2'>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>Ignore Columns: </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'IgnoreFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                            <div>
                                <div className='flex justify-start items-center space-x-2'>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>Text Features: </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'TextFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                            <div>
                                <div className='flex justify-start items-center space-x-2'>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>DateFeatures: </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'DateFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                            <div>
                                <div className='flex justify-start items-center space-x-2'>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>CategoricalFeatures: </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'CategoricalFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                            <div>
                                <div className='flex justify-start items-center space-x-2'>
                                    <div className='h-2 w-2 bg-blue-600 rounded-full' />
                                    <h2 className='font-bold'>NumericFeatures: </h2>
                                </div>
                                <FormGroup row>
                                    {Object.keys(csv[0]).map((key, index) =>
                                        <div key={index} className='px-3'>
                                            <FormControlLabel onChange={(e) => { handleSelectCol(key, 'NumericFeatures') }} control={<Checkbox />} label={key} />
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
