import React, { useEffect, useMemo, useState } from 'react'
import LineChart from '../../components/charts/LineChart'
import API from '../../../../services/api'

const AnnounsmentChart = () => {
    const token = localStorage.getItem("access_token")
    const [announcement, setAnnouncements] = useState([])

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get("/announcements/fetch-announcements", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success === true) {
                    setAnnouncements(res.data.result || [])
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (token) {
            fetchAnnouncements()
        }

    }, [token])

    const data = useMemo(() => {
        const result = []
        for (let i = 2; i >= 0; i--) {
            const date = new Date()

            date.setMonth(date.getMonth() - i)
            
            const month = date.getMonth()
            const year = date.getFullYear()

            const count = announcement.filter(item => {
                if (!item.createdAt) return false

                const created = new Date(item.createdAt)

                return (
                    created.getMonth() === month &&
                    created.getFullYear() === year
                )

            }).length

            result.push({
                name: date.toLocaleString("default", {
                    month: "short"
                }),
                value: count
            })
        }
        return result
    }, [announcement])

    return (
        <LineChart
            data={data}
            title="Announcements (Last 2 Months)"
        />
    )

}

export default AnnounsmentChart