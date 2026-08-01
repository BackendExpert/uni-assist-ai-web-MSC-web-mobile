import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../../services/api'
import DefaultInput from '../../../../component/Form/DefaultInput'
import Dropdown from '../../../../component/Form/Dropdown'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import { Link } from 'react-router-dom'

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])
    const [search, setSearch] = useState('')
    const categories = [
        "All",
        "Academics",
        "Campus Life",
        "Admissions",
        "Administrative",
        "Research"
    ]

    const [category, setCategory] = useState('All')
    const [sort, setSort] = useState('latest')

    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get('/announcements/fetch-announcements', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success) {
                    setAnnouncements(res.data.result)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (token) {
            fetchAnnouncements()
        }
    }, [token])

    const filteredAnnouncements = useMemo(() => {
        let data = [...announcements]

        if (search) {
            data = data.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category !== 'All') {
            data = data.filter(item => item.type_anno === category)
        }

        switch (sort) {
            case 'latest':
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break

            case 'oldest':
                data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break

            case 'az':
                data.sort((a, b) => a.title.localeCompare(b.title))
                break

            case 'za':
                data.sort((a, b) => b.title.localeCompare(a.title))
                break

            default:
                break
        }

        return data
    }, [announcements, search, category, sort])

    const statusColor = status => {
        switch (status) {
            case 'Publish-System':
                return 'bg-blue-100 text-blue-700'
            case 'Publish-Public':
                return 'bg-green-100 text-green-700'
            case 'Unpublish':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="space-y-6">

            <div className="bg-white rounded-xl shadow p-6">

                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                        Category
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setCategory(item)}
                                className={`px-5 py-2 rounded-full border transition font-medium text-sm ${category === item
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "bg-white border-gray-300 hover:border-indigo-400 hover:text-indigo-600"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}

                    </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-end md:justify-between">

                    <div className="w-full md:w-2/3">
                        <DefaultInput
                            label="Search"
                            placeholder="Search announcement title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-56">
                        <Dropdown
                            label="Sort"
                            name="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            options={[
                                { label: "Latest", value: "latest" },
                                { label: "Oldest", value: "oldest" },
                                { label: "A - Z", value: "az" },
                                { label: "Z - A", value: "za" },
                            ]}
                        />
                    </div>

                </div>

            </div>

            <div className="grid gap-5">

                {filteredAnnouncements.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                        No announcements found.
                    </div>
                )}

                {filteredAnnouncements.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h2 className="text-xl font-bold">
                                    {item.title}
                                </h2>

                                <div className="flex gap-2 mt-3 flex-wrap">

                                    <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
                                        {item.type_anno}
                                    </span>

                                    <span className={`px-3 py-1 rounded-full text-xs ${statusColor(item.status)}`}>
                                        {item.status}
                                    </span>

                                </div>

                            </div>

                            <div className="text-sm text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()} -
                                {new Date(item.createdAt).toLocaleTimeString()}
                            </div>

                        </div>

                        <p className="mt-5 text-gray-600 whitespace-pre-wrap break-words">
                            {item.desc.length > 250
                                ? `${item.desc.substring(0, 250)}...`
                                : item.desc}
                        </p>

                        <div className="flex justify-end">
                            <div className="flex justify-end mt-5">
                                <Link to={`/dashboard/announcement/view/${item._id}`}>
                                    <DefaultButton
                                        type="button"
                                        label="View Full Announcement"
                                    />
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Announcements