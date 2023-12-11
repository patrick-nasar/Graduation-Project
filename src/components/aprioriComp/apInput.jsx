import React, { useRef } from 'react'
import InputCSV from '../New Flow/inputCSV';

export default function ApInput({ setcsv, fileName, setFileName, dataType, setDataType, setTempCSV, setCsvFileToSend, setcreateORUploadedDataset, setDATASET_ID }) {

    return (
        <div>
            <InputCSV setcsv={setcsv} fileName={fileName} setFileName={setFileName} setTempCSV={setTempCSV} setCsvFileToSend={setCsvFileToSend} setcreateORUploadedDataset={setcreateORUploadedDataset} setDATASET_ID={setDATASET_ID} />

            <>
                <div className='w-full h-6 py-4 flex justify-center'>
                    <hr className='w-[67%] ' />
                </div>
                <h1 className='w-full pl-7 text-lg font-bold'>Please select the type of your data :</h1>
                <div className='w-full p-8 grid grid-cols-2 gap-x-8 gap-y-10 justify-center items-center content-center'>

                    <div className="flex justify-center items-center">
                        <button
                            className={`w-fit pt-1  hover:scale-[1.01] transition duration-500 ${dataType === 'vertical' && 'border-2 border-sky-600 rounded-xl  '}`}
                            onClick={() => setDataType('vertical')}>
                            <p className='px-2 pb-2 text-lg font-bold'>Vertical ex:</p>
                            <div className="flex justify-center items-center">
                                <table className='text-left '>
                                    <thead >
                                        <tr>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2] rounded-ss-lg'>Product</th>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2]  rounded-se-lg'>Transaction ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=''>
                                            <td className='px-2 py-1 border-r '>Product 1</td>
                                            <td className='px-2 py-1  '>Trasaction 1, Trasaction 2 </td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-1 border-r'>Product 2</td>
                                            <td className='px-2 py-1 '>Trasaction 3, Trasaction 5, Trasaction 6, Trasaction 9 </td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-1 border-r'>Product 3</td>
                                            <td className='px-2 py-1 '>Trasaction 2, Trasaction 5, Trasaction 8 </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            className={`w-fit pt-1  hover:scale-[1.01] transition duration-500 ${dataType === 'item_as_column' && 'border-2 border-sky-600 rounded-xl  '}`}
                            onClick={() => setDataType('item_as_column')}>
                            <p className='px-2 pb-2 text-lg font-bold'>Columns as items ex:</p>
                            <div className="flex justify-center items-center">
                                <table className='text-left '>
                                    <thead >
                                        <tr>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2] rounded-ss-lg'>Transaction</th>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2] '>Product 1</th>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2] '>Product 2</th>
                                            <th className='px-2 py-1 text-white font-semibold bg-[#1976d2] rounded-se-lg'>Product 3</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=''>
                                            <td className='px-2 py-1 border-r '>Transaction 1</td>
                                            <td className='px-2 py-1 border-r '>True OR False</td>
                                            <td className='px-2 py-1 border-r '>True OR False</td>
                                            <td className='px-2 py-1  '>True OR False</td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-1 border-r'>Transaction 2</td>
                                            <td className='px-2 py-1 border-r'>True OR False</td>
                                            <td className='px-2 py-1 border-r'>True OR False</td>
                                            <td className='px-2 py-1 '>True OR False</td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-1 border-r'>Transaction 3</td>
                                            <td className='px-2 py-1 border-r'>True OR False</td>
                                            <td className='px-2 py-1 border-r'>True OR False</td>
                                            <td className='px-2 py-1 '>True OR False</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            className={`w-fit pt-1  hover:scale-[1.01] transition duration-500 ${dataType === 'item_spleted_per_row' && 'border-2 border-sky-600 rounded-xl  '}`}
                            onClick={() => setDataType('item_spleted_per_row')}>
                            <p className='px-2 pb-2 text-lg font-bold'>Transaction identified by multiple columns ex:</p>
                            <div className="flex justify-center items-center">
                                <table className='text-left '>
                                    <thead >
                                        <tr>
                                            <th className='pr-24 pl-2 py-1 text-white font-semibold bg-[#1976d2] rounded-ss-lg'>ID</th>
                                            <th className='pr-24 pl-2 py-1 text-white font-semibold bg-[#1976d2] '>ID</th>
                                            <th className='pr-24 pl-2 py-1 text-white font-semibold bg-[#1976d2] rounded-se-lg'>Product </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='pr-24 pl-2 py-1 border-r '>ID 1</td>
                                            <td className='pr-24 pl-2 py-1 border-r '>ID 1</td>
                                            <td className='pr-24 pl-2 py-1  '>Product</td>
                                        </tr>
                                        <tr>
                                            <td className='pr-24 pl-2 py-1 border-r'>ID 2</td>
                                            <td className='pr-24 pl-2 py-1 border-r'>ID 2</td>
                                            <td className='pr-24 pl-2 py-1'>Product</td>
                                        </tr>
                                        <tr>
                                            <td className='pr-24 pl-2 py-1 border-r'>ID 1</td>
                                            <td className='pr-24 pl-2 py-1 border-r'>ID 2</td>
                                            <td className='pr-24 pl-2 py-1'>Product</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            className={`w-fit pt-1  hover:scale-[1.01] transition duration-500 ${dataType === 'row_as_items' && 'border-2 border-sky-600 rounded-xl '}`}
                            onClick={() => setDataType('row_as_items')}>
                            <p className='px-2 pb-2 text-lg font-bold'>Rows as Item without Index ex:</p>
                            <div className="flex justify-center items-center">
                                <table className=' text-left '>
                                    <tbody>
                                        <tr>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2] rounded-ss-lg'>Number of bill</td>
                                            <td className='px-2 py-2'>Product 1</td>
                                            <td className='px-2 py-2'>Product 3</td>
                                            <td className='px-2 py-2'>Product 6</td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2] '>Number of bill</td>
                                            <td className='px-2 py-2 border-t'>Product 1</td>
                                            <td className='px-2 py-2 border-t'>Product 2</td>
                                            <td className='px-2 py-2 border-t'></td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2] rounded-es-lg'>Number of bill</td>
                                            <td className='px-2 py-2 border-t'>Product 7</td>
                                            <td className='px-2 py-2 border-t'>Product 5</td>
                                            <td className='px-2 py-2 border-t'>Product 21</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>


                    <div className="flex justify-center items-center">
                        <button
                            className={`w-fit pt-1  hover:scale-[1.01] transition duration-500 ${dataType === 'items_in_one_column' && 'border-2 border-sky-600 rounded-xl '}`}
                            onClick={() => setDataType('items_in_one_column')}>
                            <p className='px-2 pb-2 text-lg font-bold'>Items in one column ex:</p>
                            <div className="flex justify-center items-center">
                                <table className=' text-left '>
                                    <tbody>
                                        <tr className=''>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2] rounded-ss-lg '>Id</td>
                                            <td className='px-2 py-1  '>Product 1, Product 2, Product 3</td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2]  '>Id</td>
                                            <td className='px-2 py-1  '>Product 3, Product 5 </td>
                                        </tr>
                                        <tr>
                                            <td className='px-2 py-2 font-semibold text-white bg-[#1976d2] rounded-es-lg '>Id</td>
                                            <td className='px-2 py-1  '>Product 2, Product 5, Product 8, Product 14 </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>


                </div>
            </>
        </div>
    )
}
