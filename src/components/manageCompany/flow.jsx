import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api/api'
import { getcompanyId } from '../../api/data'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const Flow = () => {
    const companyId = getcompanyId()
    const [flows, setFlows] = useState([])
    const [show, setShow] = useState(false)



    useEffect(() => {
        api.get(`/autoMLCore/flow/get_all_flows/${companyId}`)
            .then((res) => {
                console.log(res)
                setFlows(res.data)
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className='px-10 py-6 space-y-4'>
            {show &&
                Object.keys(flows).map((flow) => (
                    <div>
                        <h1 className='text-lg font-bold capitalize'>{flow}:</h1>
                        <div className='grid grid-cols-4 p-4 gap-5'>
                            <>
                                {flows[flow].length != 0 ?

                                    flows[flow].map((oneflow) => (
                                        <div className='px-4 py-4 border flex justify-between items-center rounded-lg border-blue-600'>

                                            <div className='space-y-2'>
                                                <p><span className='font-bold'>Name</span>: {oneflow.flow.name}.</p>
                                                <p><span className='font-bold'>Description</span>: {oneflow.flow.description}.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const Flowid = oneflow.id
                                                    switch (flow) {
                                                        case 'geolocation':
                                                            console.log('geolocation', Flowid)
                                                            api.delete(`/geolocation/geolocation_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;
                                                        case 'frequentItemSet':
                                                            console.log('frequentItemSet', Flowid)
                                                            api.delete(`/frequent_pattern_itemset/frequentitemset_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;
                                                        case 'classification':
                                                            console.log('classification', Flowid)
                                                            api.delete(`/classification/classification_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;

                                                        case 'regression':
                                                            console.log('regression', Flowid)
                                                            api.delete(`/regression/regression_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;

                                                        case 'anomaly':
                                                            console.log('anomaly', Flowid)
                                                            api.delete(`/anomaly/anomaly_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;


                                                        case 'sentiment':
                                                            console.log('sentiment', Flowid)
                                                            api.delete(`/sentiment/sentiment_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;

                                                        case 'clustering':
                                                            console.log('clustering', Flowid)
                                                            api.delete(`/clustering/clustering_delete_flow/${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                    window.location.reload()
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;


                                                        case 'timeSeries':
                                                            console.log('timeSeries', Flowid)
                                                            api.delete(`/timeSeries/timeSeries_delete_flow/{timeSeriesId}${Flowid}`)
                                                                .then((res) => {
                                                                    console.log(res)
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err)
                                                                })
                                                            break;




                                                        default:
                                                            break;
                                                    }
                                                }}>
                                                <DeleteOutlineOutlinedIcon color='error' />
                                            </button>
                                        </div>
                                    ))

                                    :
                                    <>No Flow Created</>
                                }

                            </>
                        </div>
                    </div>
                ))}
        </div>
    )
}
