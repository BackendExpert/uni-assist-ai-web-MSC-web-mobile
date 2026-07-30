import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaCircle, FaGears } from 'react-icons/fa6'
import { FaInfoCircle } from 'react-icons/fa'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const Notifications = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const [notifications, setNotifications] = useState([])
    const [notificationsType, setNotificationType] = useState('all')


    useEffect(() => {
        const fetchnotifications = async (e) => {
            const res = await API.get('/profile/fetch-notifications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setNotifications(res.data.result)
            }
        }

        if (token) fetchnotifications()
    }, [token])

    const onClickNotificationType = (value) => {
        setNotificationType(value)
    }


    const readNotification = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        console.log(id)

        try {
            const res = await API.patch(`/profile/read-notification/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => window.location.reload(), 3000);
            }
        } catch (err) {
            console.log(err)
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white rounded-lg shadow mb-4">
                    <div className="flex flex-wrap gap-2 p-4">
                        <div
                            className={`cursor-pointer px-4 py-2 ${notificationsType === "all"
                                ? "bg-[#0052CC] text-white rounded-full"
                                : ""
                                }`}
                            onClick={() => onClickNotificationType("all")}
                        >
                            All
                        </div>

                        <div
                            className={`cursor-pointer px-4 py-2 ${notificationsType === "system"
                                ? "bg-[#0052CC] text-white rounded-full"
                                : ""
                                }`}
                            onClick={() => onClickNotificationType("system")}
                        >
                            System
                        </div>

                        <div
                            className={`cursor-pointer px-4 py-2 ${notificationsType === "notice"
                                ? "bg-[#0052CC] text-white rounded-full"
                                : ""
                                }`}
                            onClick={() => onClickNotificationType("notice")}
                        >
                            Notice
                        </div>
                    </div>

                    <div
                        className="px-4 pb-4 lg:pb-0 lg:pr-6"
                        onClick={() => onClickNotificationType("unread")}
                    >
                        <div className="inline-flex items-center gap-3 rounded-full border border-red-200 bg-red-50 px-5 py-2 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
                            </span>

                            <span className="text-sm font-semibold text-red-700">
                                Unread
                            </span>

                            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
                                {notifications.filter((n) => n.status === "Unread").length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {notifications.map((data, index) => {
                    return (
                        (
                            notificationsType === "all" ||
                            (notificationsType === "unread" &&
                                data.status === "Unread") ||
                            data.type.toLowerCase() === notificationsType
                        ) && (
                            <div
                                className="bg-white p-4 rounded shadow"
                                key={index}
                            >
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div>
                                            {data.type === "System" ? (
                                                <div className="bg-[#0052CC] p-3 sm:p-4 rounded">
                                                    <FaGears className="h-6 w-6 sm:h-8 sm:w-8 fill-white" />
                                                </div>
                                            ) : (
                                                <div className="bg-orange-500 p-3 sm:p-4 rounded">
                                                    <FaInfoCircle className="h-6 w-6 sm:h-8 sm:w-8 fill-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h1 className="text-base sm:text-lg font-bold text-slate-900 break-words">
                                                    {data.title}
                                                </h1>

                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${data.type === "System"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-orange-100 text-orange-700"
                                                        }`}
                                                >
                                                    {data.type}
                                                </span>
                                            </div>

                                            <p className="text-sm leading-6 text-slate-600 break-words">
                                                {data.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex lg:block items-center justify-between lg:text-right min-w-fit">
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {new Date(
                                                data.createdAt
                                            ).toLocaleString()}
                                        </p>

                                        {data.status === "Unread" && (
                                            <div className="flex lg:justify-end mt-0 lg:mt-4">
                                                <div className="mr-4">
                                                    <form onSubmit={(e) => readNotification(e, data._id)}>
                                                        <DefaultButton
                                                            type='submit'
                                                            label='Make as read'
                                                        />
                                                    </form>

                                                </div>
                                                <FaCircle className="h-3 w-3 fill-[#0052CC]" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    )
}

export default Notifications