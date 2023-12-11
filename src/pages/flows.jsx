import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlowCard from '../components/flowCard'
import addfile from '../img/database.gif'
import apriori from '../img/apriori.png'
import Prediction from '../img/Prediction.png'
import Recommendation from '../img/Recommendation.png'
import location from '../img/location.png'
import businessmanai from '../img/businessmanai.png'
import classificationimg from '../img/classification.png'
import EditCSVFile from '../img/editCSVFile.png'
import anomaly from '../img/anomaly.png'
import sentiment from '../img/sentiment.png'
import clustering from '../img/clustering.png'
import time from '../img/time.png'
import api from '../api/api'
import { getadmin, getcompanyId, getteamId, getuserId } from '../api/data'


export default function Flows() {
  const colors = ['#e63946', '#1d3557', '#8338ec', '#457b9d', '#219ebc', '#fb5607', '#38b000']
  const [flows, setFlows] = useState()
  const [show, setShow] = useState(false)

  const colorPicker = () => {
    let number = Math.floor(Math.random() * (6 - 0 + 1) + 0);
    let color = colors[number]
    return color
  }

  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (getadmin() === 'true') {
      api.get(`/autoMLCore/flow/get_all_flows/${getcompanyId()}`)
        .then((res) => {
          console.log(res)
          setFlows(res.data)
          setShow(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      api.get(`/autoMLCore/flow/get_all_flows_in_team/${getteamId()}`)
        .then((res) => {
          console.log(res)
          setFlows(res.data)
          setShow(true)
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }, [])


  return (
    <div className='text-center content-center p-2'>
      <div className=' grid-cols-3 inline-grid gap-6 justify-center items-center py-5 '>

        <button
          onClick={() => { setOpen(true) }}
          className='flex justify-center items-center w-[21rem] h-[16rem] shadow-md rounded-xl bg-white hover:scale-105 transition duration-500' >
          <div>
            <img src={addfile} className='w-36 h-36' />
            <h1>Create new flow</h1>
          </div>
        </button>

        {show &&
          Object.keys(flows).map((flow) => (
            flows[flow].map((oneflow) => (
              <Link to={`/old/${flow}/${oneflow.id}`} key={oneflow.id}>
                <FlowCard colorPicker={colorPicker()} oneflow={oneflow} flowtype={flow} />
              </Link>

            ))
          ))}
      </div>



      {/* <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>
         */}

      {/* <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>

        <Link to='/oldflow'>
          <FlowCard colorPicker={colorPicker()} />
        </Link>
         */}


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='false'
      >
        <DialogTitle id="alert-dialog-title" className='dark:bg-slate-800 dark:text-white'>
          <span className=' font-bold'> Choose opiration</span>
        </DialogTitle>
        <DialogContent className='dark:bg-slate-800 dark:text-white'>
          <div className='grid grid-cols-3 gap-4 p-2'>
            <Link
              to='/Apriori'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={apriori} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Frequent Itemset</span>
                  <br />
                  <span className='text-xs'>You can know what items are being bought togther</span>
                </div>
              </div>
            </Link>

            <Link
              to='/Regression'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={Prediction} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Prediction</span>
                  <br />
                  <span className='text-xs'>Predict numbers and boolean values in the future </span>
                </div>
              </div>
            </Link>

            <Link
              to='/Cassification'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={classificationimg} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Cassification</span>
                  <br />
                  <span className='text-xs'>Classifying your data according to specific characteristics.</span>
                </div>
              </div>
            </Link>

            <Link
              to='/Geolocation'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={location} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>New Location</span>
                  <br />
                  <span className='text-xs '>Find best location for your business beased on your costumers Location</span>
                </div>
              </div>
            </Link>


            <Link
              to='/ChatMain'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={businessmanai} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Explore DataSet</span>
                  <br />
                  <span className='text-xs '>Explore your data with AI</span>
                </div>
              </div>
            </Link>

            <Link
              to='/EditDeataSet'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={EditCSVFile} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Edit DataSet</span>
                  <br />
                  <span className='text-xs '>Upload your dataset and edit it</span>
                </div>
              </div>
            </Link>

            <Link
              to='/AnomalyMain'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={anomaly} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Anomaly</span>
                  <br />
                  <span className='text-xs '>Differentiate data that not share the same pattern of all entities</span>
                </div>
              </div>
            </Link>

            <Link
              to='/Sentiment'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={sentiment} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Sentiment</span>
                  <br />
                  <span className='text-xs '>Analyzing text to determine the emotional and sentiment tone of the message...</span>
                </div>
              </div>
            </Link>

            <Link
              to='/ClusteringMain'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={clustering} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Clustering</span>
                  <br />
                  <span className='text-xs '>Divide data into a number of groups based on similarity and dissimilarity between them. </span>
                </div>
              </div>
            </Link>

            <Link
              to='/Time_Series'
              className='border-2 border-sky-600 rounded-lg hover:scale-105 transition duration-500'>
              <div className='w-72 h-32 flex justify-start items-center px-5 py-3 space-x-4 '>
                <img src={time} className='w-16 h-16' />
                <div>
                  <span className='text-xl font-bold'>Time Series</span>
                  <br />
                  <span className='text-xs '>Predict the comport of your data based on time series. </span>
                </div>
              </div>
            </Link>

          </div>
        </DialogContent>
      </Dialog>

    </div >
  )
}
