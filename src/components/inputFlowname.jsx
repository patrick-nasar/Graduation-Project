import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, TextField } from '@mui/material';


export const InputFlowname = ({ openFlowName, handleClose, setFlowName, handleCreateFlow,setFlowDiscription }) => {
    return (
        <div>
            <Dialog open={openFlowName} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Enter flow name and discription</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        placeholder='Flow Name'
                        variant="standard"
                        onChange={(e) => { setFlowName(e.target.value) }}
                    />
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        placeholder='Flow Discription'
                        variant="standard"
                        onChange={(e) => { setFlowDiscription(e.target.value) }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateFlow}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
