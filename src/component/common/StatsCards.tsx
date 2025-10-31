import React from 'react'
import { StatCard } from '../about-us/stats/card'

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                stat="36+"
                title="Online Courses"
                description="Our degrees are recognized internationally, opening doors to global careers."
                variant="dark"
            />

            <StatCard
                stat="4.9"
                title="Course Rating"
                description="Learn from industry experts who bring real-world experience to the classroom."
                variant="light"
            />

            <StatCard
                stat="100"
                title="Students"
                description="Study at your own pace with courses designed for busy lifestyles."
                variant="light"
            />
        </div>
    )
}

export default StatsCards