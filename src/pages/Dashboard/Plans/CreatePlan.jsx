import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatePlan = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        title: '',
        desc: '',
        user_promt: '',
        plan_type: '',
    });

    const headleCreatePlan = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/plan/create-plan', values, {
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
        }
        catch (err) {
            console.log(err)
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
                <div className="bg-white p-8 rounded-xl shadow">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Create AI Learning Plan
                        </h1>
                        <p className="mt-4 text-center text-sm text-slate-600">
                            {loading && (
                                <div className="flex items-center justify-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700">
                                    <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />

                                    <span className="font-medium">
                                        AI is generating your personalized learning plan. Please wait...
                                    </span>
                                </div>
                            )}
                        </p>

                        <p className="mt-2 text-sm text-slate-600 leading-7">
                            Create a personalized AI-powered learning or career plan by providing a title,
                            description, plan type, and detailed instructions. The AI will analyze your
                            requirements and generate a structured roadmap tailored to your goals, experience,
                            and preferred learning approach.
                        </p>

                        <p className="mt-4 text-sm text-slate-600 leading-7">
                            Be as specific as possible when describing your requirements. Include information
                            such as your current skill level, target role, technologies you want to learn,
                            available study time, preferred duration, and any specific objectives. More
                            detailed instructions help the AI generate a higher-quality and more relevant plan.
                        </p>

                        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <h2 className="font-semibold text-blue-800">
                                Plan Creation Guidelines
                            </h2>

                            <ul className="mt-2 list-disc pl-5 text-sm text-blue-700 space-y-1">
                                <li>Provide a clear and meaningful title for your plan.</li>
                                <li>Write a short description explaining the purpose of the plan.</li>
                                <li>Select the correct plan type (Skill Development or Career Guide).</li>
                                <li>Describe your goals, current knowledge, and expected outcome in the prompt.</li>
                                <li>Include technologies, study duration, or career objectives where applicable.</li>
                                <li>The AI will generate a personalized plan based on the information you provide.</li>
                            </ul>
                        </div>

                        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <h2 className="font-semibold text-amber-800">
                                Example Prompt (Describe What You Want the AI to Generate)
                            </h2>

                            <p className="mt-3 text-sm text-amber-700 leading-7">
                                <strong>Example:</strong> Create a 12-week Full Stack Web Development learning
                                plan for a beginner.
                            </p>

                            <div className="mt-3 text-sm text-amber-700">
                                <p className="font-medium mb-2">Requirements:</p>

                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Study 2 hours per day.</li>
                                    <li>Learn HTML, CSS, JavaScript, and React.</li>
                                    <li>Create one small project.</li>
                                    <li>Complete the plan in 4 weeks.</li>
                                </ul>

                                <p className="text-red-500 mt-4">
                                    <span className='uppercase font-bold'>important : </span>
                                    <span>The time to create plan will depend on user promt</span>
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-8">
                        <form onSubmit={headleCreatePlan} method="post">
                            <div className="">
                                <DefaultInput
                                    label={"Enter Plan Title"}
                                    value={values.title}
                                    name={'title'}
                                    placeholder={"Plan Title"}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="">
                                <TextAreaInput
                                    label={"Enter Plan Description"}
                                    value={values.desc}
                                    name={'desc'}
                                    placeholder='Plan Description'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="">
                                <div className="">
                                    <Dropdown
                                        label={"Select Plan Type"}
                                        name={"plan_type"}
                                        value={values.plan_type}
                                        onChange={handleChange}
                                        required={true}
                                        options={[
                                            {
                                                label: "Skill Development",
                                                value: "skill-development",
                                            },
                                            {
                                                label: "Career Guide",
                                                value: "career-guide",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <TextAreaInput
                                    label={"Describe What You Want the AI to Generate"}
                                    value={values.user_promt}
                                    name={"user_promt"}
                                    placeholder={"Describe What You Want the AI to Generate"}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Plan Creating...' : 'Create New Plan'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePlan