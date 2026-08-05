import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'
import DefaultInput from '../../../component/Form/DefaultInput'
import FileInput from '../../../component/Form/FileInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Dropdown from '../../../component/Form/Dropdown'

const CreateResources = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const token = localStorage.getItem('access_token')

    const { values, handleChange } = useForm({
        file_title: '',
        subject: '',
        status: '',
        resource_file: null
    });

    const headleUploadResource = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("file_title", values.file_title);
            formData.append("subject", values.subject);
            formData.append("status", values.status);

            formData.append("resource_file", values.resource_file);

            const res = await API.post('/resource/create-resource', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
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
                    <div className="">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900">
                                Upload Learning Resource
                            </h1>

                            <p className="mt-2 text-sm text-slate-600 leading-7">
                                Upload educational resources that can be accessed by other registered users within the system.
                                Resources may include lecture notes, study materials, user guides, reference documents,
                                tutorials, research papers, manuals, or any other learning content that supports teaching
                                and learning.
                            </p>

                            <p className="mt-4 text-sm text-slate-600 leading-7">
                                Provide a clear title and subject before uploading your document. Organizing resources
                                correctly makes it easier for users to search, browse, and find relevant learning
                                materials in the resource library.
                            </p>

                            <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <h2 className="font-semibold text-blue-800">
                                    Upload Guidelines
                                </h2>

                                <ul className="mt-2 list-disc pl-5 text-sm text-blue-700 space-y-1">
                                    <li>Only PDF (.pdf) documents are accepted.</li>
                                    <li>Enter a meaningful title and select the correct subject.</li>
                                    <li>Upload clear, readable, and complete documents.</li>
                                    <li>Ensure the content is appropriate for educational or reference purposes.</li>
                                    <li>Avoid uploading duplicate, copyrighted, or irrelevant files.</li>
                                    <li>Uploaded resources will be available to registered users through the resource library.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4">
                            <form onSubmit={headleUploadResource} method="post">
                                <div className="">
                                    <DefaultInput
                                        label={"Enter File Name"}
                                        value={values.file_title}
                                        name={'file_title'}
                                        required
                                        placeholder={"Enter File Name"}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="">
                                    <div className="w-full">
                                        <Dropdown
                                            label="File Visibility"
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            required
                                            options={[
                                                { label: "Public", value: "Public" },
                                                { label: "Private", value: "Private" },
                                            ]}
                                        />
                                    </div>
                                    <div className="">
                                        <DefaultInput
                                            label={"Enter Subject"}
                                            value={values.subject}
                                            name={'subject'}
                                            required
                                            placeholder={"Enter Subject"}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>
                                <div className="">
                                    <FileInput
                                        label={"Select Your File"}
                                        name={"resource_file"}
                                        required
                                        onChange={(e) =>
                                            handleChange({
                                                target: {
                                                    name: "resource_file",
                                                    value: e.target.files[0],
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div className="">
                                    <DefaultButton
                                        type='submit'
                                        label={loading ? 'Uploading...' : 'Upload Document'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateResources