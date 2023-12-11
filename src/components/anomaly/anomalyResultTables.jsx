import React from 'react'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Tooltip } from '@mui/material'

export const AnomalyResultTables = ({ data }) => {

    const experimentData = data.experimentData
    const result = data.result

    return (
        <div className='space-y-8 pt-6  '>

            <div className='space-y-3'>
                <h1 className='text-lg font-bold py-2'>Experiment Data:</h1>
                <div className='grid grid-cols-3 gap-7'>
                    {experimentData.map((row) => (
                        <div key={row.Description}>
                            {typeof (row.Value) === 'object' ?
                                <p>
                                    <span className='font-semibold'>
                                        {row.Description}:
                                    </span>
                                    {row.Value != null && (
                                        row.Value.map((val) => (<span key={val}>{val}, </span>))
                                    )}
                                </p>

                                :
                                typeof (row.Value) === 'boolean' ?
                                    <p><span className='font-semibold'>{row.Description}</span>: {row.Value.toString()} </p>
                                    :
                                    <p><span className='font-semibold'>{row.Description}</span>: {row.Value} </p>
                            }
                        </div>
                    ))}
                </div>
            </div>

          

            <hr />

            <h1 className='text-lg font-bold'>Test Dataset:</h1>
            <div className='w-[100 dvh] h-[90 dvh] flex justify-center'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='max-h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className=''>
                            <tr className=''>
                                {/* <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th> */}

                                {Object.keys(result[0]).map(key => (
                                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((row, index) => (
                                index % 2 == 0 ?
                                    <tr key={index} className=''>
                                        {/* <td className='bg-white pl-5  border-r border-dashed border-slate-300 '>{index}</td> */}
                                        {Object.values(row).map((value, index) => (
                                            <td className='px-6 py-3 bg-white' key={index} > {value}</td>
                                        ))}
                                    </tr>
                                    :
                                    <tr key={index} className=''>
                                        {/* <td className='bg-slate-100 pl-5  border-r border-dashed border-slate-300 '>{index}</td> */}
                                        {Object.values(row).map((value, index) => (
                                            <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                                        ))}
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




        </div>
    )
}

{/* <td >
    <div className='px-2 py-3'>{model.antecedents.map((map, index) => (<p key={index}>{map}, </p>))}</div>
</td> */}