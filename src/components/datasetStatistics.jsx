import React, { useEffect, useState } from 'react'
import api from '../api/api'

export const DatasetStatistics = ({DATASET_ID}) => {
    const [html, setHTML] = useState()
    const [viewHTML, setviewHTML] = useState(false)

    useEffect(() => {
        api.get(`/autoMLCore/statistics/dataset_statistics_html_file/${DATASET_ID}`)
            .then((res) => {
                console.log('html', res)
                setHTML({ __html: res.data.html })
                setviewHTML(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(DATASET_ID)
    return (
        <div>
            {viewHTML ?
                <div className=''>
                    <iframe className='w-full h-screen' srcDoc={html.__html}></iframe>
                </div>
                :
                <div className='flex justify-center items-center font-bold'>
                    <p> Loading Statistics About Your Dataset...</p>
                </div>

            }
        </div>
    )
}
