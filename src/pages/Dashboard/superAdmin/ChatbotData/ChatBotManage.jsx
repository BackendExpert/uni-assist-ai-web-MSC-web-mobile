import React, { useEffect, useState } from 'react'
import Toast from '../../../../component/Toast/Toast'
import useForm from '../../../../hooks/useForm'

const ChatBotManage = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        profile_image: null
    });

    const headleAddNewDocs = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

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
        <div>ChatBotManage</div>
    )
}

export default ChatBotManage