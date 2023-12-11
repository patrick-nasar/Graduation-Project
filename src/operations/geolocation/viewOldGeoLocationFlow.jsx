import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/api'
import MapComp from '../../components/map'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export const ViewOldGeoLocationFlow = () => {
    const id = useParams()
    const [view, setView] = useState(false)
    const [DATASETID, setDATASETID] = useState()
    const [medianPoint, setpoint] = useState()
    const [flowInfo, setFlowInfo] = useState()
    let markersForMap = []


    console.log(id)
    useEffect(() => {
        api.get(`/geolocation/geolocation_get_one_flow/${id.id}`)
            .then((res) => {
                console.log(res)
                let lat = res.data.data.Lat
                let long = res.data.data.Lon
                let name = res.data.data.location
                // console.log('lat', lat)
                // console.log('long', long)
                // console.log('name', name)
                // console.log(markersForMap)
                for (let i = 0; i < lat.length; i++) {
                    console.log('awdawd')
                    let x = { latitude: lat[i], longitude: long[i], pointtitle: name[i] }
                    markersForMap.push(x)
                }
                setpoint(res.data.geometric_median)
                setFlowInfo(res.data.geolocation_flow)
                setDATASETID(res.data.geolocation_flow.dataset.id)
                // console.log(res.data.data.Lat[0])
                setView(true)
            })
            .catch((err) => {
                console.log('err', err)
            })
        console.log(markersForMap)
    }, [view])


    console.log(markersForMap)
    return (
        <div>
            {view ?
                <>
                    <div className='px-11 py-7 space-y-3'>
                        <div className='flex justify-between items-center'>
                            <h2>Flow Name: {flowInfo.flow.name}</h2>
                            <Link to={`/GeolocationUpdata/${id.id}/${DATASETID}`}>
                                <EditOutlinedIcon />
                            </Link>
                        </div>
                        <h2>Flow Discription: {flowInfo.flow.description}</h2>
                        <h2>Dataset Name: {flowInfo.dataset.name}</h2>
                        <h2>Direction Column: {flowInfo.directionColumn}</h2>
                        <h2>Title Column: {flowInfo.titleColumn}</h2>
                        {/* <h2>: {}</h2> */}
                    </div>
                    <MapComp medianPoint={medianPoint} markersForMap={markersForMap} />
                </>
                :
                <div className='flex justify-center items-center py-9 px-4 text-lg font-bold'>
                    Loading you data...
                </div>
            }
        </div>
    )
}
