import { createSlice } from '@reduxjs/toolkit'

export const flowData = createSlice({
    name: 'flowData',
    initialState: {
        flow_Data: [{ id: 123 }],
        html_File: ''
    },
    reducers: {
        adddata: (state, action) => {
            state.flow_Data = [action.payload]
        },
        deletedata: (state, action) => {
            state.flow_Data = []
        },
        addHtmlFile: (state, action) => {
            state.html_File = [action.payload]
        },
        deleteHtmlFile: (state, action) => {
            state.html_File = ''
        },

    }
})

// Action creators are generated for each case reducer function
export const { adddata, deletedata, addHtmlFile, deleteHtmlFile } = flowData.actions

export default flowData.reducer