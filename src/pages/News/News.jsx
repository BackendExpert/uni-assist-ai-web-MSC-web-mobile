import React, { useEffect, useState } from "react";
import {
    FaBookOpen,
    FaUsers,
    FaUserGraduate,
    FaCalendarAlt,
    FaNewspaper,
    FaSearch
} from "react-icons/fa";

import {
    FaSatellite,
    FaBuilding,
    FaBullhorn,
} from "react-icons/fa6";

import Hero from '../../assets/uniImg.jpg'

const News = () => {
    const dummyData = [
        {
            id: 1,
            image: Hero,
            category: "Research",
            name: "New Interdisciplinary Research Wing Opens",
            desc: "UniAiAssist University has officially opened its new interdisciplinary research center, featuring advanced laboratories for Artificial Intelligence, Robotics, Sustainable Engineering, and Data Science. The facility will support collaborative projects between students and faculty members.",
            icon: FaSatellite,
            date: "2026-07-22",
        },
        {
            id: 2,
            image: "",
            category: "Research",
            name: "Faculty Receives International AI Research Grant",
            desc: "The Faculty of Computing has secured a multi-year international research grant to develop ethical AI solutions for higher education. Undergraduate and postgraduate students will have opportunities to participate in the project.",
            icon: FaSatellite,
            date: "2026-07-15",
        },

        {
            id: 3,
            image: "",
            category: "Academics",
            name: "Semester Registration Opens for Fall Intake",
            desc: "Students can now register for Semester 2 courses through the Student Portal. Academic advisors are available to assist with module selection and timetable planning throughout the registration period.",
            icon: FaBookOpen,
            date: "2026-07-20",
        },
        {
            id: 4,
            image: Hero,
            category: "Academics",
            name: "New Data Science Degree Curriculum Introduced",
            desc: "The university has launched an updated Data Science curriculum featuring practical AI, cloud computing, cybersecurity, and machine learning modules aligned with current industry standards.",
            icon: FaBookOpen,
            date: "2026-07-12",
        },

        {
            id: 5,
            image: "",
            category: "Campus Life",
            name: "Annual Student Innovation Festival Announced",
            desc: "The Student Union has announced the Annual Innovation Festival, where students can showcase technology projects, startup ideas, and creative research with prizes sponsored by industry partners.",
            icon: FaUsers,
            date: "2026-07-18",
        },
        {
            id: 6,
            image: Hero,
            category: "Campus Life",
            name: "New Student Recreation Center Opens",
            desc: "A modern recreation center featuring indoor sports facilities, fitness equipment, collaborative study spaces, and wellness programs is now available to all enrolled students.",
            icon: FaUsers,
            date: "2026-07-10",
        },

        {
            id: 7,
            image: "",
            category: "Admissions",
            name: "Applications Now Open for 2027 Intake",
            desc: "Applications are officially open for undergraduate and postgraduate programs. Prospective students can submit applications online and explore available scholarships and financial aid opportunities.",
            icon: FaUserGraduate,
            date: "2026-07-25",
        },
        {
            id: 8,
            image: "",
            category: "Admissions",
            name: "International Student Scholarship Program Expanded",
            desc: "The university has increased scholarship opportunities for international applicants, offering tuition assistance based on academic excellence and leadership achievements.",
            icon: FaUserGraduate,
            date: "2026-07-14",
        },

        {
            id: 9,
            image: "",
            category: "Events",
            name: "Global Tech Summit 2026 Coming to Campus",
            desc: "Industry leaders, researchers, and students will gather for the Global Tech Summit featuring keynote sessions, workshops, networking opportunities, and technology exhibitions.",
            icon: FaCalendarAlt,
            date: "2026-07-21",
        },
        {
            id: 10,
            image: "",
            category: "Events",
            name: "Career Fair Connects Students with Top Employers",
            desc: "More than 100 leading companies will participate in the university's annual Career Fair, offering internships, graduate programs, and full-time employment opportunities.",
            icon: FaCalendarAlt,
            date: "2026-07-08",
        },
    ];


    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredData = dummyData.filter((item) => {
        const matchCategory =
            category === "All" || item.category === category;

        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="max-w-4xl">

                    <div className="inline-flex items-center gap-3 rounded-full bg-blue-100 dark:bg-blue-900/30 px-5 py-2 text-blue-600 dark:text-blue-300 font-semibold">
                        <FaNewspaper />
                        Latest Updates
                    </div>

                    <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white">
                        University News &
                        <span className="text-blue-600 dark:text-blue-400">
                            {" "}Announcements
                        </span>
                    </h1>

                    <p className="max-w-3xl text-lg leading-9 text-slate-600 dark:text-slate-300">
                        Stay connected with academic milestones, campus events,
                        and essential updates for the UniAssistAI University
                        community.
                    </p>
                </div>

                <div className="pt-8">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-md transition-colors duration-300">

                        <div className="flex flex-col gap-5">

                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                                <input
                                    type="text"
                                    placeholder="Search news and updates..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={() => setCategory("All")}
                                    className={`rounded-full px-5 py-2 transition ${category === "All"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`}
                                >
                                    All
                                </button>

                                <button
                                    onClick={() => setCategory("Academics")}
                                    className={`rounded-full px-5 py-2 transition ${category === "Academics"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`}
                                >
                                    Academics
                                </button>

                                <button
                                    onClick={() => setCategory("Campus Life")}
                                    className={`rounded-full px-5 py-2 transition ${category === "Campus Life"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`}
                                >
                                    Campus Life
                                </button>

                                <button
                                    onClick={() => setCategory("Admissions")}
                                    className={`rounded-full px-5 py-2 transition ${category === "Admissions"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`} >
                                    Admissions
                                </button>

                                <button
                                    onClick={() => setCategory("Administrative")}
                                    className={`rounded-full px-5 py-2 transition ${category === "Administrative"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`} >
                                    Administrative
                                </button>

                                <button onClick={() => setCategory("Research")}
                                    className={`rounded-full px-5 py-2 transition ${category === "Research"
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                                        }`} >
                                    Research
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="mt-10 space-y-10">

                    {filteredData.length === 0 ? (
                        <div className="py-20 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                No news found
                            </h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Try another search or category.
                            </p>
                        </div>
                    ) : (

                        <>

                            {filteredData[0] && (
                                <div className="grid lg:grid-cols-3 gap-8">

                                    <div className="lg:col-span-2 overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl shadow-gray-200/40 dark:shadow-black/30">

                                        <div className="relative h-[460px]">

                                            {filteredData[0].image ? (
                                                <img
                                                    src={filteredData[0].image}
                                                    alt={filteredData[0].name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                                                    {React.createElement(filteredData[0].icon, {
                                                        className: "text-8xl text-white"
                                                    })}
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                            <div className="absolute bottom-0 p-8 text-white">

                                                <div className="flex items-center gap-3 text-blue-300 font-semibold">
                                                    {React.createElement(filteredData[0].icon)}
                                                    {filteredData[0].category}
                                                </div>

                                                <h2 className="mt-4 text-4xl font-black">
                                                    {filteredData[0].name}
                                                </h2>

                                                <p className="mt-4 text-gray-200 leading-7 line-clamp-3">
                                                    {filteredData[0].desc}
                                                </p>

                                                <p className="mt-5 text-sm text-gray-300">
                                                    {filteredData[0].date}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {filteredData[1] && (
                                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

                                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                                                {React.createElement(filteredData[1].icon, {
                                                    className: "text-3xl"
                                                })}

                                            </div>


                                            <p className="mt-8 text-blue-100 font-semibold">
                                                {filteredData[1].category}
                                            </p>


                                            <h2 className="mt-3 text-3xl font-black">
                                                {filteredData[1].name}
                                            </h2>


                                            <p className="mt-5 text-blue-100 leading-8">
                                                {filteredData[1].desc}
                                            </p>


                                            <p className="mt-6 text-sm text-blue-200">
                                                {filteredData[1].date}
                                            </p>

                                        </div>
                                    )}

                                </div>
                            )}



                            <div className="grid md:grid-cols-3 gap-8">

                                {filteredData.slice(2, 5).map((news) => {

                                    const Icon = news.icon;

                                    return (

                                        <div
                                            key={news.id}
                                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-lg p-8"
                                        >

                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">

                                                <Icon className="text-3xl text-blue-600 dark:text-blue-400" />

                                            </div>


                                            <p className="mt-6 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                {news.category}
                                            </p>


                                            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                                                {news.name}
                                            </h2>


                                            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">
                                                {news.desc}
                                            </p>


                                        </div>

                                    )

                                })}

                            </div>



                            <div className="grid lg:grid-cols-2 gap-8">

                                {filteredData.slice(5, 7).map((news) => {

                                    const Icon = news.icon;

                                    return (

                                        <div
                                            key={news.id}
                                            className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-10 text-white shadow-xl"
                                        >

                                            <Icon className="text-6xl" />


                                            <h2 className="mt-6 text-3xl font-black">
                                                {news.name}
                                            </h2>


                                            <p className="mt-5 text-blue-100 leading-8">
                                                {news.desc}
                                            </p>


                                            <p className="mt-5 text-sm text-blue-200">
                                                {news.date}
                                            </p>

                                        </div>

                                    )

                                })}

                            </div>


                        </>

                    )}

                </div>
            </div>
        </section>
    );
};

export default News;