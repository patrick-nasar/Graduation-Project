import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export const RegressingResultIMG = ({data}) => {
    const [pipeline, setpipeline] = useState()
    const [residuals_interactive, setresiduals_interactive] = useState()
    const [residuals, setresiduals] = useState()
    const [error, seterror] = useState()
    const [cooks, setcooks] = useState()
    const [rfe, setirfe] = useState()
    const [learning, setlearning] = useState()
    const [vc, setvc] = useState()
    const [manifold, setmanifold] = useState()
    const [feature, setfeature] = useState()
    const [feature_all, setfeature_all] = useState()
    const [parameter, setparameter] = useState()
    const [tree, settree] = useState()
    
    useEffect(() => {

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
                setpipeline(base64);
            })
            .catch((err) => {
                console.log(err)
            })


        api.get('/api/' + data.residuals_interactive, {
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
                setresiduals_interactive(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.residuals, {
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
                setresiduals(base64);
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
                seterror(base64);
            })
            .catch((err) => {
                console.log(err)
            })

        api.get('/api/' + data.cooks, {
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
                setcooks(base64);
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
                setirfe(base64);
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
                setlearning(base64);
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
                setvc(base64);
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
                setmanifold(base64);
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
                setfeature(base64);
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
                setfeature_all(base64);
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
                setparameter(base64);
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
                settree(base64);
            })
            .catch((err) => {
                console.log(err)
            })
        

    }, [])

    return (
        <div className='overflow-x-hidden'>
            <div className='w-screen grid grid-cols-3 gap-x-4   '>
{/* 
                {pipeline != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${pipeline}`} alt="awdawdawd" />
                    </div>
                } */}


                {/* {residuals_interactive != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${residuals_interactive}`} alt="" />
                    </div>
                } */}


                {/* {residuals != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${residuals}`} alt="" />
                    </div>
                } */}




                {/* {cooks != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${cooks}`} alt="" />
                        </div>
                    } */}


                {rfe != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${rfe}`} alt="" />
                    </div>
                }


                {learning != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${learning}`} alt="" />
                    </div>
                }


                {/* {vc != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${vc}`} alt="" />
                        </div>
                } */}


                {/* {manifold != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                    <img src={`data:image/jpeg;charset=utf-8;base64,${manifold}`} alt="" />
                    </div>
                } */}


                {feature != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img className='w-[21rem] h-[17rem]' src={`data:image/jpeg;charset=utf-8;base64,${feature}`} alt="" />
                    </div>
                }


                {/* {feature_all != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${feature_all}`} alt="" />
                        </div>
                    } */}

                {parameter != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${parameter}`} alt="" />
                    </div>
                }

                {tree != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${tree}`} alt="" />
                    </div>
                }
                {error != undefined &&
                    <div className='w-[25rem] h-[20rem]'>
                        <img className='w-[25rem] h-[20rem]' src={`data:image/jpeg;charset=utf-8;base64,${error}`} alt="" />
                    </div>
                }

            </div>
        </div>
    )
}
