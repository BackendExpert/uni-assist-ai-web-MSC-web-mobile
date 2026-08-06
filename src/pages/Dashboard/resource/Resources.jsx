import React, { useEffect, useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'
import { useAuth } from '../../../context/AuthContext'

const Resources = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [resources, setResources] = useState([])
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth();


    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(null)

    const [toast, setToast] = useState(false)

    const itemsPerPage = 16

    const totalPages = Math.ceil(resources.length / itemsPerPage)

    const currentResources = resources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const folderColors = [
        {
            bg: "bg-blue-100",
            icon: "fill-blue-500"
        },
        {
            bg: "bg-green-100",
            icon: "fill-green-500"
        },
        {
            bg: "bg-pink-100",
            icon: "fill-pink-500"
        },
        {
            bg: "bg-red-100",
            icon: "fill-red-500"
        }
    ]



    useEffect(() => {
        const fetchresources = async () => {
            const res = await API.get('/resource/fetch-public-resources', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (res.data.success === true) {
                setResources(res.data.result)
            }
        }

        if (token) fetchresources()
    }, [token])

    const subjects = Object.values(
        resources.reduce((acc, item) => {
            if (!acc[item.subject]) {
                acc[item.subject] = {
                    id: item.subject,
                    name: item.subject,
                    files: 0,
                    size: 0,
                }
            }

            acc[item.subject].files += 1
            acc[item.subject].size += item.size

            return acc
        }, {})
    )

    const formatSize = (bytes) => {
        if (bytes >= 1024 * 1024) {
            return `${(bytes / 1024 / 1024).toFixed(1)} MB`
        }

        return `${(bytes / 1024).toFixed(1)} KB`
    }


    const headleCreateBookmark = async (e, id) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post(
                `/resource/create-bookmark/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => window.location.reload(), 3000);
            }
        }
        catch (err) {
            // console.log(err);
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }


    const headleDeleteResoruce = async (e, id) => {
        e.preventDefault()

        const confirmDelete = window.confirm("Are you sure you want to delete this resource?")

        if (!confirmDelete) {
            return
        }

        setDeleteLoading(id)

        try {
            const res = await API.delete(`/resource/delete-resource/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => window.location.reload(), 3000)
            }

        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            })
        }
        finally {
            setDeleteLoading(null)
        }
    }

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
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                    Learning Resources
                </h1>

                <div className="mt-5 flex flex-wrap gap-3">
                    <div className="bg-[#B4C5FF] text-[#2563EB] px-5 py-2 rounded-lg font-medium text-sm border border-[#9DB2FF]">
                        {resources.length} Materials
                    </div>

                    <div className="bg-[#C4C7C9] text-[#444749] px-5 py-2 rounded-lg font-medium text-sm border border-[#B8BBBD]">
                        {subjects.length} Subjects
                    </div>

                    <div className="bg-[#E0E3E5] text-[#747779] px-5 py-2 rounded-lg font-medium text-sm border border-[#D1D5D8]">
                        Last Updated {resources.length > 0
                            ? new Date(
                                Math.max(...resources.map(item => new Date(item.updatedAt)))
                            ).toLocaleString()
                            : "No updates"}
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                    <h1 className="tracking-[0.18rem] uppercase text-xs font-semibold text-gray-500">
                        Active Subjects
                    </h1>

                    <div className="h-px flex-1 bg-gray-200"></div>
                </div>
            </div>


            <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {
                        subjects.map((data, index) => {

                            const color = folderColors[index % folderColors.length]

                            return (
                                <div
                                    className="group border border-gray-200 bg-white p-5 rounded-xl hover:border-gray-300 transition"
                                    key={data.id}
                                >

                                    <div className={`${color.bg} w-fit p-4 rounded-xl`}>
                                        <FaFolder className={`h-8 w-8 ${color.icon}`} />
                                    </div>


                                    <div className="mt-5">
                                        <h1 className="text-lg font-semibold text-gray-900">
                                            {data.name}
                                        </h1>

                                        <div className="mt-1 flex gap-2 text-xs text-gray-500">
                                            <p>{data.files} Files</p>
                                            <span>•</span>
                                            <p>{formatSize(data.size)}</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
                <h1 className="tracking-[0.18rem] uppercase text-xs font-semibold text-gray-500">
                    Learning Resources
                </h1>

                <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="">

                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h2 className="text-lg font-semibold text-amber-900">
                        Use Resources with the AI Assistant
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-amber-800">
                        The AI Assistant only works with resources that you have personally bookmarked.
                        Bookmarking lets the system know which documents you want the AI to use when
                        answering your questions.
                    </p>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-amber-700">
                        <li><strong>Step 1:</strong> Browse the Resource Library.</li>

                        <li><strong>Step 2:</strong> Click <strong>"Bookmark Resource"</strong> for the resource(s) you want to study.</li>

                        <li><strong>Step 3:</strong> Go to the <strong>Bookmarks</strong> page to view your saved resources.</li>

                        <li><strong>Step 4:</strong> Click <strong>"Make Chunks"</strong> to prepare the bookmarked resource for AI processing.</li>

                        <li><strong>Step 5:</strong> If the chunks have already been created, the <strong>"Make Chunks"</strong> button will no longer be displayed.</li>

                        <li><strong>Step 6:</strong> Ask questions, request summaries, explanations, quizzes, or study notes based on your processed bookmarked resources.</li>
                    </ul>

                    <div className="mt-4 rounded-lg border border-amber-300 bg-white p-3 text-sm text-amber-800">
                        <strong>Note:</strong> The AI Assistant can only access resources that you have bookmarked. If a resource has not been bookmarked, it will not be available for AI-powered learning.
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <div className="grid md:grid-cols-4 gap-4">
                    {
                        currentResources.map((resource, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
                                >
                                    <div className="relative h-48 overflow-hidden bg-gray-100">
                                        <img
                                            src={`${import.meta.env.VITE_APP_API_FILES}/${resource.preview_image}`}
                                            alt={resource.file_title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-blue-700 shadow">
                                                {resource.subject}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                                            {resource.file_title}
                                        </h2>

                                        <div className="mt-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">File Name</span>
                                                <span className="font-medium text-gray-800 truncate max-w-[180px]">
                                                    {resource.original_name}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Size</span>
                                                <span className="font-medium text-gray-800">
                                                    {formatSize(resource.size)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Uploaded</span>
                                                <span className="font-medium text-gray-800">
                                                    {new Date(resource.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Uploader</span>

                                                <span className="font-medium text-gray-800 truncate max-w-[180px]">
                                                    {resource?.uploader?.email}
                                                </span>
                                            </div>

                                            <div className="mt-3">
                                                {
                                                    resource?.uploader?.email === auth?.user?.email ?
                                                        <div className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                            ✓ Uploaded by Me
                                                        </div>
                                                        :
                                                        <div className=""></div>
                                                }
                                            </div>
                                        </div>

                                        <div className="mt-6 border-t border-gray-100 pt-5 space-y-3">
                                            <a
                                                href={`${import.meta.env.VITE_APP_API_FILES}/${resource.path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <DefaultButton
                                                    type="button"
                                                    label="View Document"
                                                />
                                            </a>

                                            <div className="mt-2">
                                                <DefaultButton
                                                    onClick={(e) => headleCreateBookmark(e, resource._id)}
                                                    type="button"
                                                    label="⭐ Bookmark Resource"
                                                />
                                            </div>

                                            <div className="">
                                                {
                                                    auth?.role === "admin" ||
                                                        resource?.uploader?._id?.toString() === auth?.user?.id?.toString()
                                                        ?
                                                        <div>
                                                            <button
                                                                onClick={(e) => headleDeleteResoruce(e, resource._id)}
                                                                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
                                                            >
                                                                {
                                                                    deleteLoading === resource._id
                                                                        ? "Deleting Resource..."
                                                                        : "Delete Resource"
                                                                }
                                                            </button>
                                                        </div>
                                                        :
                                                        <div>
                                                            Cannot delete
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    totalPages > 1 && (
                        <div className="mt-6 flex justify-center gap-2">

                            {
                                Array.from({ length: totalPages }, (_, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                })
                            }

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Resources