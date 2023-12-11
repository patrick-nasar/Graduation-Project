import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import api from '../../api/api'

export const SentimentOld = () => {

    const id = useParams()
    const [csv, setcsv] = useState()
    const [view, setview] = useState(false)


    console.log(id.id)

    useEffect(() => {
        api.get(`/sentiment/sentiment_get_one_flow/${id.id}`)
            .then((res) => {
                console.log(res)
                setcsv(res.data.result)
                setview(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            {view ?
                <div className='w-[100 dvh] h-[90 dvh] flex justify-center pt-4 px-5'>
                    <div className='w-fit max-w-full p-0 m-0'>
                        <table className='h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                            <thead className=''>
                                <tr className=''>
                                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th>
                                    {Object.keys(csv[0]).map(key => (
                                        <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white capitalize' key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                {csv.map((row, index) => (
                                    index % 2 == 0 ?
                                        <tr key={index} className=''>
                                            <td className='bg-white border-r border-dashed border-slate-300 text-center '>{index}</td>
                                            {Object.values(row).map((value, index) => (
                                                <td className='px-6 py-3 bg-white' key={index} >
                                                    {typeof (value) === 'number' ?
                                                        <>{(value * 100).toFixed(2)}%</>
                                                        :
                                                        <>{value}</>
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                        :
                                        <tr key={index} className=''>
                                            <td className='bg-slate-100 border-r border-dashed border-slate-300 text-center'>{index}</td>
                                            {Object.values(row).map((value, index) => (
                                                <td className='px-6 py-3 bg-slate-100' key={index} >
                                                    {typeof (value) === 'number' ?
                                                        <>{(value * 100).toFixed(2)}% </>
                                                        :
                                                        <>{value}</>
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                :
                <div className='flex justify-center items-center py-20 text-3xl font-semibold'>
                    Please Wait...
                </div>

            }
        </div>

    )
}
