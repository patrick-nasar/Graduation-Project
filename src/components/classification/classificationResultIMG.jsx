import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const ClassificationResultIMG = ({ data }) => {
    const [imgauc, setimageauc] = useState()
    const [imgboundary, setimageboundary] = useState()
    const [imgconfusion_matrix, setimageconfusion_matrix] = useState()
    const [imgdimension, setimagedimension] = useState()
    const [imgerror, setimageerror] = useState()
    const [imgfeature, setimagefeature] = useState()
    const [imgfeature_all, setimagefeature_all] = useState()
    const [imggain, setimagegain] = useState()
    const [imgks, setimageks] = useState()
    const [imglearning, setimagelearning] = useState()
    const [imglift, setimagelift] = useState()
    const [imgmanifold, setimagemanifold] = useState()
    const [imgparameter, setimageparameter] = useState()
    const [imgpr, setimagepr] = useState()
    const [imgrfe, setimagerfe] = useState()
    const [imgvc, setimagevc] = useState()
    const [imgtree, setimagetree] = useState()
    const [imgpipeline, setimagepipeline] = useState()

    useEffect(() => {

        api.get('/api/' + data.auc, {
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
                setimageauc(base64);
            })
            .catch((err) => {
                console.log(err)
            })


        api.get('/api/' + data.boundary, {
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
                setimageboundary(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.confusion_matrix, {
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
                setimageconfusion_matrix(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.dimension, {
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
                setimagedimension(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.error, {
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
                setimageerror(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.feature, {
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
                setimagefeature(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.feature_all, {
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
                setimagefeature_all(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.gain, {
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
                setimagegain(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.ks, {
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
                setimageks(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.learning, {
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
                setimagelearning(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.lift, {
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
                setimagelift(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.manifold, {
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
                setimagemanifold(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.parameter, {
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
                setimageparameter(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.pipeline, {
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
                setimagepipeline(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.pr, {
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
                setimagepr(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.rfe, {
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
                setimagerfe(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.tree, {
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
                setimagetree(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        api.get('/api/' + data.vc, {
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
                setimagevc(base64);
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])

    return (
        <div className='overflow-x-hidden'>
            <div className='w-screen grid grid-cols-3 gap-x-4 gap-y-2'>

                {imgauc != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgauc}`} alt="awdawdawd" />
                    </div>
                }


                {/* {imgboundary != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgboundary}`} alt="" />
                    </div>
                } */}



                {imglearning != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img className='w-[25rem] h-[18rem]' src={`data:image/jpeg;charset=utf-8;base64,${imglearning}`} alt="" />
                    </div>
                }

                {imgconfusion_matrix != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgconfusion_matrix}`} alt="" />
                    </div>
                }


                {/* {imgdimension != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgdimension}`} alt="" />
                    </div>
                } */}


                {/* {imgerror != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgerror}`} alt="" />
                    </div>
                } */}



                {imgfeature != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img className='w-[25rem] h-[18rem]' src={`data:image/jpeg;charset=utf-8;base64,${imgfeature}`} alt="" />
                    </div>
                }


                {imgfeature_all != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img className='w-[25rem] h-[18rem]' src={`data:image/jpeg;charset=utf-8;base64,${imgfeature_all}`} alt="" />
                    </div>
                }


                {/* {imgks != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgks}`} alt="" />
                    </div>
                } */}


                {/* {imggain != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imggain}`} alt="" />
                    </div>
                } */}



                {/* {imglift != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imglift}`} alt="" />
                    </div>
                }


                {imgmanifold != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgmanifold}`} alt="" />
                    </div>
                }


                {imgparameter != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgparameter}`} alt="" />
                    </div>
                } */}


                {/* {imgpr != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgpr}`} alt="" />
                    </div>
                }
                {imgrfe != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgrfe}`} alt="" />
                    </div>
                }
                {imgpipeline != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgpipeline}`} alt="" />
                    </div>
                }
                {imgtree != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgtree}`} alt="" />
                    </div>
                }
                {imgvc != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${imgvc}`} alt="" />
                    </div>
                } */}


            </div>
        </div>
    )
}
