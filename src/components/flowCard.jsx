import React from 'react'

export default function FlowCard({ colorPicker, oneflow, flowtype }) {
    return (
        <div className='w-[21rem] h-[16rem]  rounded-lg shadow-md bg-white hover:scale-105 transition duration-500'>
            <div className='w-full h-[9rem] p-3 '>
                <table className='w-full h-full p-2 text-left '>
                    <thead className=''>
                        <tr className='text-white'>
                            <th className={`max-h-10 font-extralight max-w-[5rem] text-ellipsis overflow-hidden p-2 rounded-tl-lg ${flowtype === 'frequentItemSet' && oneflow.datasetType !== "items_in_one_column" ? `bg-slate-50 text-black` : `bg-[${colorPicker}]`}  `}>
                                {oneflow.datasetColumns[0]}
                            </th>
                            {oneflow.datasetColumns[1] &&
                                <th className={`max-h-10 font-extralight max-w-[5rem] text-ellipsis overflow-hidden p-2 ${flowtype === 'frequentItemSet' && oneflow.datasetType !== "items_in_one_column" ? `bg-slate-50 text-black` : `bg-[${colorPicker}]`}  `}>
                                    {oneflow.datasetColumns[1]}
                                </th>
                            }
                            {oneflow.datasetColumns[2] &&
                                <th className={`max-h-10 font-extralight max-w-[5rem] text-ellipsis overflow-hidden p-2 rounded-tr-lg ${flowtype === 'frequentItemSet' ? `bg-slate-50 text-black` : `bg-[${colorPicker}]`}`}>
                                    {oneflow.datasetColumns[2]}
                                </th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden'>
                                {oneflow.datasetrows[0][0].slice(0, 10)}
                            </td>
                            {oneflow.datasetrows[0][1] &&
                                <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden'>
                                    {oneflow.datasetrows[0][1].slice(0, 10)}
                                </td>
                            }
                            {oneflow.datasetrows[0][2] !== undefined &&
                                <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden rounded-tl-xl`'>
                                    {oneflow.datasetrows[0][2].slice(0, 10)}
                                </td>}

                        </tr>

                        <tr>
                            <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden rounded-tl-xl`'>
                                {oneflow.datasetrows[1][0].slice(0, 10)}
                            </td>
                            {oneflow.datasetrows[1][1] &&
                                <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden '>
                                    {oneflow.datasetrows[1][1].slice(0, 10)}
                                </td>
                            }
                            {
                                oneflow.datasetrows[1][2] !== undefined &&
                                <td className='max-h-10 font-thin text-slate-800 bg-slate-50 px-2 py-1 text-ellipsis overflow-hidden rounded-tl-xl`'>
                                    {oneflow.datasetrows[1][2].slice(0, 10)}
                                </td>}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className=' px-3 text-left flex justify-left items-center  text-ellipsis overflow-hidden '>
                <div className={`w-1 h-1 rounded-full bg-[${colorPicker}] mr-1`} />
                Dataset name: {oneflow.dataset.name.slice(0, 20)}
            </div>
            <div className='py-2 px-3 text-left flex justify-left items-center  text-ellipsis overflow-hidden'>
                <div className={`w-1 h-1 rounded-full bg-[${colorPicker}] mr-1`} />
                Flow name: {oneflow.flow.name.slice(0, 25)}
            </div>
            <div className=' px-3 text-left flex justify-left items-center  text-ellipsis overflow-hidden'>
                <div className={`w-1 h-1 rounded-full bg-[${colorPicker}] mr-1`} />
                Flow Type: {(() => {
                    switch (flowtype) {
                        case 'frequentItemSet':
                            return 'Frequent Item Set'
                        case 'geolocation':
                            return 'Geolocation'
                        case 'classification':
                            return 'Classification'
                        case 'regression':
                            return 'Prediction'
                        case 'anomaly':
                            return 'Anomaly'
                        case 'sentiment':
                            return 'Sentiment'
                        case 'clustering':
                            return 'Clustering'
                        case 'timeSeries':
                            return 'Time Series'

                        default:
                            return null
                    }
                })()}
                {/* flow type: {flowtype === } */}
            </div>

            <div className='hidden bg-[#e63946]' />
            <div className='hidden bg-[#1d3557]' />
            <div className='hidden bg-[#8338ec]' />
            <div className='hidden bg-[#457b9d]' />
            <div className='hidden bg-[#219ebc]' />
            <div className='hidden bg-[#fb5607]' />
            <div className='hidden bg-[#38b000]' />
        </div>
    )
}
