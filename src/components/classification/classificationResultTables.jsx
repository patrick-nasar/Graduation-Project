import React from 'react'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Tooltip } from '@mui/material'

export const ClassificationResultTables = ({ data }) => {

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

            <h1 className='text-lg font-bold'>Compare algorithems:</h1>
            <div className='w-[100 dvh] h-[90 dvh] flex justify-center'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='max-h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className='sticky top-0 py-3 px-6 bg-white animate-slide_left'>
                            <tr>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] rounded-ss-lg '>
                                    <div className='flex justify-center items-center'>
                                        <span>Algorithem Name</span>
                                        {/* <Tooltip title="Frequency of items in transaction" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip> */}
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>Accuracy</span>
                                        <Tooltip title="accuracy is the fraction of predictions our model got right" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>F1</span>
                                        <Tooltip title="F1 score is a machine learning evaluation metric that measures a model's accuracy" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>AUC</span>
                                        <Tooltip title="AUC provides an aggregate measure of performance across all possible classification thresholds" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>Kappa</span>
                                        <Tooltip title="the kappa statistic is a measure of how closely the instances classified by the machine learning classifier matched the data labeled as ground truth" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>MCC</span>
                                        <Tooltip title="is a more reliable statistical rate which produces a high score only if the prediction obtained good results in all of the four confusion matrix categories" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>Prec</span>
                                        <Tooltip title="the quality of a positive prediction made by the model" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-4 mx-8 border-b  text-white bg-[#1976d2] '>
                                    <div className='flex justify-center items-center'>
                                        <span>Recall</span>
                                        <Tooltip title="also known as the true positive rate it is the percentage of data samples that a machine learning model correctly identifies as belonging to a class “positive class” " placement="top">
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
                                        <div className='px-6 py-3 border-r'> {model.Accuracy}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.F1}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.AUC}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{model.Kappa}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model.MCC}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model['Prec.']}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3  border-r'>{model.Recall}</div>
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