import React, { useEffect, useState } from 'react'
// import ReactApexChart from 'react-apexcharts'
// import Chart from "react-apexcharts";
// import aprioriload from '../../img/aprioriload.gif'
import { useDispatch, useSelector } from 'react-redux'
// import { deletedata } from '../../redux/flowData'
// import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
// import forWardArrow from '../../img/forWardArrow.png';
// import { Slide } from "react-awesome-reveal";
// import prod1 from '../../img/products.gif'
// import prod2 from '../../img/products2.gif'
// import { Pagination, Tooltip } from '@mui/material';
// import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { Table } from '../../components/aprioriComp/table';



export default function ApResult() {
    const data = useSelector(state => state.flowdata.flow_Data[0])
    const result = data.result

    //bagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(50);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = result.slice(firstPostIndex, lastPostIndex);

    let pages = [];

    for (let i = 1; i <= Math.ceil(result.length / postsPerPage); i++) {
        pages.push(i);
    }

    const dispatch = useDispatch()

    console.log(data)


    // useEffect(() => () => dispatch(deletedata()), []);
    return (
        <>
            <div className='px-4 pt-7 space-y-8'>
                <h1>Used Algorithm:<span className='font-bold'> {data.algorithm}</span></h1>
               
               <Table result={result}/>
              
            </div>
        </>
    )
}

{/* <p className='px-1'>{rule.antecedents.map((map) => (<p>{map} </p>))}</p>
<p className='px-1'> =={'>'} </p>
<p className='px-1'>{rule.consequents.map((map) => (<p>{map} </p>))}</p>
<p className='px-1'>support{rule.support}</p> */}