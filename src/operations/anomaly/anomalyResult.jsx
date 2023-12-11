import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import { AnomalyResultIMG } from '../../components/anomaly/anomalyResultIMG'
import { AnomalyResultTables } from '../../components/anomaly/anomalyResultTables'

export const AnomalyResult = () => {
    const data = useSelector(state => state.flowdata.flow_Data[0])
    const ClassificationID = data.anomaly_flow.data.id
    console.log(data)


    return (
        <div className='px-4'>
            <div className="flex justify-between items-center">
                <h1 className='text-center py-5 font-bold text-lg'> Anomaly Results</h1>
                <Link
                    to={`/Anomaly_USE_Model/${ClassificationID}`}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Use Model
                </Link>

            </div>
            {/* <AnomalyResultIMG data={data} /> */}
            <hr />
            <AnomalyResultTables data={data} />
        </div>
    )
}
