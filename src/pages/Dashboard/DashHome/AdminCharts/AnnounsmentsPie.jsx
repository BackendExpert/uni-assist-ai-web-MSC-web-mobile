import React, { useEffect, useState } from 'react'
import PieChart from '../../components/charts/PieChart'
import API from '../../../../services/api'

const AnnounsmentsPie = () => {

    const token = localStorage.getItem('access_token')
    const [chartData, setChartData] = useState([])

    useEffect(() => {

        const fetchAnnouncements = async () => {

            try {

                const res = await API.get('/announcements/fetch-announcements', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success === true) {

                    const announcements = res.data.result || []

                    const counts = {}

                    announcements.forEach(item => {

                        const type = item.type_anno?.trim()

                        if (!type) return

                        counts[type] = (counts[type] || 0) + 1

                    })

                    const data = Object.keys(counts).map(key => ({
                        name: key,
                        value: counts[key]
                    }))

                    setChartData(data)

                }

            } catch (error) {

                console.error(error)

            }

        }

        if (token) {
            fetchAnnouncements()
        }

    }, [token])

    return (
        <PieChart
            title="Announcements by Category"
            data={chartData}
        />
    )
}

export default AnnounsmentsPie