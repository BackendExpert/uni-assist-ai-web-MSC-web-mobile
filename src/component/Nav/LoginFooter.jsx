import React from "react";
import { FaShieldAlt, FaLock, FaUniversalAccess } from "react-icons/fa";

const LoginFooter = () => {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Copyright */}
                    <div className="text-center md:text-left">

                        <h1 className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                            © {new Date().getFullYear()} 
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                {" "}UniAiAssist
                            </span>
                            . All Rights Reserved.
                        </h1>

                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Empowering intelligent education through AI technology.
                        </p>

                    </div>


                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">

                        <a
                            href=""
                            className="group flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FaShieldAlt className="group-hover:scale-110 transition" />
                            Privacy Policy
                        </a>


                        <a
                            href=""
                            className="group flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FaLock className="group-hover:scale-110 transition" />
                            Security Standards
                        </a>


                        <a
                            href=""
                            className="group flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FaUniversalAccess className="group-hover:scale-110 transition" />
                            Accessibility
                        </a>

                    </div>

                </div>


                {/* Bottom line */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 text-center">

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Built with ❤️ for students, researchers, and educators worldwide.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default LoginFooter;