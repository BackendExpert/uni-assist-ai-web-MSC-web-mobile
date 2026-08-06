import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaDatabase, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { BotIcon, Megaphone } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const CountDataAdmin = () => {
    const token = localStorage.getItem("access_token")
    const [users, setUsers] = useState([])
    const [resources, setResources] = useState([])
    const [announcements, setAnnouncements] = useState([])
    const [systemfiles, setSystemFiles] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchusers = async () => {
            const res = await API.get('/admin/fetch-users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setUsers(res.data.result)
            }
        }
        if (token) fetchusers()
    }, [token])

    useEffect(() => {
        const fetchresources = async () => {
            const res = await API.get('/resource/fetch-public-resources', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (res.data.success === true) {
                setResources(res.data.result)
            }
        }

        if (token) fetchresources()
    }, [token])

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get('/announcements/fetch-announcements', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success) {
                    setAnnouncements(res.data.result)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (token) {
            fetchAnnouncements()
        }
    }, [token])

    useEffect(() => {
        const fetchsystemfiles = async (e) => {
            const res = await API.get('/admin/fetch-system-files',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.data.success === true) {
                setSystemFiles(res.data.result)
            }
        }

        if (token) fetchsystemfiles()
    }, [token])

    const cardData = [
        {
            id: 1,
            name: "Admins",
            countdata: users.filter(
                (user) => user.role?.role === "admin"
            ).length,
            icon: FaUsers,
            subtext: 'Total registered users'
        },
        {
            id: 2,
            name: "Students",
            countdata: users.filter(
                (user) => user.role?.role === "student"
            ).length,
            icon: FaUserGraduate,
            subtext: 'Total registered users'
        },
        {
            id: 3,
            name: "Resources",
            countdata: resources.length,
            icon: FaDatabase,
            subtext: 'Total Stored Resources'
        },
        {
            id: 4,
            name: "Announcements",
            countdata: announcements.length,
            icon: Megaphone,
            subtext: 'Total Announcements'
        },
        {
            id: 5,
            name: "System file Chunks",
            countdata: systemfiles.length,
            icon: BotIcon,
            subtext: 'Total Chatbot Chunks'
        }
    ];


    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5 xl:mb-0 mb-6">
                <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl text-white border border-blue-500 transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Welcome Back 👋
                            </h1>

                            <p className="text-sm text-blue-100 mt-2">
                                {auth?.user?.email}
                            </p>

                            <p className="text-xs text-blue-200 mt-1">
                                Have a great day! Manage your dashboard activities here.
                            </p>
                        </div>

                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                            <FaUsers className="text-3xl text-white" />
                        </div>
                    </div>
                </div>
                {
                    cardData.map((data, index) => {
                        const Icon = data.icon;
                        return (
                            <div
                                className="bg-white border border-gray-200 p-5 rounded-xl flex items-center justify-between hover:border-blue-300 transition-all duration-300"
                                key={index}
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        {data.name}
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {data.countdata}
                                    </h2>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {data.subtext}
                                    </p>
                                </div>

                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <Icon className="text-2xl" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CountDataAdmin