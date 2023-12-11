import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const OldTimeComp = ({ data }) => {
    const [html1, setHTML1] = useState()
    const [html2, setHTML2] = useState()
    const [html3, setHTML3] = useState()
    const [viewh1, setviewH1] = useState(false)
    const [viewh2, setviewH2] = useState(false)
    const [viewh3, setviewH3] = useState(false)

    console.log(data)

    const keys = Object.keys(data.result)
    const values = Object.values(data.result)
    let array = []
    let New_keys = []

    for (let i = 0; i < keys.length; i++) {
        var s = new Date(parseInt(keys[i])).toLocaleDateString("en-US")
        New_keys.push(s)
        array.push({ [s]: values[i] })

    }
    console.log(array)
    console.log(New_keys)


    var s = new Date(807408000000).toLocaleDateString("en-US")
    console.log(s)

    useEffect(() => {

        api.get('/api/In-Sample Forecast Plot.html ')
            .then((res) => {
                console.log(res)
                setHTML1({ __html: res.data })
                setviewH1(true)
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/Out-of-Sample Forecast Plot.html ')
            .then((res) => {
                console.log(res)
                setHTML2({ __html: res.data })
                setviewH2(true)

            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/Time Series Plot.html ')
            .then((res) => {
                console.log(res)
                setHTML3({ __html: res.data })
                setviewH3(true)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    return (
        <div>

            {viewh1 &&
                <iframe className='w-full h-[75dvh]' srcDoc={html1.__html}></iframe>
            }
            {viewh2 &&
                <iframe className='w-full h-[75dvh]' srcDoc={html2.__html}></iframe>
            }
            {viewh3 &&
                <iframe className='w-full h-[75dvh]' srcDoc={html3.__html}></iframe>
            }

        
            <>
                    <h1 className='text-center text-2xl font-bold'>Results </h1>
                <div className='w-[100 dvh] h-[90 dvh] flex justify-center pt-4'>
                    <div className='w-[70dvw] max-w-full p-0 m-0'>
                        <table className='w-[70dvw] h-[85vh] text-center overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                            <thead className=''>
                                <tr className=''>
                                    <th className='w-[70dvw] sticky top-0 py-3 px-6 bg-[#1976d2] text-white'>Date </th>
                                    <th className='sticky w-[70dvw] top-0 py-3 px-6 bg-[#1976d2] text-white'>Prediction </th>

                                </tr>
                            </thead>
                            <tbody>

                                {array.map((row, index) => (
                                    index % 2 == 0 ?
                                        <tr key={index} className=''>

                                            {Object.keys(row).map((value, index) => (
                                                <td className='px-6  py-3 bg-white' key={index} > {value}</td>
                                            ))}

                                            {Object.values(row).map((value, index) => (
                                                <td className='px-6 py-3 bg-white' key={index} > {value}</td>
                                            ))}
                                        </tr>
                                        :
                                        <tr key={index} className=''>
                                            {Object.keys(row).map((value, index) => (
                                                <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                                            ))}                                            {Object.values(row).map((value, index) => (
                                                <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                                            ))}
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </>


        </div >
    )
}
