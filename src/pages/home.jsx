import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api'
import { addHtmlFile, deletedata } from '../redux/flowData'
import { useNavigate } from 'react-router-dom'
import bannerImg from '../img/bannerHome.jpg'
import geoLoctionImg from '../img/geoLocationHome.png'
import frequentHome from '../img/frequentHome.png'
import regHome from '../img/regHome.png'
import classificationHome from '../img/classificationHome.png'
import editdataHome from '../img/editdataHome.png'

export default function Home() {
  // featch data from redux
  const dispatch = useDispatch()
  const [html, setHTML] = useState({ __html: "<html><body>adwad</body></html" })
  const navigate = useNavigate();



  // const showfunc = (num) => {
  //   api.get(`/autoMLCore/statistics/dataset_statistics_html_file/${num}`)
  //     .then((res) => {
  //       console.log('xxxxx', res)
  //       console.log('xx12123', res.data.html)
  //       const a = res.data.html
  //       // const first = a.split("<nav")[0]
  //       // const sencond = a.split("</nav>")[1]
  //       // const all = first + sencond
  //       // const nopadding = all.split('body {padding-top: 80px;}')[0]
  //       // const xx = all.split('body {padding-top: 80px;}')[1]
  //       // const allall = nopadding + xx
  //       setHTML({ __html: a })
  //       // return {__html: };
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // useEffect(() => {
  //   showfunc(1)

  // }, [])


  return (
    // <div className='p-9'>
    //   <button onClick={() => { dispatch(adddata({ id: 12345678 })) }}>add</button>
    //   <br></br>
    //   <br></br>
    //   <br></br>

    //   <button onClick={() => { }}>show</button>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <button onClick={() => { dispatch(deletedata()) }}>dedeedede</button>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <button onClick={() => { showfunc() }}>dedeedede</button>
    // <div dangerouslySetInnerHTML={html} />

    // <button onClick={() => {
    //   dispatch(addHtmlFile(html.__html))
    //   navigate('/ShowHTML')
    //   console.log(html.__html)
    // }}>adwa</button>

    <div className='w-full overflow-hidden space-y-9 dark:bg-slate-700 dark:text-white '>

      <div className='w-full space-y-5 animate-fade '>
        <img src={bannerImg} className='w-screen' />
        <h2 className='uppercase text-4xl font-extrabold text-center'>Our Services</h2>
        <div className='grid grid-cols-5 gap-5 px-8'>
          <a href='#Cassification' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Cassification</a>
          <a href='#Prediction' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500 '>Prediction</a>
          <a href='#FrequentItemset' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Frequent Itemset</a>
          <a href='#NewLocation' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>New Location</a>
          <a href='#ExploreDataset' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Explore Dataset</a>
          <a href='#Cassification' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Anomaly</a>
          <a href='#Cassification' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Sentiment</a>
          <a href='#Cassification' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Clustering</a>
          <a href='#Cassification' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Time Series</a>
          <a href='#EditDataSet' className='text-lg font-bold py-3 px-4 border dark:border-slate-700 rounded-lg shadow-sm bg-[#017ec6] text-white hover:scale-110 duration-500  '>Edit DataSet</a>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>


      <div id='Cassification' className='w-full space-y-4 animate-fade  px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>Cassification</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={classificationHome} className='w-1/2 ' />
          <p className='text-2xl'>
            We calculate the distance between all your customers and found the best location for your business
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>


      <div id='Prediction' className='w-full space-y-4 animate-fade  px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>Prediction</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={regHome} className='w-1/2 ' />
          <p className='text-2xl'>
            We calculate the distance between all your customers and found the best location for your business
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>



      <div id='FrequentItemset' className='w-full space-y-4 animate-fade px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>Frequent Itemset</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={frequentHome} className='w-1/2 ' />
          <p className='text-2xl'>
            You can know what items are being bought togther
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>


      <div id='NewLocation' className='w-full space-y-4 animate-fade px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>New Location</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={geoLoctionImg} className='w-1/2 ' />
          <p className='text-2xl'>
            We calculate the distance between all your customers and found the best location for your business
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>


      <div id='EditDataSet' className='w-full space-y-4 animate-fade  px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>Edit DataSet</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={editdataHome} className='w-1/2 ' />
          <p className='text-2xl'>
            We calculate the distance between all your customers and found the best location for your business
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>

      <div id='ExploreDataset' className='w-full space-y-4 animate-fade  px-7'>
        <h2 className='uppercase text-4xl font-extrabold text-center'>Explore Dataset</h2>
        <div className='flex justify-evenly items-center space-x-6'>
          <img src={editdataHome} className='w-1/2 ' />
          <p className='text-2xl'>
            We calculate the distance between all your customers and found the best location for your business
          </p>
        </div>
      </div>
      <div className='w-screen flex justify-center items-center py-5'>

        <hr className='w-[70%] ' />
      </div>

    </div>


  )
}
