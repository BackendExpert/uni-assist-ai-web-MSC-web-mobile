import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'

import DefaultInput from '../../../../component/Form/DefaultInput'
import Dropdown from '../../../../component/Form/Dropdown'
import DateInput from '../../../../component/Form/DateInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Toast from '../../../../component/Toast/Toast'
import { FaBullhorn, FaCalendarAlt, FaTag } from "react-icons/fa";

const ViewAnnouncement = () => {
    const { id } = useParams()

    const [announcement, setAnnouncement] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const token = localStorage.getItem('access_token')

    const { values, handleChange, setValues } = useForm({
        title: '',
        desc: '',
        type_anno: '',
        status: '',
    })

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const res = await API.get(`/announcements/fetch-announcement/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success) {
                    const data = res.data.result
                    setAnnouncement(data)
                    setValues({
                        title: data.title || '',
                        desc: data.desc || '',
                        type_anno: data.type_anno || '',
                        status: data.status || '',
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (token) {
            fetchAnnouncement()
        }
    }, [id, token])

    const handleUpdateAnnouncement = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(
                `/announcements/update-announcement/${id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => window.location.reload(), 2000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    console.log("announcement:", announcement)
    console.log("values:", values)

    return (
        <div className="grid lg:grid-cols-5 gap-8">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100">

                    <div className="flex items-start justify-between mb-10">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <FaBullhorn className="text-indigo-600 text-2xl" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Announcement
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Announcement details and information
                                </p>
                            </div>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-xs font-bold border ${announcement?.status === "Publish-System"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}
                        >
                            {announcement?.status}
                        </span>

                    </div>

                    <div className="space-y-5">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-indigo-200 transition">

                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                Title
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900">
                                {announcement?.title}
                            </h3>

                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                Description
                            </p>

                            <p className="text-slate-700 leading-8">
                                {announcement?.desc}
                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-5">


                            <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    Category
                                </p>

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <FaTag className="text-indigo-600" />
                                    </div>

                                    <span className="font-semibold text-slate-800">
                                        {announcement?.type_anno}
                                    </span>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    Expire Date
                                </p>

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <FaCalendarAlt className="text-orange-500" />
                                    </div>

                                    <span className="font-semibold text-slate-800">
                                        {announcement?.expire_date?.slice(0, 10)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3">

                <div className="sticky top-6">

                    <form
                        onSubmit={handleUpdateAnnouncement}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
                    >

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Update Announcement
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Edit announcement details below.
                            </p>
                        </div>

                        <div className="space-y-2">

                            <DefaultInput
                                label="Announcement Title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                            />

                            <TextAreaInput
                                label="Description"
                                name="desc"
                                value={values.desc}
                                rows={7}
                                onChange={handleChange}
                            />

                            <div className="grid md:grid-cols-2 gap-5">

                                <Dropdown
                                    label="Category"
                                    name="type_anno"
                                    value={values.type_anno}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Academics", value: "Academics" },
                                        { label: "Campus Life", value: "Campus Life" },
                                        { label: "Admissions", value: "Admissions" },
                                        { label: "Administrative", value: "Administrative" },
                                        { label: "Research", value: "Research" },
                                    ]}
                                />

                                <Dropdown
                                    label="Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Publish (System)", value: "Publish-System" },
                                        { label: "Publish (Public)", value: "Publish-Public" },
                                        { label: "Unpublish", value: "Unpublish" },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <DefaultButton
                                type="submit"
                                label={loading ? 'Updating Data...' : 'Update Announcement'}
                            />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default ViewAnnouncement