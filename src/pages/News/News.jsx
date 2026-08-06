import React, { useEffect, useState } from "react"
import {
    FaNewspaper,
    FaSearch,
    FaBullhorn,
    FaInfoCircle,
    FaCalendarAlt
} from "react-icons/fa"
import axios from "axios"

const News = () => {
    const [news, setNews] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_APP_API}/announcements/fetch-public-announcement`
                )

                if (res.data.success === true) {

                    const formattedNews = res.data.result
                        .filter((item) => item.status === "Publish-Public")
                        .map((item) => ({
                            id: item._id,
                            name: item.title,
                            desc: item.desc,
                            category: item.type_anno,
                            date: item.createdAt,
                            icon: FaInfoCircle
                        }))

                    setNews(formattedNews)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchNews()
    }, [])


    const filteredData = news.filter((item) => {

        const matchCategory =
            category === "All" || item.category === category

        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase())

        return matchCategory && matchSearch
    })


    return (
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-3 rounded-full bg-blue-100 dark:bg-blue-900/40 px-5 py-2 text-blue-600 dark:text-blue-300 font-semibold">
                        <FaNewspaper />
                        Latest Updates
                    </div>

                    <h1 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        University News &
                        <span className="text-blue-600 dark:text-blue-400">
                            {" "}Announcements
                        </span>
                    </h1>

                    <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Stay connected with academic milestones, campus events,
                        and important university updates.
                    </p>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-lg">

                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search announcements..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {
                            [
                                "All",
                                "Academics",
                                "Campus Life",
                                "Admissions",
                                "Administrative",
                                "Research"
                            ].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${category === item
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    {
                        filteredData.length > 0 ? (
                            filteredData.map((item) => {

                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.id}
                                        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Icon className="text-2xl" />
                                        </div>

                                        <p className="mt-5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                            {item.category}
                                        </p>

                                        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                                            {item.name}
                                        </h2>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 line-clamp-4">
                                            {item.desc}
                                        </p>

                                        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                                            <FaCalendarAlt />
                                            {new Date(item.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="md:col-span-3 py-20 text-center">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    No announcements found
                                </h2>

                                <p className="mt-2 text-slate-500 dark:text-slate-400">
                                    Try another search or category.
                                </p>
                            </div>
                        )
                    }
                </div>

            </div>
        </section>
    )
}

export default News