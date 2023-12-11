import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const AnomalyResultIMG = ({data}) => {
    const [tsne, settsne] = useState()
    const [umap, setumap] = useState()
   
    useEffect(() => {

        api.get('/api/' + data.tsne, {
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
                settsne(base64);
            })
            .catch((err) => {
                console.log(err)
            })


        api.get('/api/' + data.umap, {
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
                setumap(base64);
            })
            .catch((err) => {
                console.log(err)
            })



    }, [])

    return (
        <div className='overflow-x-hidden'>
            <div className='w-screen grid grid-cols-3 gap-x-4 gap-y-2'>

                {tsne != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${tsne}`} alt="awdawdawd" />
                    </div>
                }


                {umap != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${umap}`} alt="" />
                    </div>
                }



            </div>
        </div>
    )
}
