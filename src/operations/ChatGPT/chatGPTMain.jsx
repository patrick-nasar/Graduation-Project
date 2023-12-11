import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import InputCSV from '../../components/New Flow/inputCSV'

export const ChatGPTMain = () => {
    const [fileName, setFileName] = useState('')
    const [csv, setcsv] = useState([])
    const [csvFileToSend, setCsvFileToSend] = useState()
    const [tempCSV, setTempCSV] = useState([])
    const [DATASET_ID, setDATASET_ID] = useState()
    const [createORUploadedDataset, setcreateORUploadedDataset] = useState('')

    const handleClick = () => {
        let x = {
            file: csvFileToSend,
            name: fileName
        }
        api.post('/api/dataset/create_dataset', x, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res);
                setDATASET_ID(res.data.id)
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div>
            <InputCSV fileName={fileName} setFileName={setFileName} csv={csv} setcsv={setcsv} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />

            <div className='text-center py-5'>

                {/* <Link
                    to={`/ChatWithAI/${DATASET_ID}`}
                    className='border px-4 py-3 text-lg font-semibold rounded-lg'> Go to Chat Page</Link>
                */}
                    {/* <button
                        onClick={() => {
                           console.log(createORUploadedDataset)
                        }}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden duration-500 text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            upwd]awdnaid
                        </span>
                    </button> */}


                {createORUploadedDataset === 'create' && DATASET_ID === undefined &&
                    <button
                        onClick={() => {
                            handleClick()
                        }}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden duration-500 text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Upload Your File
                        </span>
                    </button>
                }

                {DATASET_ID != undefined &&
                    <Link
                        to={`/ChatWithAI/${DATASET_ID}`}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden duration-500 text-lg text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Go to Chat Page
                        </span>
                    </Link>
                }
            </div>

        </div>
    )
}
