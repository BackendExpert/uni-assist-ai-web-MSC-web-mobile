import React from 'react'
import {
    FaBullseye,
    FaEye,
    FaGraduationCap,
    FaGlobeAsia,
    FaRobot,
    FaUsers
} from 'react-icons/fa'

const Aboutus = () => {
    return (
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-24 transition-colors duration-300">            <div className="max-w-7xl mx-auto px-6">

            <div className="text-center max-w-4xl mx-auto">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold px-5 py-2 rounded-full">
                    About UniAiAssist
                </span>

                <h1 className="text-5xl font-black text-slate-900 dark:text-white mt-6 leading-tight">
                    Transforming Higher Education Through
                    <span className="text-blue-600"> Artificial Intelligence</span>
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-300 mt-8 leading-9">
                    UniAiAssist is an intelligent academic platform designed to enhance
                    the university experience for students, lecturers, and administrators.
                    By combining AI-powered assistance with modern educational practices,
                    we provide instant access to academic resources, personalized learning
                    support, campus services, and data-driven insights that empower every
                    learner to achieve their full potential.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-20">

                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-10 hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl">
                        <FaBullseye />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-8">
                        Our Mission
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 leading-8 mt-5">
                        To empower students with intelligent learning tools that simplify
                        education, improve academic performance, encourage collaboration,
                        and provide equal opportunities for quality education through
                        innovative AI technology.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-10 hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl">
                        <FaEye />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-8">
                        Our Vision
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 leading-8 mt-5">
                        To become the world's leading AI-powered university platform by
                        creating smarter campuses where technology supports learning,
                        enhances research, and enables students to succeed in an
                        increasingly digital future.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl text-white p-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                        <FaRobot />
                    </div>

                    <h2 className="text-3xl font-bold mt-8">
                        Why UniAiAssist?
                    </h2>

                    <p className="leading-8 mt-5 text-blue-100">
                        Our platform combines artificial intelligence, modern educational
                        technology, and user-centered design to deliver a seamless learning
                        experience that supports students from enrollment to graduation.
                    </p>
                </div>

            </div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-8 mt-20">

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 text-center transition-colors">
                    <FaGraduationCap className="text-5xl text-blue-600 mx-auto" />

                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-6">
                        35K+
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Active Students
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 text-center transition-colors">
                    <FaUsers className="text-5xl text-blue-600 mx-auto" />

                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-6">
                        1,200+
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Academic Staff
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 text-center transition-colors">
                    <FaGlobeAsia className="text-5xl text-blue-600 mx-auto" />

                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-6">
                        50+
                    </h3>

                    <p className="text-slate-500 mt-2">
                        Partner Institutions
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 text-center transition-colors">
                    <FaRobot className="text-5xl text-blue-600 mx-auto" />

                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-6">
                        24/7
                    </h3>

                    <p className="text-slate-500 mt-2">
                        AI Learning Support
                    </p>
                </div>

            </div>

        </div>
        </section>
    )
}

export default Aboutus