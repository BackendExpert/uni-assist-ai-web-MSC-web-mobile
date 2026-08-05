import React, { useEffect, useMemo, useState } from 'react'
import Dropdown from '../../../component/Form/Dropdown'
import { FiCalendar } from 'react-icons/fi'
import API from '../../../services/api'

const UserAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Academics")

    const token = localStorage.getItem("access_token")

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get(
                    '/announcements/fetch-announcements',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (res.data.success) {
                    const filtered = res.data.result.filter(
                        (item) =>
                            item.status === "Publish-System" ||
                            item.status === "Publish-Public"
                    )

                    setAnnouncements(filtered)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (token) fetchAnnouncements()
    }, [token])

    const categories = useMemo(() => {
        const types = [
            "Academics",
            "Campus Life",
            "Admissions",
            "Administrative",
            "Research"
        ]

        return types.map((type, index) => {
            const data = announcements.filter(
                (item) => item.type_anno === type
            )

            return {
                id: index + 1,
                title: type,
                count: data.length,
                announcements: data
            }
        })
    }, [announcements])

    const currentCategory = categories.find(
        (item) => item.title === selectedCategory
    ) || {
        title: "",
        count: 0,
        announcements: []
    }

    const groupedAnnouncements = [...currentCategory.announcements]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .reduce((groups, announcement) => {
            const date = new Date(announcement.createdAt)

            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(today.getDate() - 1)

            let label

            if (date.toDateString() === today.toDateString()) {
                label = `Today, ${date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                })}`
            } else if (date.toDateString() === yesterday.toDateString()) {
                label = `Yesterday, ${date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                })}`
            } else {
                label = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                })
            }

            if (!groups[label]) {
                groups[label] = []
            }

            groups[label].push(announcement)

            return groups
        }, {})


    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Announcements
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Stay updated with the latest campus news and notices.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
                <div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">
                                Categories
                            </h2>
                        </div>

                        <div className="p-3 space-y-2">
                            {categories.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedCategory(item.title)}
                                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${selectedCategory === item.title
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="text-left">
                                        <p className="font-medium">
                                            {item.title}
                                        </p>

                                        <p
                                            className={`text-xs ${selectedCategory === item.title
                                                ? "text-blue-100"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            {item.count} announcements
                                        </p>
                                    </div>

                                    <span
                                        className={`min-w-[28px] h-7 flex items-center justify-center rounded-full text-xs font-semibold ${selectedCategory === item.title
                                            ? "bg-white/20 text-white"
                                            : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {item.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {currentCategory.title}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {currentCategory.count} announcements
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(groupedAnnouncements).length === 0 ? (
                            <div className="bg-white rounded-xl border border-dashed border-gray-300 py-10 text-center text-gray-400">
                                No announcements available.
                            </div>
                        ) : (
                            Object.entries(groupedAnnouncements).map(([date, items]) => (
                                <div key={date}>

                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-sm font-semibold text-gray-700">
                                            {date}
                                        </h3>

                                        <div className="flex-1 h-px bg-gray-200"></div>
                                    </div>

                                    <div className="space-y-3">
                                        {items.map((announcement) => (
                                            <div
                                                key={announcement._id}
                                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">

                                                            <div className="flex items-center gap-3 flex-wrap">
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    {announcement.title}
                                                                </h3>

                                                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                                    {announcement.type_anno}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                                <FiCalendar className="text-blue-600" />

                                                                {new Date(
                                                                    announcement.createdAt
                                                                ).toLocaleDateString()}
                                                            </div>

                                                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                                                {announcement.desc}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAnnouncements