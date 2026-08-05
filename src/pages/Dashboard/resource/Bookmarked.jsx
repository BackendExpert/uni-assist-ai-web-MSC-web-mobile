import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const Bookmarked = () => {
    const [loadingId, setLoadingId] = useState(null)
    const [toast, setToast] = useState(false)
    const [bookmarked, setBookmarked] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchBookmarked = async () => {
            try {
                const res = await API.get('/resource/fetch-bookmarked-resources', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success) {
                    setBookmarked(res.data.result)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (token) {
            fetchBookmarked()
        }
    }, [token])

    const headleCreateChunks = async (e, id) => {
        e.preventDefault();

        setLoadingId(id);

        try {
            const res = await API.post(`/resource/create-chunks/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => window.location.reload(), 3000);
            }

        } catch (err) {

            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });

        } finally {
            setLoadingId(null);
        }
    }

    const filteredResources = useMemo(() => {
        return bookmarked.filter(item =>
            item.resource?.file_title
                ?.toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [bookmarked, search])

    const itemsPerPage = 15

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage)

    const currentResources = filteredResources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    return (
        <div className="p-6">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Bookmarked Resources
                </h1>
                <p className="text-slate-500 mt-2">
                    Quickly access all the learning materials you have saved.
                </p>
            </div>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-100 focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-blue-600"
                />
            </div>

            {currentResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                    {currentResources.map((item) => (
                        <div
                            key={item._id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div className="relative h-52 bg-slate-100 overflow-hidden">

                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/${item.resource.preview_image.replace(/\\/g, "/")}`}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />

                                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    {item.resource.subject}
                                </span>

                            </div>

                            <div className="p-6">

                                <h2 className="text-xl font-semibold text-slate-800 line-clamp-2">
                                    {item.resource.file_title}
                                </h2>

                                <p className="text-slate-500 mt-3 text-sm line-clamp-2">
                                    {item.resource.original_name}
                                </p>

                                <div className="md:flex items-center justify-between mt-8">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Bookmarked
                                        </p>

                                        <p className="font-medium text-slate-700">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="md:mt-0 mt-4">
                                        {
                                            item.resource.hasChunks ? (
                                                <span className="text-sm font-medium text-green-600">
                                                    AI Resource Ready
                                                </span>
                                            ) : (
                                                <DefaultButton
                                                    onClick={(e) => headleCreateChunks(e, item.resource._id)}
                                                    label={
                                                        loadingId === item.resource._id
                                                            ? 'Creating Chunks...'
                                                            : 'Create Resource for AI Assist'
                                                    }
                                                />
                                            )
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <div className="py-24 text-center">
                    <h2 className="text-2xl font-semibold text-slate-700">
                        No bookmarked resources
                    </h2>
                    <p className="text-slate-500 mt-3">
                        Try another search or bookmark a resource first.
                    </p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-14">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
                    >
                        ←
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-11 h-11 rounded-full transition ${currentPage === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 hover:bg-blue-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
                    >
                        →
                    </button>

                </div>
            )}

        </div>
    )
}

export default Bookmarked