import React from 'react'
import {
    FaGraduationCap,
    FaArrowRight,
    FaPlay,
    FaUsers,
    FaAward,
    FaBookOpen
} from 'react-icons/fa'
import HeroImg from '../../assets/Hero.svg'

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-100 dark:bg-blue-900/30 blur-3xl opacity-60"></div>
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-100 dark:bg-indigo-900/30 blur-3xl opacity-60"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div>

                        <div className="inline-flex items-center gap-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 rounded-full px-5 py-3 font-semibold">
                            <FaGraduationCap />
                            Empowering Global Innovators Since 2000
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black leading-tight mt-8 text-slate-900 dark:text-white">
                            Defining the
                            <span className="text-blue-600"> Future </span>
                            of
                            <span className="text-blue-600"> Education</span>
                        </h1>

                        <p className="text-xl text-slate-600 leading-9 mt-8 max-w-2xl">
                            Experience a smarter way to learn with AI-powered education,
                            world-class faculty, innovative research, and a vibrant global
                            community preparing tomorrow's leaders.
                        </p>

                        <div className="flex flex-wrap gap-5 mt-10">

                            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold shadow-xl hover:-translate-y-1">
                                Explore Programs
                                <FaArrowRight />
                            </button>

                            <button className="border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 px-8 py-4 rounded-xl flex items-center gap-3 font-semibold">
                                <FaPlay />
                                Watch Video
                            </button>

                        </div>

                        <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mt-16">

                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                                <FaUsers className="text-blue-600 text-3xl mb-4" />
                                <h3 className="text-3xl font-black">35K+</h3>
                                <p className="text-slate-500 mt-2">
                                    Students
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                                <FaAward className="text-blue-600 text-3xl mb-4" />
                                <h3 className="text-3xl font-black">250+</h3>
                                <p className="text-slate-500 mt-2">
                                    Awards
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                                <FaBookOpen className="text-blue-600 text-3xl mb-4" />
                                <h3 className="text-3xl font-black">150+</h3>
                                <p className="text-slate-500 mt-2">
                                    Courses
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="relative md:block hidden">
                        <div className="p-8 ">
                            <img
                                src={HeroImg}
                                alt="Hero"
                                className="w-full drop-shadow-2xl"
                            />
                        </div>
                        <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl px-6 py-5">
                            <p className="text-slate-500 text-sm">
                                Graduate Success
                            </p>

                            <h2 className="text-4xl font-black text-blue-600 mt-1">
                                98%
                            </h2>
                        </div>

                        <div className="absolute bottom-8 -right-8 bg-blue-600 rounded-2xl text-white px-8 py-6 shadow-2xl">
                            <p className="text-sm opacity-80">
                                QS World Ranking
                            </p>

                            <h2 className="text-4xl font-black mt-1">
                                #12
                            </h2>
                        </div>



                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero