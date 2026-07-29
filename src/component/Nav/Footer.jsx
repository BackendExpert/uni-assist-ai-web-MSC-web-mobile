import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaArrowRight
} from 'react-icons/fa'

const Footer = () => {
    const footer_quicklinks = [
        {
            title: "Quick Links",
            menus: [
                { name: "Administration", links: "#" },
                { name: "Library Services", links: "#" },
                { name: "Campus Map", links: "#" },
                { name: "Job Board", links: "#" },
            ]
        },
    ]

    const resources = [
        {
            title: "Resources",
            menus: [
                { name: "Student Portal", links: "#" },
                { name: "Faculty & Staff", links: "#" },
                { name: "Health & Wellness", links: "#" },
                { name: "IT Support", links: "#" },
            ]
        },
    ]

    return (
        <footer className="bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    <div>
                        <h1 className="text-3xl font-black tracking-wide">
                            UniAi<span className="text-blue-500">Assist</span>
                        </h1>

                        <p className="text-slate-400 mt-6 leading-8">
                            Empowering students with AI-driven academic support,
                            personalized learning experiences, university services,
                            and intelligent campus assistance.
                        </p>

                        <div className="flex gap-4 mt-8">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-11 h-11 rounded-full bg-slate-900 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footer_quicklinks.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold mb-6">
                                {section.title}
                            </h2>

                            <div className="space-y-4">
                                {section.menus.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.links}
                                        className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-all duration-300 group"
                                    >
                                        <FaArrowRight className="group-hover:translate-x-1 transition" />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {resources.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold mb-6">
                                {section.title}
                            </h2>

                            <div className="space-y-4">
                                {section.menus.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.links}
                                        className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-all duration-300 group"
                                    >
                                        <FaArrowRight className="group-hover:translate-x-1 transition" />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div>
                        <h2 className="text-xl font-bold mb-6">
                            Contact
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <FaMapMarkerAlt />
                                </div>

                                <div>
                                    <h4 className="font-semibold">Address</h4>
                                    <p className="text-slate-400 mt-1">
                                        University UniAIAssist,
                                        ABC,
                                        Xyz
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <FaPhoneAlt />
                                </div>

                                <div>
                                    <h4 className="font-semibold">Phone</h4>
                                    <p className="text-slate-400 mt-1">
                                        +94 711758851
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <FaEnvelope />
                                </div>

                                <div>
                                    <h4 className="font-semibold">Email</h4>
                                    <p className="text-slate-400 mt-1">
                                        support@example.com
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">
                    <p className="text-slate-500">
                        © {new Date().getFullYear()} UniAiAssist. All Rights Reserved.
                    </p>

                    <div className="flex gap-8 text-slate-400">
                        <a href="#" className="hover:text-blue-400 transition">
                            Privacy Policy
                        </a>

                        <a href="#" className="hover:text-blue-400 transition">
                            Terms of Service
                        </a>

                        <a href="#" className="hover:text-blue-400 transition">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer