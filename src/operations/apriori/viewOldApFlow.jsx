import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/api'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Table } from '../../components/aprioriComp/table';


export const ViewOldApFlow = () => {
    const flowID = useParams()
    const [DATASETID, setDATASETID] = useState()
    const [result, setresult] = useState()
    const [frequentItemSet, setfrequentItemSet] = useState()
    const [algorithm, setalgorithm] = useState()
    const [view, setview] = useState(false)



    console.log(flowID)
    useEffect(() => {
        api.get(`/frequent_pattern_itemset/frequentItemSet_get_one_flow/${flowID.id}`)
            .then((res) => {
                console.log(res)
                setresult(res.data.result)
                setDATASETID(res.data.frequentItemSet.FIS.dataset.id)
                setalgorithm(res.data.algorithm)
                setfrequentItemSet(res.data.frequentItemSet)
                setview(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {view ?
                <>
                    <div className='px-11 py-7 space-y-4'>
                        <div className='flex justify-between items-center'>
                            <h2>Flow Name: {frequentItemSet.FIS.flow.name}</h2>
                            <Link to={`/ApUpdate/${flowID.id}/${DATASETID}`}>
                                <EditOutlinedIcon />
                            </Link>
                        </div>
                        <div className='flex justify-start items-center'>
                            <div className='space-y-4'>
                                <h2>Flow Discription: </h2>
                                <h2>Used Algorithm: {algorithm}</h2>
                                <h2>Dataset Name: {frequentItemSet.FIS.dataset.name}</h2>
                                <h2>Dataset Type: {frequentItemSet.FIS.datasetType}</h2>
                                <h2>Item column: {frequentItemSet.FIS.itemColumn}</h2>
                                {frequentItemSet.groupbyColumns.length != 0 &&
                                    // ماني متأكد اذا ظابطة
                                    <h2>ID columns: {frequentItemSet.groupbyColumns.map((column) => (
                                        <span key={column}>{column} </span>
                                    ))}</h2>
                                }
                            </div>
                            <div className='w-[30%] '></div>
                            <div className='space-y-4'>
                                <h2>Max Len: {frequentItemSet.FIS.max_len}</h2>
                                <h2>Min Len: {frequentItemSet.FIS.min_len}</h2>
                                <h2>Min Confidence: {frequentItemSet.FIS.min_confidence}</h2>
                                <h2>Min Support: {frequentItemSet.FIS.min_support}</h2>
                                <h2>Min lift: {frequentItemSet.FIS.min_lift}</h2>
                            </div>
                        </div>
                        <hr className='w-[80%] mx-auto' />

                        <h2 className='pt-4 font-bold'>Result:</h2>
                    </div>
                    <Table result={result} />
                </>
                :
                <div className='flex justify-center items-center py-11 '>
                    <p>Loading Your data...</p>
                </div>
            }
        </>
    )
}
