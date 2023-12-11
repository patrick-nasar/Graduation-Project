import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MapComp from '../../components/map'

export const GeolocationResult = () => {
  const data = useSelector(state => state.flowdata.flow_Data[0])
  console.log(data)
  const medianPoint = data.geometric_median
  let markersForMap = []


  useEffect(() => {
    for (let i = 0; i < data.data.Lat.length; i++) {
      let x = { latitude: data.data.Lat[i], longitude: data.data.Lon[i], pointtitle:data.data.name[i] }
      markersForMap.push(x)
    }
  }, [])

  console.log(markersForMap)
  console.log(medianPoint)
  return (
    <div>
        <MapComp medianPoint={medianPoint} markersForMap={markersForMap} />
    </div>
  )
}
