import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import CountDataAdmin from './DashHome/CountDataAdmin'
import { FaClock } from 'react-icons/fa'
import CountDataUser from './DashHome/CountDataUser'
import AuditLogs from './DashHome/AuditLogs'
import PieChart from './components/charts/PieChart'
import UsersChart from './DashHome/AdminCharts/UsersChart'
import AnnounsmentChart from './DashHome/AdminCharts/AnnounsmentChart'
import AnnounsmentsPie from './DashHome/AdminCharts/AnnounsmentsPie'

const DashHome = () => {
    const { auth } = useAuth()
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
            <div className="xl:flex">
                <div className="xl:w-3/4 md:mr-4 mr-0 xl:mb-0 mb-6">
                    {
                        auth?.role === 'admin' ?
                            <div className="">
                                <CountDataAdmin />
                            </div>
                            :
                            <div className="">
                                <CountDataUser />
                            </div>
                    }
                    <div className="mt-6">
                        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
                            <div>
                                {
                                    auth?.role === 'admin' ? (
                                        <div>
                                            <UsersChart />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>

                            <div>
                                {
                                    auth?.role === 'admin' ? (
                                        <div>
                                            <AnnounsmentChart />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>

                            <div>
                                {
                                    auth?.role === 'admin' ? (
                                        <div>
                                            <AnnounsmentsPie />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className="xl:w-1/4 mr-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-5 rounded-xl text-white flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80 font-medium">
                                Current Time
                            </p>

                            <h2 className="text-3xl font-bold mt-1">
                                {time.toLocaleTimeString()}
                            </h2>

                            <p className="text-xs opacity-80 mt-2">
                                {time.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </p>
                        </div>

                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <FaClock className="text-3xl" />
                        </div>
                    </div>

                    <div className="">
                        {
                            auth?.role === 'admin' ?
                                <div className="">
                                    <AuditLogs />
                                </div>
                                :
                                <div className=""></div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashHome