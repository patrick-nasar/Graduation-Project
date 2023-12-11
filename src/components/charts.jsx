import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import Chart from "react-apexcharts";

export default function Charts({ chartsData }) {


    const [xline, setXline] = useState([])
    const [yline, setYline] = useState([])

    const [xpie, setXpie] = useState([])
    const [ypie, setYpie] = useState([])

    const [xpyramid, setXpyramid] = useState([])
    const [ypramid, setYpyramid] = useState([])


    var lineChart = {
        options: {
            chart: {
                id: "basic-bar",
                foreColor: '#000000'
            },
            xaxis: {
                categories: xline
            },
            dataLabels: {
                enabled: false
            },
            // colors: ["#7E36AF"],
            colors: ["#1976d2"],

        },
        stroke: {
            curve: 'smooth'
        },
        series: [
            {
                name: "series-1",
                data: yline
            }
        ],
    }

    var pieChart = {
        series: ypie,
        options: {
            labels: xpie,
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
        stroke: {
            curve: 'smooth'
        },
    }

    const seriesPyramid = [{
        name: '',
        data: ypramid,
    }];

    const optionsPyramid = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                horizontal: true,
                distributed: true,
                barHeight: '80%',
                isFunnel: true,
            },
        },
        colors: ['#F44F5E', '#E55A89', '#D863B1', '#CA6CD8', '#B57BED', '#8D95EB', '#62ACEA', '#4BC3E6'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex]
            },
            dropShadow: {
                enabled: true,
            },
        },
        title: {
            text: 'Pyramid Chart',
            align: 'middle',
        },
        xaxis: {
            categories: xpyramid,
        },
        legend: {
            show: false,
        },
    };


    useEffect(() => {
        let barKeys = []
        let barValues = []

        let pieKeys = []
        let pieValues = []

        let pyramidKeys = []
        let pyramidValues = []


        for (let i = 0; i < chartsData.bar.length; i++) {
            let xbar = Object.keys(chartsData.bar[i])
            barKeys.push(xbar[0])

            let ybar = Object.values(chartsData.bar[i])
            barValues.push(ybar[0])

            let xpie = Object.keys(chartsData.pie[i])
            pieKeys.push(xpie[0])

            let ypie = Object.values(chartsData.pie[i])
            pieValues.push(ypie[0])

            let xpyramid = Object.keys(chartsData.pyramid[i])
            pyramidKeys.push(xpyramid[0])

            let ypyramid = Object.values(chartsData.pyramid[i])
            pyramidValues.push(ypyramid[0])
        }

        console.log('bar x', barKeys)
        console.log('bar y', barValues)

        console.log('pie x', pieKeys)
        console.log('pie y', pieValues)

        console.log('pyramid x', pyramidKeys)
        console.log('pyramid y', pyramidValues)



        setXline(barKeys)
        setYline(barValues)

        setXpie(pieKeys)
        setYpie(pieValues)

        setXpyramid(pyramidKeys)
        setYpyramid(pyramidValues)
    }, [])



    return (
        <>
            <div className='md:flex w-[100 dvh] pt-7 justify-evenly items-start ' >
                <div className='w-[80dvh] p-3'>
                    <Chart
                        options={lineChart.options}
                        series={lineChart.series}
                        type="bar"
                    // width="300"
                    />
                </div>
                <div className='w-[80dvh] p-3'>
                    <Chart
                        options={pieChart.options}
                        series={pieChart.series}
                        type="pie"
                    // width="300"
                    />
                </div>
            </div>
            <br></br>
            <div className='md:flex w-[100 dvh] justify-evenly items-start ' >
                <div className='w-[80dvh] '>
                    <Chart options={optionsPyramid} series={seriesPyramid} type="bar" height={350} />
                </div>
            </div>
            {/* <button onClick={()=>{
                console.log(xpyramid)
            }}>awdawdwavvv</button> */}
        </>
    )
}
