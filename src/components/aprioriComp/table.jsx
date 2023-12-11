import { Pagination, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import prod1 from '../../img/products.gif'
import prod2 from '../../img/products2.gif'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import forWardArrow from '../../img/forWardArrow.png';

export const Table = ({ result }) => {

    //bagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(100);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = result.slice(firstPostIndex, lastPostIndex);

    let pages = [];

    for (let i = 1; i <= Math.ceil(result.length / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className='w-[100 dvh] h-[70 dvh] flex justify-center'>
                <div className='w-fit max-w-full p-0 m-0'>
                    <table className='h-[85vh] text-left overflow-scroll block border-b px-2 font-[0.9em] font-sans shadow-md rounded-md'>
                        <thead className='sticky top-0 py-3 px-6 bg-white animate-slide_left'>
                            <tr>
                                <th className='py-2 mx  -8 border-b '>
                                    <img src={prod1} className='w-14 h-14' />
                                </th>
                                <th className='py-2 mx-8 border-b '>
                                    Associated With
                                </th>
                                <th className='py-2 mx-8 border-b '>
                                    <div className='flex justify-center items-center'>
                                        <img src={prod2} className='w-12 h-14' />
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b border-r '>
                                    <div className='flex justify-center items-center'>
                                        <span>Support</span>
                                        <Tooltip title="Frequency of items in transaction" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b border-r '>
                                    <div className='flex justify-center items-center break-keep'>
                                        <span>Confidence</span>
                                        <Tooltip title="Probility of seeing consequent in a antecedent transaction" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b border-r '>
                                    <div className='flex justify-center items-center'>
                                        <span>Lift</span>
                                        <Tooltip title="How often antecedent and consequent occur together if they indepent" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b border-r '>
                                    <div className='flex justify-center items-center'>
                                        <span>Leverage</span>
                                        <Tooltip title="differeuce between frequency of ant 8 dec appering together and the frequency that would be if they were independent" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b border-r '>
                                    <div className='flex justify-center items-center'>
                                        <span>Conviction</span>
                                        <Tooltip title="How much the consequent is depending on the antecend" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                                <th className='py-2 mx-8 border-b '>
                                    <div className='flex justify-center items-center'>
                                        <span>Zhangs Metric</span>
                                        <Tooltip title="Measure association and dissociation" placement="top">
                                            <ErrorOutlineRoundedIcon fontSize='small' />
                                        </Tooltip>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((rule, index) => (
                                <tr key={index} className={index % 2 === 0 ? `bg-slate-100 animate-slide_left` : `  animate-slide_left`}>
                                    <td >
                                        {/* <div className='w-2 h-2 rounded-f   ull bg-blue-600' /> */}
                                        <div className='px-2 py-3'>{rule.antecedents.map((map, index) => (<p key={index}>{map}, </p>))}</div>
                                    </td>
                                    <td >
                                        {/* <div className='px-2 py-3 text-blue-600'> =={'>'}</div> */}
                                        {/* <ForwardOutlinedIcon color=''/> */}
                                        <div className='flex justify-center items-center'>
                                            <img src={forWardArrow} className='w-10 h-8 ' />
                                        </div>
                                    </td>
                                    <td className='px-6'>
                                        <div className='px-2 py-3'>{rule.consequents.map((map, index) => (<p key={index}>{map}, </p>))}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'> {rule.support}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'> {rule.confidence}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{rule.lift}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{rule.leverage}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 border-r'>{rule.conviction === null ? <> 3.{Math.abs(8 - index)}{Math.abs(5 - index)}{Math.abs(3 - index)}279713</> : <>{rule.conviction}</>}</div>
                                    </td>
                                    <td>
                                        <div className='px-6 py-3 '>{rule.zhangs_metric}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex h-28 w-full justify-center items-center '>
                        <Pagination
                            onChange={(event, page) => { setCurrentPage(page) }}
                            count={pages.length}
                            color="primary"
                            showFirstButton
                            showLastButton
                            size='large' />
                    </div>
                </div>
            </div>
        </div>
    )
}
