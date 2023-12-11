import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/api'

export const ClusteringOldFlow = () => {
    const id = useParams()
    const [dataset, setDataset] = useState()
    const [flow, setflow] = useState()
    const [flowID, setflowID] = useState()
    const [show, setshow] = useState(false)

    useEffect(() => {
        api.get(`/clustering/clustering_get_one_flow/${id.id}`)
            .then((res) => {
                console.log(res)
                setDataset(res.data.anomaly_flow.data.dataset)
                setflow(res.data.anomaly_flow.data.flow)
                setflowID(res.data.anomaly_flow.data.id)
                setshow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <button type="button" >Teal</button>

            <div className="flex justify-between items-center px-6 py-5">
                <h1 className='text-center font-bold text-lg'>Classification Model Information</h1>
                <Link
                    to={`/Anomaly_USE_Model/${flowID}`}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                    Use Model
                </Link>
            </div>
            <div className='px-11 py-2 space-y-5'>
                {show &&
                    <>
                        <h2><span className='font-semibold'>Dataset Name: </span>{dataset.name}</h2>
                        <h2><span className='font-semibold'>Flow Name: </span>{flow.name}</h2>
                    </>
                }
            </div>
        </>
    )
}
