import React from 'react'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Tooltip } from '@mui/material'

export const RegressionResultTables = ({ data }) => {

    const CompareData = data.CompareData
    const experimentData = data.experimentData
    const result = data.result
    const transfomedDataset = data.transfomedDataset

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

            <h1 className='text-lg font-bold'>Compare Models:</h1>
            <div className='w-[100 dvh] h-[90 dvh] flex justify-center'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='max-h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className='sticky top-0 py-3 px-6 bg-white animate-slide_left'>
                            <tr>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] rounded-ss-lg '>
                                    <div className='flex justify-center items-center'>
                                        <span>Model Name</span>
                                        {/* <Tooltip title="Frequency of items in transaction" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip> */}
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>MAE</span>
                                        <Tooltip title="Mean Absolute Error is the difference between the prediction of an observation and the true value" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>MAPE</span>
                                        <Tooltip title="mean absolute percentage error is the percentage equivalent of mean absolute error" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>MSE</span>
                                        <Tooltip title="Mean Squared Error is most common loss function" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>R2</span>
                                        <Tooltip title="R-squared is a statistical measure that represents the goodness of fit of a regression model" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>RMSE</span>
                                        <Tooltip title="Root Mean Square Error is the measure of how well a regression line fits the data points" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>RMSLE</span>
                                        <Tooltip title="Root Mean Square Error is the measure of how well a regression line fits the data points" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center break-keep'>
                                        <span>TT</span>
                                        <Tooltip title="Tensor Train is a generalization of SVD decomposition from matrices to tensors" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {CompareData.map((model, index) => (
                                <tr key={index} className={index % 2 === 0 ? `  animate-slide_left` : `bg-slate-100 animate-slide_left`}>
                                    <td>
                                        <div className='px-6 py-3 border-r'> {model.Model}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'> {model.MAE}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.MAPE}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.MSE}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.R2}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model.RMSE}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model.RMSLE}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model['TT (Sec)']}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <hr />
{/* 
            <h1 className='text-lg font-bold'>Transfomed Dataset:</h1>
            <div className='w-[100 dvh] h-[90 dvh] flex justify-center'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='max-h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className=''>
                            <tr className=''>
                                {/* <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th> 

                                {Object.keys(transfomedDataset[0]).map(key => (
                                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transfomedDataset.map((row, index) => (
                                index % 2 == 0 ?
                                    <tr key={index} className=''>
                                        {/* <td className='bg-white pl-5  border-r border-dashed border-slate-300 '>{index}</td>
                                        {Object.values(row).map((value, index) => (
                                            <td className='px-6 py-3 bg-white' key={index} > {value}</td>
                                        ))}
                                    </tr>
                                    :
                                    <tr key={index} className=''>
                                        {/* <td className='bg-slate-100 pl-5  border-r border-dashed border-slate-300 '>{index}</td> 
                                        {Object.values(row).map((value, index) => (
                                            <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                                        ))}
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <hr /> */}

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