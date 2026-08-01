import React, { useState } from 'react'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import Dropdown from '../../../../component/Form/Dropdown'
import DefaultButton from '../../../../component/Buttons/DefaultButton'


const CreateAnnouncements = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const token = localStorage.getItem('access_token')

    const { values, handleChange } = useForm({
        title: '',
        desc: '',
        type_anno: 'Academics',
        status: 'Publish-System'
    });

    const headleCreateAnnouncements = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/announcements/create-announcement', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
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

    return (
        <div>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow">
                    <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <h2 className="text-lg font-bold uppercase tracking-wide text-red-600">
                                Important Notice
                            </h2>
                        </div>

                        <div className="space-y-4">

                            <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4">
                                <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
                                    Publish • System
                                </span>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Visible to Registered Users
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Every registered user in the system can view this announcement immediately after it is published.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4">
                                <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold text-amber-700 whitespace-nowrap">
                                    Unpublished
                                </span>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Admin Only
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        This announcement is hidden from students and guests. Only administrators can view and update it.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4">
                                <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700 whitespace-nowrap">
                                    Publish • Public
                                </span>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Publicly Accessible
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Anyone can view this announcement, including registered users and visitors who have not signed in.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form onSubmit={headleCreateAnnouncements} method="post">
                        <div className="">
                            <DefaultInput
                                label={"Enter Announcements Title"}
                                value={values.title}
                                name={'title'}
                                required
                                placeholder={"Announcements Title"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <TextAreaInput
                                label={"Enter Announcements Description"}
                                value={values.desc}
                                name={'desc'}
                                required
                                placeholder='Announcements Description'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:flex">
                            <div className="w-full">
                                <Dropdown
                                    label="Announcement Category"
                                    name="type_anno"
                                    value={values.type_anno}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { label: "Academics", value: "Academics" },
                                        { label: "Campus Life", value: "Campus Life" },
                                        { label: "Admissions", value: "Admissions" },
                                        { label: "Administrative", value: "Administrative" },
                                        { label: "Research", value: "Research" },
                                    ]}
                                />
                            </div>
                            <div className="md:ml-2 ml-0 w-full">
                                <Dropdown
                                    label="Announcement Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { label: "Publish-System", value: "Publish-System" },
                                        { label: "Unpublish", value: "Unpublish" },
                                        { label: "Publish-Public", value: "Publish-Public" },
                                    ]}
                                />
                            </div>
                        </div>


                        <div className="">
                            <DefaultButton
                                type='submit'
                                label={loading ? 'Creating Announcement...' : 'Create Announcement'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAnnouncements