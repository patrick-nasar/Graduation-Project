import { FormControl } from '@mui/base';
import { FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CSVLink } from 'react-csv';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Preprocessing({ csv, tempCSV, setTempCSV, columnType, setColumnType, tempColumnType, setTempColumnType, changeColumnNameFunction, DeleteColumnsFunction, DeleteRowsFunction, UndoAllChenges }) {

  const [EndofShowenCSV, setEndOfShowenCSV] = useState(100);
  const [TempForShow, setTempForShow] = useState(tempCSV.slice(0, EndofShowenCSV));
  const [hasMore, setHasMore] = useState(true);

  const [viewcsv, setviewcsv] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [columns, setColomns] = useState(Object.keys(tempCSV[0]));
  const [loadingcolumnType, setloadingColumnType] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [indResult, setIndResult] = useState([]);
  const [newColumnNames, setNewColumnNames] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);
  const [noMatching, setnoMatching] = useState(false);



  const handleRenameColumn = (colName, index) => {
    let colname = colName;
    let newnameC = newColumnNames[index]
    console.log(colName, newnameC)

    changeColumnNameFunction(colname, newnameC)

    if (typeof (newnameC) === 'string') {
      tempCSV.forEach((obj) => {
        obj[newnameC] = obj[colname];
        delete obj[colname];
      });
      setTempColumnType(prev => ({ ...prev, [newnameC]: tempColumnType[colname] }))

      delete tempColumnType[colname];
      console.log(tempColumnType)


      // setTempColumnType(tempColumnType)
    }
  }

  const funColumntype = () => {
    if (tempColumnType.length === 0) {

      let obvalue = []
      setTempColumnType([])
      Object.values(tempCSV[0]).map((value, index) => {
        let obvalue2 = typeof (value)
        if (obvalue2 === 'number') {
          if (value % parseInt(value) == 0)
            obvalue2 = 'integer';
          else obvalue2 = 'float';
        }
        obvalue.push(obvalue2)
      })
      for (let i = 0; i < columns.length; i++) {
        let x = columns[i]
        let y = obvalue[i]
        // let obj =  [x]: y 
        console.log(x, y)
        setColumnType(prev => ({ ...prev, [x]: y }))
        setTempColumnType(prev => ({ ...prev, [x]: y }))
      }
    }
    setloadingColumnType(true)
  }

  const handleChangetype = (event, index) => {
    let newtypee = { ...tempColumnType, [index]: event.target.value }
    setTempColumnType(newtypee)
    console.log(tempColumnType)
    // changeColumnTypeFunction()
  };


  const handleSearch = () => {
    setviewcsv(false)
    setViewSearch(false)
    setnoMatching(false)

    setSearchResult([]);
    setIndResult([]);
    for (let i = 0; i < columns.length; i++) {
      tempCSV.filter((row, index) => {
        if (row[columns[i]] == searchValue) {
          setSearchResult(prev => ([...prev, row]));
          setIndResult(prev => ([...prev, index]))
        }
      })
    }
    setViewSearch(true)
  }

  const handleDeleteRowformResulr = (index, indexRow, row) => {
    setSearchResult((prevData) => prevData.filter((_, i) => i !== index));
    setIndResult((prevData) => prevData.filter((_, i) => i !== index))
    setTempCSV((prevData) => prevData.filter((_, i) => i !== indexRow));
    DeleteRowsFunction(row)

    let x = indResult

    for (let i = 0; i < x.length; i++) {
      if (x[i] > x[index]) {
        x[i] = x[i] - 1
      }
      else {
        x[i] = x[i]
      }
    }
  };

  const handleDeleteRow = (index, row) => {
    DeleteRowsFunction(row)
    setTempCSV((prevData) => prevData.filter((_, i) => i !== index));
    setTempForShow((prevData) => prevData.filter((_, i) => i !== index));
    setSearchResult([]);
  };


  const handleDeleteColumn = (column) => {
    DeleteColumnsFunction(column)
    setTempCSV((prevData) =>
      prevData.map((row) => {
        const newRow = { ...row };
        delete newRow[column];
        return newRow;
      })
    );

    setTempForShow((prevData) =>
      prevData.map((row) => {
        const newRow = { ...row };
        delete newRow[column];
        return newRow;
      })
    );

    delete tempColumnType[column];
    setSearchResult([]);

  };

  useEffect(() => {
    funColumntype()
  }, []);

  return (
    <>
      {/* <button
        onClick={() => {
          console.log('row length', tempCSV)
          console.log('collength', Object.keys(tempCSV[0]))
          console.log()
        }}
      >awdadw</button> */}
      <div className='flex justify-center items-center pb-2 px-20'>
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => {
            setviewcsv(false)
            setTempCSV(csv)
            setTempForShow(tempCSV.slice(0, EndofShowenCSV))
            UndoAllChenges()
          }}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Undo All Changes
          </span>
        </button>
      </div>
      <div className='md:flex justify-between px-20 py-6 space-x-6'>
        <div className=''>
          <h1 className='font-bold text-lg pb-2'>Rename column </h1>
          <table className=''>
            <tbody >
              {Object.keys(tempCSV[0]).map((key, index) => (
                <tr key={key}>
                  <td className='py-1 ' >
                    <div className='flex items-center'>
                      <div className='h-[6px] w-[6px] bg-[#1976d2] rounded-full mr-2' />
                      <p>
                        {key}
                      </p>
                    </div>
                  </td>
                  <td className='py-1 pl-5'>
                    <input
                      className='h-11 p-2 bg-white bg-opacity-10 border dark:bg-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400'
                      type="text"
                      onChange={(e) => {
                        let newArr = [...newColumnNames]
                        newArr[index] = e.target.value
                        setNewColumnNames(newArr)
                      }}
                    />
                  </td>
                  <td className='py-1 '>
                    <button
                      className='px-3'
                      onClick={() => {
                        let colName = key
                        handleRenameColumn(colName, index)
                      }}>Rename</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=''>
          <h1 className='font-bold text-lg pb-2'>Change cloumn type</h1>
          <table className=''>
            <tbody >
              {Object.keys(tempCSV[0]).map((key, index) => (
                <tr key={key}>
                  <td className='py-1 ' >
                    <div className='flex items-center'>
                      <div className='h-[6px] w-[6px] bg-[#1976d2] rounded-full mr-2' />
                      <p>
                        {key}
                      </p>
                    </div>
                  </td>
                  {loadingcolumnType ?
                    <td className='py-1 pl-5'>
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={tempColumnType[key]}
                          // onChange={handleChangetype(e, index)}
                          onChange={ev => handleChangetype(ev, key)}
                        >
                          <Typography>
                            <FormControlLabel value="string" control={<Radio />} label="String" />
                            <FormControlLabel value="integer" control={<Radio />} label="Int" />
                            <FormControlLabel value="float" control={<Radio />} label="Float" />
                            <FormControlLabel value="bool" control={<Radio />} label="Bool" />
                            <br />
                            <FormControlLabel value="object" control={<Radio />} label="Category" />
                            <FormControlLabel value="date" control={<Radio />} label="Date" />
                          </Typography>
                        </RadioGroup>
                      </FormControl>

                    </td>
                    :
                    <td>loading...</td>}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
      <div className='w-full h-6 flex justify-center'>
        <hr className='w-1/2 ' />
      </div>
      <div className='px-20 pb-7'>
        <h1 className='font-bold text-lg pb-2'>Filter</h1>
        <div className='flex items-center'>
          <div className='border border-stone-400 w-fit rounded-lg'>
            <input
              className='h-11 p-2 bg-white bg-opacity-10  dark:bg-[#374151] rounded-lg focus:outline-none'
              type="text"
              placeholder='Search for any value '
              onChange={e => setSearchValue(e.target.value)} />
            <button
              className='border-l px-3'
              onClick={handleSearch}>
              <SearchOutlinedIcon fontSize='medium' className='mr-1 mb-[2px] text-slate-700' />
              <span className='text-slate-700'>Search</span>
            </button>
          </div>
          {viewSearch &&
            <p className='px-4 text-center text-xl font-bold'>Found <span className=' bg-[#1976d2] py-1 px-2 text-white rounded'>{searchResult.length}</span> Times</p>
          }
        </div>
      </div>

      {searchResult.length != 0 &&
        <div className='w-[99%] max-h-[99vh] pl-2 flex justify-center pb-6'>
          <div className='w-fit max-w-full '>
            <table className='max-h-[90vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
              <thead className=''>
                <tr className=''>
                  <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th>

                  {Object.keys(tempCSV[0]).map(key => (
                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>
                      {key}
                    </th>
                  ))}
                  <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white'></th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((row, index) => (
                  index % 2 == 0 ?
                    <tr key={index} className=''>
                      <td className='bg-white px-3  border-r border-dashed border-slate-300 '>
                        {indResult[index]}
                      </td>
                      {Object.values(row).map((value, index) => (
                        <td className='px-6 py-3 bg-white' key={index} >{value}</td>
                      ))}
                      <td className='px-6 py-3 bg-white'>
                        <button onClick={() => {
                          handleDeleteRowformResulr(index, indResult[index], row)
                        }}>
                          {/* <img src={deleteImg} className='w-5 h-5'/> */}
                          <DeleteOutlineOutlinedIcon className='text-red-600' />
                          {/* delete */}
                        </button>
                      </td>
                    </tr>
                    :
                    <tr key={index} className=''>
                      <td className='bg-slate-100 px-3  border-r border-dashed border-slate-300 '>
                        {indResult[index]}
                      </td>
                      {Object.values(row).map((value, index) => (
                        <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                      ))}
                      <td className='px-6 py-3 bg-slate-100'>
                        <button onClick={() => {
                          handleDeleteRowformResulr(index, indResult[index], row)
                        }}>
                          {/* <img src={deleteImg} className='w-5 h-5'/> */}
                          <DeleteOutlineOutlinedIcon className='text-red-600' />

                          {/* delete */}
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      <div className='w-full py-2 flex justify-center'>
        <hr className='w-1/2 ' />
      </div>

      <h1 className='font-bold text-lg px-20 '>Delete Columns or Rows</h1>
      <div className='flex justify-center items-center  space-x-4 p-2'>
        <button
          className='relative inline-flex items-center justify-center p-0.5 overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
          onClick={() => {
            setEndOfShowenCSV(100)
            setTempForShow(tempCSV.slice(0, EndofShowenCSV));
            setviewcsv(!viewcsv)
          }}>
          {viewcsv ?
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Hide CSV File</span>
            :
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              View CSV File</span>
          }
        </button>
        <>

          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          // onClick={() => {
          //   setTempCSV(csv);
          // }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <CSVLink data={tempCSV}>Download me</CSVLink>
            </span>
          </button>
        </>
      </div>

      {viewcsv &&
        <>
          <div className='w-[100 dvh] h-[99vh] flex justify-center '>
            <div className='w-fit max-w-full '>

              <table
                onScroll={(e) => {
                  let nerlyEqual = Math.round(e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight;
                  // const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
                  // console.log(nerlyEqual)
                  // console.log(Math.round(e.target.scrollHeight - e.target.scrollTop))
                  // console.log('target', e.target.clientHeight + 2)
                  if (nerlyEqual < 150) {
                    // console.log(tempCSV.length)
                    // console.log(TempForShow.length)
                    if (TempForShow.length != tempCSV.length) {

                      setEndOfShowenCSV(EndofShowenCSV + 100)
                      let x = EndofShowenCSV
                      // console.log(EndofShowenCSV)
                      // console.log(x)
                      setTempForShow(tempCSV.slice(0, x))
                    }
                  }
                }
                }
                className='h-[90vh] text-left overflow-scroll block border-b font-[0.9em] font-sans shadow-md rounded-md'>
                <thead className=''>
                  <tr className=''>
                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2]'></th>

                    {Object.keys(tempCSV[0]).map(key => (
                      <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white' key={key}>
                        <div className='text-left '>
                          <button
                            onClick={() => handleDeleteColumn(key)}>
                            {/* <img src={deleteImg} className='w-5 h-5'/> */}
                            <DeleteOutlineOutlinedIcon className='' />
                            {/* delete */}
                          </button>
                        </div>

                        {key}
                      </th>
                    ))}
                    <th className='sticky top-0 py-3 px-6 bg-[#1976d2] text-white'></th>
                  </tr>
                </thead>

                <tbody className='w-full'>
                  {TempForShow.map((row, index) => (
                    index % 2 == 0 ?
                      <tr key={index} className=''>
                        <td className='bg-white px-3  border-r border-dashed border-slate-300 text-center'>{index}</td>
                        {Object.values(row).map((value, index) => (
                          <td className='px-6 py-3 bg-white' key={index} > {value}</td>
                        ))}
                        <td className='px-6 py-3 bg-white'>
                          <button onClick={() => {
                            console.log(row)
                            handleDeleteRow(index, row)
                          }}>
                            {/* <img src={deleteImg} className='w-5 h-5'/> */}
                            <DeleteOutlineOutlinedIcon className='text-red-600' />
                            {/* delete */}
                          </button>
                        </td>
                      </tr>
                      :
                      <tr key={index} className=''>
                        <td className='bg-slate-100 px-3  border-r border-dashed border-slate-300 text-center '>{index}</td>
                        {Object.values(row).map((value, index) => (
                          <td className='px-6 py-3 bg-slate-100' key={index} > {value}</td>
                        ))}
                        <td className='px-6 py-3 bg-slate-100'>
                          <button onClick={() => handleDeleteRow(index, row)}>
                            {/* <img src={deleteImg} className='w-5 h-5'/> */}
                            <DeleteOutlineOutlinedIcon className='text-red-600' />
                            {/* delete */}
                          </button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    </>
  )
}
