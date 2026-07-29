import React, { useState } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import useForm from '../../hooks/useForm';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import API from '../../services/api';
import Toast from '../../component/Toast/Toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()    

    const { values, handleChange } = useForm({
        email: '',
    });

    const headleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/auth/request-password-reset', values)
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                localStorage.setItem('reset_token', res.data.token)
                setTimeout(() => navigate("/verify-otp"), 3000);
            }
        }
        catch (err) {
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
        <div className="min-h-screen relative bg-gray-100 dark:bg-slate-900 flex items-center justify-center p-6 overflow-hidden">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute w-96 h-96 border border-blue-400/20 rounded-full animate-spin [animation-duration:25s]"></div>

            <div className="absolute w-[500px] h-[500px] border border-purple-400/20 rounded-full animate-spin [animation-duration:35s]"></div>

            <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>

            <div className="absolute top-[30%] right-[20%] w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>

            <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

            <div className="absolute bottom-[30%] right-[30%] w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>

            <div className="max-w-lg w-full">

                <div className="text-center mb-4">
                    <div className="bg-[#0052CC] rounded-xl p-2 inline-block">
                        <FaGraduationCap className="h-12 w-12 fill-white" />
                    </div>

                    <div className="mt-2">
                        <h1 className="text-3xl">
                            UniAssistAI Helper
                        </h1>
                        <p className="text-sm mt-2 text-gray-400">
                            Reset Your Password
                        </p>
                    </div>
                </div>

                <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-800 p-12 md:p-16 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/20 animate-[fadeIn_0.8s_ease-in-out]">

                    <div className="text-[#0052CC] mb-4">
                        <a href="/">
                            Go Back to Home
                        </a>
                    </div>

                    <form onSubmit={headleForgetPassword}>

                        <DefaultInput
                            label={"Enter Email Address"}
                            value={values.email}
                            name="email"
                            required
                            placeholder="username@example.com"
                            onChange={handleChange}
                        />

                        <div className="mt-8">
                            <DefaultButton
                                type="submit"
                                label={loading ? 'Sending...' : 'Send Reset OTP'}
                            />
                        </div>

                    </form>

                    <div className="mt-4">
                        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
                            Remember your password?{" "}
                            <a
                                href="/login"
                                className="text-[#0052CC] font-semibold hover:text-[#003D99] dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                Login
                            </a>
                        </p>
                        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
                            Use Backup Codes ? {" "}
                            <a
                                href="/verify-backupcodes"
                                className="text-[#0052CC] font-semibold hover:text-[#003D99] dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                Verify Backup Code
                            </a>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ForgetPassword