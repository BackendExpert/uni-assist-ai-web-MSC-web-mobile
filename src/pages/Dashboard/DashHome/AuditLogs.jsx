import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import API from '../../../services/api'
import { FaUser } from 'react-icons/fa'
import { MdOutlineContentPasteSearch } from "react-icons/md";

const AuditLogs = () => {
    const token = localStorage.getItem("access_token")
    const { auth } = useAuth()
    const [auditlogs, setAuditlogs] = useState([])

    useEffect(() => {
        const fetchallauditlogs = async () => {
            const res = await API.get('/admin/fetch-auditlogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                // console.log(res.data.result)
                setAuditlogs(res.data.result || [])
            }
        }
        if (token) {
            fetchallauditlogs()
        }
    }, [token])

    const user = auditlogs.user
    return (
        <div className='bg-white p-4 sm:p-5 rounded-xl border border-gray-200 mt-6 w-full overflow-hidden'>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                Recent Audit Activities
            </h2>

            <div className="space-y-4">
                {
                    [...auditlogs]
                        .slice(-6)
                        .reverse()
                        .map((data, index) => {
                            return (
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100"
                                    key={index}
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <MdOutlineContentPasteSearch className="text-xl sm:text-2xl" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h1 className="text-sm font-semibold text-gray-800 break-words">
                                            {data.action}
                                        </h1>

                                        <p className="text-xs text-gray-500 mt-1 break-all">
                                            {data.user?.email || "Unknown User"}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(data.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="text-xs text-gray-400 sm:self-center">
                                        #{index + 1}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default AuditLogs