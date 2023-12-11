import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'
import { OldTimeComp } from '../../components/timeseries/oldTime'
import { TimeResultIMG } from '../../components/timeseries/timeResultIMG'
import { adddata } from '../../redux/flowData'

export const TimeOld = () => {
    const id = useParams()
    const [view, setview] = useState(false)
    const [data, setdata] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {

        api.get(`/timeSeries/timeSeries_get_one_flow/${id.id}`)
            .then((res) => {
                setdata(res.data)
                setview(true)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])

    return (
        <>
            {view &&
                <OldTimeComp data={data}/>
            }
        </>
    )
}
