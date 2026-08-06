import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import PieChart from '../../components/charts/PieChart'
import { useAuth } from '../../../../context/AuthContext'

const MyPlans = () => {
    const token = localStorage.getItem('access_token')
    const [plans, setPlans] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await API.get('/plan/fetch-plans', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success === true) {
                    const myPlans = res.data.result.filter(
                        (plan) =>
                            plan.user?._id?.toString() === auth?.user?.id?.toString()
                    )

                    setPlans(myPlans)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (token && auth?.user?.id) {
            fetchPlans()
        }
    }, [token, auth?.user?.id])

    const skillDevelopment = plans.filter(
        (plan) => plan.plan_type === "skill-development"
    ).length

    const careerGuide = plans.filter(
        (plan) => plan.plan_type === "career-guide"
    ).length

    const chartData = [
        {
            name: "Skill Development",
            value: skillDevelopment,
        },
        {
            name: "Career Guide",
            value: careerGuide,
        },
    ]

    return (
        <div>
            <PieChart
                title="My Plans Overview"
                data={chartData}
            />
        </div>
    )
}

export default MyPlans