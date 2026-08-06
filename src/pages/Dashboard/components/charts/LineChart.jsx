import React from 'react'
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const LineChart = ({ data = [], title }) => {

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">

            {
                title && (
                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        {title}
                    </h2>
                )
            }

            <div className="w-full h-[300px]">

                {
                    data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 7 }}
                                />

                            </RechartsLineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No Data Available
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default LineChart