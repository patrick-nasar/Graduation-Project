import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const AnomalyStatistics = ({ DATASET_ID }) => {
    const [html2, setHTML2] = useState([])
    const [viewHTML, setviewHTML] = useState(false)


    useEffect(() => {
        api.get(`/autoMLCore/statistics/dataset_statistics_classification_html_file/${DATASET_ID}`)
            .then((res) => {
                console.log(res)
                for (let i = 0; i < res.data.html.length; i++) {
                    // const element = array[i];
                    setHTML2(prevArray => [...prevArray,{ __html: res.data.html[i] }])
                }
                setviewHTML(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className='px-6'>
            <button onClick={() => {
                console.log(html2)
            }}>awdawd</button>
            <div>
                {viewHTML ?
                    <div >
                        {html2.map((file) => (
                            <iframe className='w-full max-h-screen min-h-[30rem] mx-auto' srcDoc={file.__html}></iframe>
                        ))}
                    </div>
                    :
                    <div className='flex justify-center items-center font-bold'>
                        <p> Loading Statistics About Your Dataset...</p>
                    </div>

                }
            </div>
        </div>
    )
}
