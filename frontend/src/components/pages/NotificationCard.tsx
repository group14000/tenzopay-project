import React from 'react'

interface PaymentEntry {
    date: string
    id: string
}

const NotificationCard: React.FC = () => {
    const payments: PaymentEntry[] = [
        { date: "January 5th", id: "AG03" },
        { date: "January 5th", id: "AG03" },
        { date: "January 5th", id: "AG03" },
    ]

    return (
        <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl p-6 border border-gray-800 w-full max-w-md">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-red-500 rounded-full" />
                        <span className="text-gray-400 text-sm">56 people need to pay</span>
                    </div>
                    <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded">
                        ALERT
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-purple-500 rounded-full" />
                        <span className="text-gray-400 text-sm">10 people paid on time</span>
                    </div>
                    <span className="bg-purple-500/10 text-purple-500 text-xs px-2 py-1 rounded">
                        PAID
                    </span>
                </div>
                <div className="pt-2">
                    <h3 className="text-gray-400 text-sm mb-3">Payments</h3>
                    <div className="space-y-3">
                        {payments.map((payment, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-800/40 rounded-lg p-3"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="h-2 w-2 bg-gray-400 rounded-full" />
                                    <span className="text-gray-300 text-sm">{payment.date}</span>
                                </div>
                                <div className="text-gray-400 text-sm">{payment.id}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard