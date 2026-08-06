import React from 'react'
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f97316",
    "#ef4444"
]

const PieChart = ({ data = [], title }) => {

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
                            <RechartsPieChart>

                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))
                                    }
                                </Pie>

                                <Tooltip />

                                <Legend />

                            </RechartsPieChart>
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

export default PieChart