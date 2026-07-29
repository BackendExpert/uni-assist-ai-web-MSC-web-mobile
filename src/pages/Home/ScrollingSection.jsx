import React from 'react'
import {
    FaBuilding,
    FaLaptopCode,
    FaGlobe,
    FaServer,
    FaCloud,
    FaMicrochip,
    FaDatabase,
    FaShieldAlt
} from 'react-icons/fa'

const ScrollingSection = () => {
    const menus = [
        { id: 1, name: 'NovaTech Solutions', icon: FaLaptopCode },
        { id: 2, name: 'SkyBridge Systems', icon: FaCloud },
        { id: 3, name: 'Vertex Innovations', icon: FaMicrochip },
        { id: 4, name: 'BluePeak Digital', icon: FaGlobe },
        { id: 5, name: 'Quantum Networks', icon: FaServer },
        { id: 6, name: 'FutureCore Labs', icon: FaDatabase },
        { id: 7, name: 'PrimeSecure Tech', icon: FaShieldAlt },
        { id: 8, name: 'NexusWorks', icon: FaBuilding },
        { id: 9, name: 'CodeSphere', icon: FaLaptopCode },
        { id: 10, name: 'CloudVista', icon: FaCloud },
    ]

    return (
        <section className="bg-gray-100 dark:bg-slate-900 py-10 md:py-16 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-8 md:mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-semibold">
                        Trusted Collaboration
                    </span>

                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-4">
                        Industry Partners
                    </h2>

                    <p className="text-gray-600 dark:text-slate-300 mt-4 max-w-3xl mx-auto text-sm md:text-lg leading-7">
                        Collaborating with innovative technology companies to
                        provide students with practical industry exposure.
                    </p>
                </div>

                <div className="relative overflow-hidden">

                    <div className="absolute left-0 top-0 h-full w-10 md:w-24 bg-gradient-to-r from-gray-100 dark:from-slate-900 to-transparent z-10"></div>

                    <div className="absolute right-0 top-0 h-full w-10 md:w-24 bg-gradient-to-l from-gray-100 dark:from-slate-900 to-transparent z-10"></div>

                    <div className="flex w-max animate-marquee">

                        {[...menus, ...menus].map((item, index) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 md:gap-5 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 mx-2 md:mx-4 px-4 md:px-7 py-4 md:py-5 min-w-[180px] md:min-w-[280px] transition-colors duration-300"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Icon className="text-white text-lg md:text-2xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm md:text-xl font-bold text-slate-800 dark:text-white">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                                            Industry Partner
                                        </p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>
        </section>
    )
}

export default ScrollingSection