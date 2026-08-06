import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaBookOpen, FaLayerGroup, FaList, FaRegCommentDots, FaRegIdBadge } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import DefaultButton from '../../../component/Buttons/DefaultButton';

const Plans = () => {
    const token = localStorage.getItem('access_token')
    const [plans, setPlans] = useState([])
    const [visibletype, setVisibletype] = useState("grid")

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const plansPerPage = 6

    useEffect(() => {
        const fetchplans = async () => {
            const res = await API.get('/plan/fetch-plans', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success === true) {
                setPlans(res.data.result)
            }
        }

        if (token) fetchplans()
    }, [token])

    const visibletypeheadle = (v_type) => {
        setVisibletype(v_type)
    }

    const filteredPlans = plans.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredPlans.length / plansPerPage)

    const paginatedPlans = filteredPlans.slice(
        (currentPage - 1) * plansPerPage,
        currentPage * plansPerPage
    )
    return (
        <div>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex justify-between">
                    <div className="">
                        <h1 className="text-2xl font-bold text-[#2563EB]">
                            All Plans
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Explore and manage all your generated learning and development plans.
                        </p>

                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Search plans by title..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="w-full md:w-80 px-4 py-2 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-xl">
                            <div
                                className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${visibletype === "grid"
                                    ? "bg-[#2563EB] text-white"
                                    : "text-gray-500 hover:bg-white"
                                    }`}
                                onClick={() => visibletypeheadle('grid')}
                            >
                                <FaList className="h-6 w-6" />
                            </div>

                            <div
                                className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${visibletype === "list"
                                    ? "bg-[#2563EB] text-white"
                                    : "text-gray-500 hover:bg-white"
                                    }`}
                                onClick={() => visibletypeheadle('list')}
                            >
                                <MdDashboard className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${visibletype === 'grid' ? 'grid md:grid-cols-3 gap-4' : ''}`}>
                {
                    paginatedPlans.map((data, index) => {
                        return (
                            visibletype === "grid" ? (
                                <div
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-100"
                                    key={index}
                                >
                                    <div className="mb-5">
                                        <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                            <FaBookOpen className="text-[#2563EB] h-10 w-10" />
                                        </div>

                                        <h1 className="text-xl font-bold text-[#2563EB]">
                                            {data.title}
                                        </h1>

                                        <p className="text-gray-500 mt-3 leading-7">
                                            {data.desc}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                                                <FaLayerGroup />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold">
                                                    PLAN TYPE
                                                </p>
                                                <p className="text-[#2563EB] font-semibold">
                                                    {data.plan_type}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                                                <FaRegCommentDots />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold">
                                                    USER PROMPT
                                                </p>
                                                <p className="text-gray-700 mt-1">
                                                    {data.user_prompt?.length > 150
                                                        ? `${data.user_prompt.slice(0, 150)}...`
                                                        : data.user_prompt}
                                                </p>
                                            </div>
                                        </div>

                                        <a href={`/dashboard/plan/view-plan/${data._id}`}>
                                            <DefaultButton
                                                type="button"
                                                label="View Plan"
                                            />
                                        </a>


                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-blue-100 mb-4 md:flex items-center justify-between"
                                    key={index}
                                >
                                    <div className="md:flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <FaBookOpen className="text-[#2563EB] h-8 w-8" />
                                        </div>

                                        <div>
                                            <h1 className="text-xl font-bold text-[#2563EB]">
                                                {data.title}
                                            </h1>

                                            <p className="text-gray-500 mt-1">
                                                {data.desc}
                                            </p>

                                            <div className="md:flex gap-3 mt-3">
                                                <p className="bg-blue-50 text-[#2563EB] px-3 py-1 rounded-lg text-sm font-semibold">
                                                    {data.plan_type}
                                                </p>

                                                <p className="bg-blue-50 text-gray-600 px-3 py-1 rounded-lg text-sm md:mt-0 mt-2">
                                                    {data.user_prompt?.slice(0, 50)}...
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-1/4 md:mt-0 mt-4">
                                        <DefaultButton
                                            type="button"
                                            label="View Plan"
                                        />
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
            <div className="flex justify-center items-center gap-2 mt-6">
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-lg transition-all ${currentPage === i + 1
                                ? "bg-[#2563EB] text-white"
                                : "bg-blue-50 text-[#2563EB] hover:bg-blue-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Plans