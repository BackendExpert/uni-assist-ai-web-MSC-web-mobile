import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import PieChart from '../../components/charts/PieChart'
import { useAuth } from '../../../../context/AuthContext'

const MyResources = () => {
    const token = localStorage.getItem("access_token")
    const [resources, setResources] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await API.get('/resource/fetch-public-resources', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })

                if (res.data.success === true) {
                    setResources(res.data.result || [])
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (token && auth?.user?.id) {
            fetchResources()
        }
    }, [token, auth?.user?.id])

    const myResources = resources.filter((resource) => {
        return resource.uploader?._id?.toString() === auth?.user?.id?.toString()
    }).length

    const chartData = [
        {
            name: "My Resources",
            value: myResources,
        },
        {
            name: "Other Resources",
            value: resources.length - myResources,
        },
    ]

    return (
        <div className="">
            <PieChart
                title="Resources Overview"
                data={chartData}
            />
        </div>
    )
}

export default MyResources