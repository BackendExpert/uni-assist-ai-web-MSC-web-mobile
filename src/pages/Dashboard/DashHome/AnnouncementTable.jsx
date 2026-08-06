import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

const AnnouncementTable = () => {
    const token = localStorage.getItem('access_token')
    const [announcements, setAnnouncements] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get("/announcements/fetch-announcements", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success === true) {
                    setAnnouncements(res.data.result || [])
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (token) {
            fetchAnnouncements()
        }
    }, [token])



    return (
        <div>
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                #
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Title
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Visibility
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {
                            announcements
                                .filter((data) => {
                                    if (auth?.role === "admin") {
                                        return true
                                    }

                                    return data.status !== "Unpublish"
                                })
                                .slice(0, 5)
                                .map((data, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {data.title}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                    {data.type_anno}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${data.status === "public"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {data.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {
                    announcements
                        .filter((data) => {
                            if (auth?.role === "admin") {
                                return true
                            }

                            return data.status !== "Unpublish"
                        })
                        .slice(0, 5)
                        .map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                #{index + 1}
                                            </p>

                                            <h3 className="mt-1 font-semibold text-gray-900">
                                                {data.title}
                                            </h3>
                                        </div>

                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${data.status === "public"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {data.status}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Type
                                        </span>

                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                            {data.type_anno}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default AnnouncementTable