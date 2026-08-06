import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import ReactMarkdown from 'react-markdown'
import { FaCalendarAlt, FaBookOpen, FaRobot, FaUserEdit } from "react-icons/fa"
import Markdown from 'react-markdown'

const ViewFullPlan = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [plan, setPlan] = useState(null)

    useEffect(() => {
        const fetchPlan = async () => {
            const res = await API.get(`/plan/fetch-plan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setPlan(res.data.result)
            }
        }

        if (token) fetchPlan()
    }, [token, id])

    return (
        <div className="space-y-6">

            <div className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                        <FaBookOpen size={22} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {plan?.title}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {plan?.plan_type}
                        </p>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-5">

                    <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-600 mb-3">
                            <FaUserEdit />
                            <h2 className="font-semibold">
                                User Request
                            </h2>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            {plan?.user_prompt}
                        </p>
                    </div>


                    <div className="bg-gray-50 p-5 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-600 mb-3">
                            <FaRobot />
                            <h2 className="font-semibold">
                                Plan Summary
                            </h2>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            {plan?.desc}
                        </p>
                    </div>

                </div>
            </div>


            <div className="bg-white p-6 rounded-xl border border-gray-100">

                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                        <FaRobot size={22} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        AI Generated Development Plan
                    </h2>
                </div>


                <div className="prose prose-gray max-w-none">
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <Markdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                                        {children}
                                    </h1>
                                ),

                                h2: ({ children }) => (
                                    <h2 className="text-3xl font-bold text-indigo-600 mt-10 mb-5 pb-3 border-b border-gray-200">
                                        {children}
                                    </h2>
                                ),

                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
                                        {children}
                                    </h3>
                                ),

                                h4: ({ children }) => (
                                    <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
                                        {children}
                                    </h4>
                                ),

                                p: ({ children }) => (
                                    <p className="text-gray-600 leading-8 mb-5 text-[16px]">
                                        {children}
                                    </p>
                                ),

                                ul: ({ children }) => (
                                    <ul className="list-disc ml-7 space-y-2 mb-6 text-gray-700">
                                        {children}
                                    </ul>
                                ),

                                ol: ({ children }) => (
                                    <ol className="list-decimal ml-7 space-y-2 mb-6 text-gray-700">
                                        {children}
                                    </ol>
                                ),

                                li: ({ children }) => (
                                    <li className="leading-7">
                                        {children}
                                    </li>
                                ),

                                strong: ({ children }) => (
                                    <strong className="font-bold text-gray-900">
                                        {children}
                                    </strong>
                                ),

                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-indigo-500 pl-5 italic text-gray-600 my-6">
                                        {children}
                                    </blockquote>
                                ),

                                code: ({ children }) => (
                                    <code className="bg-gray-100 text-indigo-700 px-2 py-1 rounded text-sm">
                                        {children}
                                    </code>
                                ),

                                hr: () => (
                                    <hr className="my-8 border-gray-200" />
                                )
                            }}
                        >
                            {plan?.ai_plan}
                        </Markdown>
                    </div>

                </div>

            </div>


            <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-3">

                <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                    <FaCalendarAlt />
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Created Date
                    </p>

                    <p className="font-medium text-gray-800">
                        {plan?.createdAt
                            ? new Date(plan.createdAt).toLocaleString()
                            : ""
                        }
                    </p>
                </div>

            </div>

        </div>
    )
}

export default ViewFullPlan