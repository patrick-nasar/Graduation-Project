import { Pagination } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Chart from "react-apexcharts";

export default function ViewDataset({ csv, fileName }) {

  const [viewcsv, setviewcsv] = useState(false);
  const [showchart, setShowchart] = useState(false);

  let columnName = []
  let rowValue = []
  const count = {};
  let chartdata = []

  const [x, setx] = useState([]);
  const [y, sety] = useState([]);

  //bagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(100);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = csv.slice(firstPostIndex, lastPostIndex);

  let pages = [];

  for (let i = 1; i <= Math.ceil(csv.length / postsPerPage); i++) {
    pages.push(i);
  }

  var obj = {
    options: {
      chart: {
        id: "basic-bar",
        foreColor: '#000000'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#7E36AF"],
      // colors: ["#1976d2"],

    },
    stroke: {
      curve: 'smooth'
    },

  }

  const puty = (key, index) => {
    console.log(Object.values(count[key]))
    let y = Object.values(count[key])

    return y
    // if (Object.values(count[key]) === 'null') {
    //   y.push(0)
    // }
    // else {
    //   Object.values(count[key])
    // }
  }

  const chartdatafunction = () => {
    Object.keys(csv[0]).map((key, index) => {
      rowValue[index] = csv.map((row) => row[key]);

    })

    Object.keys(csv[0]).map((key, index) => {
      for (let i = 0; i < rowValue[0].length; i++) {
        let ele;
        ele = rowValue[index][i];
        if (!count[key])
          count[key] = {};

        if (count[key][ele]) {
          count[key][ele] += 1;
        } else {
          count[key][ele] = 1;
        }
      }
    })


    setTimeout(() => {
      console.log("Delayed for 1 second.");
      setShowchart(true)
    }, 3000);


  }

  useEffect(() => {
    chartdatafunction()
  }, [])


  return (
    <>
      <button onClick={() => {
        // setx(Object.values(count.MaxTemp))
        console.log('rowValue', rowValue)
        console.log('count ', count)
        console.log('count key', Object.keys(count))
        console.log('coun1t', Object.values(count))
        console.log('count', Object.values(count.MaxTemp))
      }}>awdaw</button>

      <div className='flex items-center justify-center text-lg p-2 '>
        <div className='w-3 h-3 bg-[#1976d2] rounded-full m-2' />
        <p>File name:
          <span className='text-xl'> {fileName}</span>
        </p>
        <div className='w-3 h-3 bg-[#1976d2] rounded-full m-2' />
      </div>
      <div className='flex items-center justify-center space-x-2 p-2'>
        <p>Number of Rows: {csv.length},</p>
        <p>Number of Columns: {Object.keys(csv[0]).length}</p>
      </div>

      {showchart ?
        <div className='w-[100 dvh] grid grid-cols-3 gap-x-2 gap-y-9 p-4 '>
          {Object.keys(csv[0]).map((key, index) => {
            console.log(count)
            // let x = Object.values(count[key])
            // let y = Object.keys(count[key])
            return (
              <div key={key}>
                <p>{key}</p>
                <Chart
                  type="bar"
                  width={400}
                  height={250}
                  series={[
                    {
                      // name: "Social Media Subscriber",
                      data: [2, 3, 3, 7, 2, 8, 13, 17, 15, 24, 33, 42, 45, 61, 64, 86, 118, 150, 170, 145, 155, 131, 133, 114, 114, 53, 42, 32, 17, 13, 7, 2, 4, 1],
                      // data: Object.values(count[key] || {}),
                      // data: puty(key, index),
                      // data: x,
                    },
                  ]}
                  options={{

                    dataLabels: {
                      enabled: false
                    },
                    colors: ["#7E36AF"],
                    // colors: ["#1976d2"],

                    xaxis: {
                      // categories: [12, 43, 'daw', 123, 2112, 12],
                      categories: [12, 43, 'daw', 123, 2112, 12],

                    },

                  }}
                ></Chart>
              </div>)
          })}
        </div>
        :
        <p>adw</p>
      }
      <>
        <div className='w-[100 dvh] h-[90 dvh] flex justify-center pt-4'>
          <div className='w-fit max-w-full p-0 m-0'>
            <table className='h-[85vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
              <thead className=''>
                <tr className=''>
                  <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th>

                  {Object.keys(csv[0]).map(key => (
                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((row, index) => (
                  index % 2 == 0 ?
                    <tr key={index} className=''>
                      <td className='bg-white pl-5  border-r border-dashed border-slate-300 '>{index}</td>
                      {Object.values(row).map((value, index) => (
                        <td className='px-6 py-3 bg-white' key={index} > {value}</td>
                      ))}
                    </tr>
                    :
                    <tr key={index} className=''>
                      <td className='bg-slate-100 pl-5  border-r border-dashed border-slate-300 '>{index}</td>
                      {Object.values(row).map((value, index) => (
                        <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                      ))}
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex h-28 w-full justify-center items-center '>
          <Pagination
            onChange={(event, page) => { setCurrentPage(page) }}
            count={pages.length}
            color="primary"
            showFirstButton
            showLastButton
            size='large' />
        </div>
      </>

    </>
  )
}
