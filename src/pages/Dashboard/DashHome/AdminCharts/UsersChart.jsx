import React, { useEffect, useState } from 'react'
API
import PieChart from '../../components/charts/PieChart'
import API from '../../../../services/api'

const UsersChart = () => {
    const token = localStorage.getItem("access_token")
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchusers = async () => {
            const res = await API.get('/admin/fetch-users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setUsers(res.data.result || [])
            }
        }
        if (token) {
            fetchusers()
        }
    }, [token])


    const adminCount = users.filter(
        (user) =>
            user.role === "admin" ||
            user.role?.role === "admin"
    ).length

    const studentCount = users.filter(
        (user) =>
            user.role === "student" ||
            user.role?.role === "student"
    ).length

    const chartData = [
        {
            name: "Admins",
            value: adminCount,
        },
        {
            name: "Students",
            value: studentCount,
        },
    ]

    return (
        <PieChart
            data={chartData}
            title="Users Overview"
        />
    )
}

export default UsersChart