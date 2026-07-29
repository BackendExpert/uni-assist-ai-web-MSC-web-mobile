import React from "react";
import {
    FaShieldAlt,
    FaUniversity,
    FaAddressBook,
} from "react-icons/fa";

const PagesFooter = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-black tracking-tight text-[#0052CC] dark:text-blue-400">
                            UniAiAssist
                        </h1>

                        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                            Empowering students through intelligent learning and
                            modern university services.
                        </p>

                        <p className="mt-3 text-sm text-gray-500 dark:text-slate-500">
                            © {new Date().getFullYear()} UniAiAssist. All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">

                        <a
                            href="#"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-3 text-gray-700 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        >
                            <FaShieldAlt />
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-3 text-gray-700 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        >
                            <FaUniversity />
                            University Standards
                        </a>

                        <a
                            href="#"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-3 text-gray-700 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        >
                            <FaAddressBook />
                            Directory
                        </a>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default PagesFooter;