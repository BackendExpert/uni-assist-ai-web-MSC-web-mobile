import React, { useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import UniImg from '../../assets/uniImg.jpg'
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import CheckBox from '../../component/Form/CheckBox';
import Toast from '../../component/Toast/Toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const headleCreateAccount = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (values.password !== values.confirm_password) {
            setToast({
                success: false,
                message: "Passwords Not match",
            });
            return false
        }

        try {
            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
            };

            const res = await API.post('/auth/register', payload)
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                localStorage.setItem('code_token', res.data.codetoken)
                setTimeout(() => navigate("/download-codes"), 3000);
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
        <div className='bg-gray-100 dark:border-slate-700 dark:bg-slate-950'>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="max-w-7xl mx-auto md:flex md:p-16 p-8">
                <div className="md:w-1/2 rounded-l-2xl md:block hidden">
                    <div
                        className="relative w-full h-full min-h-full bg-cover bg-center bg-no-repeat rounded-l-2xl overflow-hidden"
                        style={{ backgroundImage: `url(${UniImg})` }}
                    >

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

                        <div className="relative z-10 flex items-end h-full p-8">
                            <div className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
                                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-md">
                                    🎓 Student Registration Portal
                                </div>

                                <h1 className="mt-5 text-3xl font-bold leading-tight text-white">
                                    Your Academic Journey
                                    Starts Here
                                </h1>

                                <p className="mt-5 leading-8 text-white/85">
                                    Join a modern and secure student platform built to simplify your
                                    university experience. Register your account to access learning
                                    resources, academic services, announcements, course materials,
                                    and personalized support—all from one intelligent portal designed
                                    to help you stay organized and achieve your academic goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl md:p-10 p-6 rounded-2xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-tl-none md:rounded-bl-none transition-all duration-300">
                    <div className="text-center">
                        <h1 className="text-[#0052CC] dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                            Create Student Account
                        </h1>

                        <p className="text-gray-500 dark:text-slate-400 mt-4 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                            Start your application to ProNexus University today.
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={headleCreateAccount} method="post" className="space-y-5">
                            <div>
                                <DefaultInput
                                    label={"Enter First Name"}
                                    value={values.first_name}
                                    name={'first_name'}
                                    onChange={handleChange}
                                    required
                                    placeholder={"Enter you First Name"}
                                />
                            </div>

                            <div>
                                <DefaultInput
                                    label={"Enter Last Name"}
                                    value={values.last_name}
                                    name={'last_name'}
                                    onChange={handleChange}
                                    required
                                    placeholder={"Enter you Last Name"}
                                />
                            </div>

                            <div>
                                <DefaultInput
                                    label={"Enter Email Address"}
                                    type='email'
                                    value={values.email}
                                    name={'email'}
                                    onChange={handleChange}
                                    required
                                    placeholder={"username@example.com"}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <DefaultInput
                                        label={"Enter Password"}
                                        type='password'
                                        value={values.password}
                                        name={'password'}
                                        onChange={handleChange}
                                        required
                                        placeholder={"********************"}
                                    />
                                </div>

                                <div>
                                    <DefaultInput
                                        label={"Confirm Password"}
                                        type='password'
                                        value={values.confirm_password}
                                        name={'confirm_password'}
                                        onChange={handleChange}
                                        required
                                        placeholder={"********************"}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Creating Account...' : 'Create Account'}
                                />
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
                                Already have an application?{" "}
                                <a
                                    href="/login"
                                    className="text-[#0052CC] font-semibold hover:text-[#003D99] dark:hover:text-blue-400 transition-colors duration-200"
                                >
                                    Continue here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register