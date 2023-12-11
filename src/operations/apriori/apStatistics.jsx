import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import Charts from '../../components/charts'

export const ApStatistics = ({ DATASET_ID, dataType, itemColumn, selectedIDColumns }) => {
  const [html, setHTML] = useState()
  const [chartsData, setChartsData] = useState()
  const [viewHTML, setviewHTML] = useState(false)
  const [viewCharts, setviewCharts] = useState(false)

  useEffect(() => {
    let values = {
      dataset_type: dataType,
      groupbyColumns: selectedIDColumns,
      itemColumn: itemColumn,
    }
    console.log(values)
    api.post(`/frequent_pattern_itemset/get_statistics_of_transaction_dataset/${DATASET_ID}`, values)
      .then((res) => {
        console.log('statistics', res)
        setChartsData(res.data)
        setviewCharts(true)
      })
      .catch((err) => {
        console.log(err)
      })

    api.get(`/autoMLCore/statistics/dataset_statistics_html_file/${DATASET_ID}`)
      .then((res) => {
        console.log('html', res)
        setHTML({ __html: res.data.html })
        setviewHTML(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {dataType !== 'vertical' ?
        <div>
          {viewCharts &&
            <Charts chartsData={chartsData} />
          }
          {viewHTML ?
            <div className=''>
              <iframe className='w-full h-screen' srcDoc={html.__html}></iframe>
            </div>
            :
            <div className='flex justify-center items-center'>
              <p> Loading Statistics About Your Dataset...</p>
            </div>

          }
        </div>
        :
        <h1 className='text-center text-3xl font-bold py-6'>No statistics can been shown for this type</h1>
      }

    </>

  )
}
