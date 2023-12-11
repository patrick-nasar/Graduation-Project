import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Tooltip } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export const ClassificationModelUse = () => {
    const hiddenFileInput = React.useRef(null);
    const classificationId = useParams()
    const [columns, setColumns] = useState([])
    const [View, setView] = useState(false)

    const [Result, setResult] = useState()

    const HandleChangeValue = (ColName, value) => {
        const column = ColName[0]
        console.log(column, value)
        setColumns(columns.map((item) => {
            console.log(item)
            if (Object.keys(item)[0] === column) {
                console.log(Object.keys(item)[0])
                return {
                    ...item, [column]: value
                };
            } else {
                console.log(Object.keys(item)[0])
                return item;
            }
        })
        );
    }


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleSubmitCSVFile = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0]
        api.post(`/classification/classifiaction_test_data_obj_or_csv/${classificationId.id}`, { file: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res)
                setResult(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = (event) => {

        api.post(`/classification/classifiaction_test_data_obj_or_csv/${classificationId.id}`, columns)
            .then((res) => {
                console.log(res)
                setResult(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        api.get(`/classification/classifiaction_get_columns_for_test_data/${classificationId.id}`)
            .then((res) => {
                console.log(res)
                let x = res.data.result.reduce((a, v) => ({ ...a, [v]: '' }), {})
                // for (let i = 0; i < res.data.result.length; i++) {
                //     let x = res.data.result[i]
                // }
                setColumns(x)
                console.log(columns)
                setView(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="relative w-full min-h-[120dvh] px-6 space-x-4 text-white flex justify-center items-center text-center z-90 bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] ">
            {/* <button
                type="button"
                className='text-xl w-full h-12 bg-[#5582e4] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                onClick={() => console.log(Result)}
            >
                Submit
            </button> */}

            {View &&
                <div className=' w-1/2 h-fit px-4 py-5 bg-white rounded-md hover:shadow-xl space-y-6 shadow-md backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937]  '>
                    <h1 className='font-bold text-xl text-left'>Classification Model:</h1>
                    <table>
                        <tbody>

                            {Object.keys(columns).map((column, index) => (
                                <tr key={index}>
                                    <td className='text-left py-2 pl-3 '>
                                        <p className='font-bold pl-1'>{column}:</p>
                                    </td>
                                    <td className='text-left py-2 pl-3 w-full'>
                                        <input type='text' className='w-1/2 h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400'
                                            onChange={(e) => setColumns({ ...columns, [column]: e.target.value })}
                                        />

                                    </td>
                                    {/* <div className='flex justify-start items-center space-x-5'> */}
                                    {/* // onChange={(e) => { setUserName(e.target.value) }} */}
                                    {/* </div> */}
                                </tr>

                            ))}

                        </tbody>
                    </table>
                    <div className='space-y-3'>
                        <button
                            type="button"
                            className='text-xl w-full h-12 bg-[#5582e4] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                        <h3 className='font-bold text-lg'> OR </h3>
                        <button
                            onClick={handleClick}
                            className='text-xl w-full h-12 bg-[#5582e4] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                        >
                            <div className='flex justify-center items-center space-x-2'>
                                <p>Use your CSV file</p>
                                <InsertDriveFileOutlinedIcon />
                            </div>
                        </button>
                        <input
                            type="file"
                            accept=".csv"
                            ref={hiddenFileInput}
                            onChange={handleSubmitCSVFile}
                            style={{ display: 'none' }}
                        />

                    </div>
                </div>
            }


            {Result &&
                <div className=' w-[35%] h-fit max-h-[90dvh] overflow-y-auto px-4 py-5 bg-white rounded-md space-y-6 shadow-md backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937]  '>
                    <h1 className='font-bold text-xl text-left'>Classification Model Results:</h1>
                    {Result.map((row) => (
                        <>
                            <table>
                                <tbody>
                                    {Object.keys(row).map((column, index) => (
                                        <tr key={index}>
                                            <td className='text-left py-2 pl-3 '>
                                                {column === 'prediction_score' &&
                                                    <p className='font-bold pl-1'>
                                                        prediction score
                                                        <Tooltip title="100% indicates that the model predicts perfectly." placement="top">
                                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                                        </Tooltip>
                                                        :
                                                    </p>
                                                }

                                                {column === 'prediction_label' &&
                                                    <p className='font-bold pl-1'>
                                                        prediction value
                                                        {/* <Tooltip title="" placement="top">
                                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                                        </Tooltip> */}
                                                        :
                                                    </p>
                                                }

                                                {column != 'prediction_score' && column != 'prediction_label' && <p className='font-bold pl-1'>{column}:</p>}
                                            </td>
                                            <td className='text-left py-2 pl-3 w-full'>
                                                {column === 'prediction_score' ?
                                                    <p>{(row[column] * 100).toFixed(2)} %</p>
                                                    :
                                                    <p>{row[column]}</p>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <hr />
                        </>
                    ))}
                </div>
            }
        </div>
    )
}
