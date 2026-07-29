import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DefaultButton from "../Buttons/DefaultButton";
import { useTheme } from "../../context/ThemeContext";

const Nav = () => {
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [showNav, setShowNav] = useState(true);

    const menu = [
        {
            id: 1,
            name: "Home",
            link: "/",
        },
        {
            id: 2,
            name: "News",
            link: "/news",
        },
    ];


    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setShowNav(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"
                }`}
        >            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <a
                        href="/"
                        className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0052CC] hover:scale-105 transition-transform duration-300"
                    >
                        UniAssistAI Helper
                    </a>

                    <nav className="hidden lg:flex items-center space-x-10">
                        {menu.map((data) => (
                            <a
                                key={data.id}
                                href={data.link}
                                className="relative font-medium text-gray-700 dark:text-white transition-all duration-300 hover:text-[#0052CC] dark:hover:text-blue-400 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#0052CC] after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {data.name}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">

                        <button
                            onClick={toggleTheme}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-xl transition hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>

                        <a
                            href="/login"
                            className="font-semibold text-[#0052CC] hover:text-[#0047B3] transition-colors duration-300 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Student Portal
                        </a>

                        <a href="/registation">
                            <DefaultButton
                                type="button"
                                label="Apply Now"
                            />
                        </a>

                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                    >
                        <motion.span
                            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="absolute w-6 h-0.5 bg-[#0052CC] rounded-full"
                        />

                        <motion.span
                            animate={open ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="absolute w-6 h-0.5 bg-[#0052CC] rounded-full"
                        />

                        <motion.span
                            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                            transition={{ duration: 0.25 }}
                            className="absolute w-6 h-0.5 bg-[#0052CC] rounded-full"
                        />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/20 lg:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-2xl lg:hidden"
                        >
                            <div className="px-5 py-6 flex flex-col gap-2">

                                {menu.map((data, index) => (
                                    <motion.a
                                        key={data.id}
                                        href={data.link}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{
                                            delay: index * 0.08,
                                            duration: 0.25,
                                        }}
                                        onClick={() => setOpen(false)}
                                        className="rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-[#0052CC]/5 hover:text-[#0052CC] transition-all"
                                    >
                                        {data.name}
                                    </motion.a>
                                ))}

                                <div className="border-t border-gray-100 mt-3 pt-5">
                                    <motion.a
                                        href="/login"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-xl px-4 py-3 font-semibold text-[#0052CC] hover:bg-[#0052CC]/5 transition-all"
                                    >
                                        Student Portal
                                    </motion.a>

                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-4"
                                    >
                                        <a href="/registation">
                                            <DefaultButton
                                                type="button"
                                                label="Apply Now"
                                            />
                                        </a>

                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Nav;