import { FaGraduationCap } from 'react-icons/fa'
import React, { useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import UniImg from '../../assets/uniImg.jpg'
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import CheckBox from '../../component/Form/CheckBox';
import Toast from '../../component/Toast/Toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const { login } = useAuth() 
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        email: '',
        password: '',
    });

    const headleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/auth/login', values)
            if (res.data.success === true) {
                login(
                    res.data.access_token,
                    res.data.refresh_token
                );
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => navigate("/dashboard"), 3000);
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
                        <FaGraduationCap className='h-12 w-12 fill-white' />
                    </div>

                    <div className="mt-2">
                        <h1 className="text-3xl">
                            UniAssistAI Helper
                        </h1>
                        <p className="text-sm mt-2 text-gray-400">Student & Faculty Portal Login</p>
                    </div>
                </div>


                <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-800 p-12 md:p-16 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/20 animate-[fadeIn_0.8s_ease-in-out]">
                    <div className="">
                        <div className="text-[#0052CC] mb-4">
                            <a href="/">
                                Go Back to Home
                            </a>
                        </div>
                        <form onSubmit={headleLogin} method="post">
                            <div className="">
                                <DefaultInput
                                    label={"Enter Email Address"}
                                    value={values.email}
                                    name={'email'}
                                    required
                                    placeholder={"username@example.com"}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <DefaultInput
                                    label={"Enter Password"}
                                    type='password'
                                    value={values.password}
                                    name={'password'}
                                    required
                                    placeholder={"*****************"}
                                    onChange={handleChange}
                                />
                                <a href="/forget-password" className='text-[#0052CC]'>
                                    Forget Password
                                </a>
                            </div>


                            <div className="mt-8">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Logining' : 'Source Login'}
                                />
                            </div>
                        </form>

                        <div className="mt-4">
                            <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base">
                                Don't have an Account ?{" "}
                                <a
                                    href="/registation"
                                    className="text-[#0052CC] font-semibold hover:text-[#003D99] dark:hover:text-blue-400 transition-colors duration-200"
                                >
                                    Create New
                                </a>
                            </p>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}

export default Login