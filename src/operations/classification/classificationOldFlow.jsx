import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/api'

export const ClassificationOldFlow = () => {
    const id = useParams()
    const [dataset, setDataset] = useState()
    const [flow, setflow] = useState()
    const [flowID, setflowID] = useState()
    const [targetColumn, setTargetColumn] = useState()
    const [trainMode, setTrainMode] = useState()
    const [show, setshow] = useState(false)

    useEffect(() => {
        api.get(`/classification/classifiaction_get_one_flow/${id.id}`)
            .then((res) => {
                console.log(res)
                setDataset(res.data.dataset)
                setflow(res.data.flow)
                setflowID(res.data.id)
                setTargetColumn(res.data.targetColumn)
                setTrainMode(res.data.trainMode)
                setshow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {/* <button type="button" >Teal</button> */}

            <div className="flex justify-between items-center px-6 py-5">
                <h1 className='text-center font-bold text-lg'>Classification Model Information</h1>
                <Link
                    to={`/Cassification_USE_Model/${flowID}`}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                    Use Model
                </Link>
            </div>
            <div className='px-11 py-2 space-y-5'>
                {show &&
                    <>
                        <h2 > <span className='font-semibold'>Dataset Name:  </span>{dataset.name}</h2>
                        <h2 > <span className='font-semibold'>Flow Name:  </span>{flow.name}</h2>
                        <h2 > <span className='font-semibold'>Target Column: </span>{targetColumn}</h2>
                        <h2 > <span className='font-semibold'>Train Mode: </span>{trainMode}</h2>
                    </>
                }
            </div>
        </>
    )
}
