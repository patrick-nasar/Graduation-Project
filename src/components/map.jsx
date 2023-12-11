// import * as React from 'react';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';

// export default function MapComp() {
//     return (
//         <>
//             <div className='flex justify-center items-center w-full mt-11'>
//                 <ReactMapGL
//                     mapboxAccessToken='pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'
//                     mapLib={import('mapbox-gl')}
//                     initialViewState={{
//                         longitude: -100,
//                         latitude: 40,
//                         zoom: 6.5
//                     }}
//                     style={{ width: '100vh', height: '70vh' }}
//                     mapStyle="mapbox://styles/mapbox/streets-v9"
//                 >
//                     {/* <Marker
//                         longitude={-100}
//                         latitude={40}
//                         color='#374151'>
//                         <div className='h-5 w-5 bg-black'></div>
//                     </Marker> */}
//                 </ReactMapGL>

//             </div>
//             {/* <div className='flex justify-center items-center w-full mt-11'>
//                 <ReactMapGL
//                     mapboxAccessToken='pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'
//                     initialViewState={{
//                         longitude: -100,
//                         latitude: 40,
//                         zoom: 6.5
//                     }}
//                     style={{ width: '100vh', height: '70vh' }}
//                     mapStyle="mapbox://styles/mapbox/streets-v9"

//                 >
//                     <Marker
//                         longitude={-100}
//                         latitude={40}
//                     >
//                         <button
//                             className="marker-btn"
//                             onClick={e => {
//                                 e.preventDefault();
//                             }}
//                         >
//                             <img src="/skateboarding.svg" alt="Skate Park Icon" />
//                         </button>
//                     </Marker>

//                     <Popup
//                         longitude={-100}
//                         latitude={40}
//                         onClose={() => {
//                         }}
//                     >
//                         <div>
//                             <h2>'awd</h2>
//                             <p>awdawdawd</p>
//                         </div>
//                     </Popup>
//                 </ReactMapGL>
//             </div> */}
//         </>

//     )
// } 




// import React from 'react';
// import Map, { Marker } from 'react-map-gl';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'


// export default function MapComp() {
//     const [viewport, setViewport] = React.useState({
//         latitude: 37.7577,
//         longitude: -122.4376,
//         zoom: 8
//     });

//     return (

//         <Map
//             mapboxAccessToken='pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'
//             initialViewState={{
//                 longitude: -100,
//                 latitude: 40,
//                 zoom: 6.5
//             }}
//             style={{
//                 width:"100%",
//                 height:"100%"
//             }}
//             mapStyle="mapbox://styles/mapbox/streets-v9"
//             onViewportChange={setViewport}
//         >
//             <Marker latitude={40} longitude={-100}>
//                 <div>You are here</div>
//             </Marker>
//         </Map>
//     );
// }


// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'

// export default function MapComp() {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v12',
//             center: [lng, lat],
//             zoom: zoom
//         });
//     });

//     return (
//         <div>
//             <div ref={mapContainer} className="map-container" />
//         </div>
//     );

// }


// import React, { useRef, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import geoJson from "./chicago-parks.json";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

// const MapComp = () => {
//   const mapContainerRef = useRef(null);

//   // Initialize map when component mounts
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-87.65, 41.84],
//       zoom: 10,
//     });

//     // Create default markers
//     geoJson.features.map((feature) =>
//       new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
//     );

//     // Add navigation control (the +/- zoom buttons)
//     map.addControl(new mapboxgl.NavigationControl(), "top-right");

//     // Clean up on unmount
//     return () => map.remove(); 
//   }, []);

//   return <div className="absolute w-full h-full" ref={mapContainerRef} />;
// }; 

// export default MapComp;
 
 

import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css'
import marker from '../img/marker.gif'
import RoomIcon from '@mui/icons-material/Room';

function MapComp({ markersForMap, medianPoint }) {
    const [viewport, setViewport] = useState(medianPoint);
    const [markers, setMarkers] = useState(markersForMap); 

    console.log('in map comp', markers)
    console.log('in map comp22', markersForMap)
    return (
        <div> 
            <div className='flex justify-center items-center px-10 pt-8'> 
                <p className='font-bold text-xl'>
                    We calculate the distance between all your customers and found the best location for your business 
                </p> 
            </div>
            <div className=' flex justify-center items-center h-[100dvh]'>    
                {/* {markers.length != 0 && */}  
                <div className='absolute h-96 w-[100%]'> 
                    <ReactMapGL
                        initialViewState={{
                            longitude: viewport.longitude, 
                            latitude: viewport.latitude,
                            zoom: 15
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v12" 
                        // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                        mapboxAccessToken='pk.eyJ1IjoiZmFkaTIzIiwiYSI6ImNsbTJiazh5cDFtaTEzZXM2bWhnOHN3eTEifQ.HaT51y165au6580n3zaG1g'
                    >
                        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                            <div className='text-center space-y-2'>
                                {/* <p className='bg-white text-xs py-1 px-2 rounded-md '>Recomended New Location</p> */}
                                <p className='bg-white text-xs py-1 px-2 rounded-md capitalize'>best location</p>
                                <RoomIcon className='text-red-600' />
                                {/* <img src={marker} className='h-6 w-6'/> */}
                                {/* <div>📍</div> */}

                            </div>
                        </Marker>
                        {markers.length != 0 && (

                            markers.map((marker, index) => (
                                <Marker key={index} latitude={marker.latitude} longitude={marker.longitude}>
                                    {/* <div>📍</div> */}
                                    <div className='text-center'>
                                        <p> {marker.pointtitle}</p>
                                        <RoomIcon />
                                    </div>
                                </Marker>
                            ))

                        )}

                    </ReactMapGL>
                </div >
                {/* } */}
            </div>
        </div>
    );
}

export default MapComp;