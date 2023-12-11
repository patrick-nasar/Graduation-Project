import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const ShowHTML = () => {
    const data = useSelector(state => state.flowdata.html_File)
    const [html, setHTML] = useState({ __html: data })


    console.log(data)
    return (
        // <div dangerouslySetInnerHTML={html} />
        <div className='w-full h-screen'>
            <iframe title='1'  className='w-full h-screen' srcDoc={html.__html}></iframe>
        </div>
    )
}
