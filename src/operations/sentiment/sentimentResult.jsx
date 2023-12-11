import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const SentimentResult = () => {
    const data = useSelector(state => state.flowdata.flow_Data[0])
    const [csv, setcsv] = useState(data.result)

    console.log(data)
    return (
        <div>
            <div className='w-[100 dvh] h-[90 dvh] flex justify-center pt-4 px-5'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className=''>
                            <tr className=''>
                                <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th>
                                {Object.keys(csv[0]).map(key => (
                                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>{key}</th>
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
        </div>
    )
}
