import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import { getcompanyId, getuserId } from '../api/data'
import { getToken } from '../api/token'
import { DataSets } from '../components/manageCompany/dataSets'
import { Flow } from '../components/manageCompany/flow'
import Teams from '../components/manageCompany/teams'
import Users from '../components/manageCompany/users'
import { VeiwDatasetsAndFlowsForTeam } from '../components/manageCompany/veiwDatasetANDFlowsForTeam'




export default function Manage_Company() {

    const [viewTab, SetViewTab] = useState('teams')
    const [teamSelected, SetTeamSelected] = useState('')
    const [teamID, SetTeamID] = useState(null)


    let URL = "https://127.0.0.1:8000/api/user/get_all_users_in_company"
    const config = {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'id': getuserId()
        },
        withCredentials: true
    }

    useEffect(() => {
        // console.log("first")
        //     api.get('/api/user/get_all_users_in_company')
        //         .then((res) => {
        //             console.log(res)
        //         })
        //         .catch((err) => {
        //             console.error(err)
        //         })

        // axios.
        //     post(URL,
        //         {},
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 Accept: "application/json",
        //                 Authorization: 'Bearer ' + getToken(),
        //                 userId: getuserId(),
        //                 companyId: getcompanyId(),
        //             }
        //         },
        //         withCredentials: true,

        //     )

        // axios.post(
        //     URL,
        //     {},
        //     config
        // )
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
    }, [])
    return (
        <>
            <div className='flex w-full bg-slate-50 py-3 px-7 space-x-7 shadow-md' >
                <button className={`font-[520] py-1    ${viewTab === 'teams' && 'border-b-2 border-blue-500'} `}
                    onClick={() => {
                        SetTeamSelected('')
                        SetViewTab('teams')
                    }}>Teams</button>

                <button className={`font-[520] py-1    ${viewTab === 'users' && 'border-b-2 border-blue-500'} `}
                    onClick={() => {
                        SetTeamSelected('')
                        SetViewTab('users')
                    }}>Users</button>
                <button className={`font-[520] py-1    ${viewTab === 'dataSets' && 'border-b-2 border-blue-500'} `}
                    onClick={() => {
                        SetTeamSelected('')
                        SetViewTab('dataSets')
                    }}>DataSets</button>
                <button className={`font-[520] py-1    ${viewTab === 'flow' && 'border-b-2 border-blue-500'} `}
                    onClick={() => {
                        SetTeamSelected('')
                        SetViewTab('flow')
                    }}>Flows</button>
            </div>

            {/* {
                viewTab === 'teams' ?
                    <>
                        {teamSelected === '' ?
                            <Teams SetTeamSelected={SetTeamSelected} SetTeamID={SetTeamID} />
                            :
                            <Users teamSelected={teamSelected} teamID={teamID} />
                        }
                    </>
                    :
                    <Users />
            } */}

            {(() => {
                switch (viewTab) {
                    case 'teams':
                        return <>
                            {
                                teamSelected === '' ?
                                    <Teams SetTeamSelected={SetTeamSelected} SetTeamID={SetTeamID} />
                                    :
                                    <>
                                        <Users teamSelected={teamSelected} teamID={teamID} />
                                        <VeiwDatasetsAndFlowsForTeam teamSelected={teamSelected} teamID={teamID} />
                                    </>
                            }
                        </>

                    case 'users':
                        return <Users />
                    case 'dataSets':
                        return <DataSets />
                    case 'flow':
                        return <Flow />
                }
            })()}

        </>
    )
}
