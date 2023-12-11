import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const TimeResultIMG = ({ data }) => {
    
    const [silhouette, setsilhouette] = useState()
    const [elbow, setelbow] = useState()
    useEffect(() => {

       


        api.get('/api/' + data.elbow, {
            responseType: "arraybuffer"
        })
            .then((res) => {
                console.log(res)
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setelbow(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.silhouette, {
            responseType: "arraybuffer"
        })
            .then((res) => {
                console.log(res)
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setsilhouette(base64);
            })
            .catch((err) => {
                console.log(err)
            })


     

    }, [])

    return (
        <div className='overflow-x-hidden'>
            <div className='w-screen grid grid-cols-3 gap-x-4 gap-y-2'>

                

                {elbow != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${elbow}`} alt="" />
                    </div>
                }

                {silhouette != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${silhouette}`} alt="" />
                    </div>
                }

              

            </div>
        </div>
    )
}
