import { Card } from "@/components/ui/card"
import { features } from "@/constants"

export default function AdvanceCareer() {
    return (
        <main className="min-h-screen bg-white px-6 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-16 text-4xl font-bold text-purple-600 sm:text-5xl lg:text-6xl text-center">
                    Advance your career with an online degree
                </h1>

                {/* Responsive grid using minmax */}
                <div
                    className="grid gap-8"
                    style={{
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                className="border-0 bg-white p-6 shadow-none transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-4 inline-flex rounded-lg bg-purple-600 p-3">
                                    <Icon className="h-6 w-6 text-white" />
                                </div>

                                <h3 className="mb-3 text-lg font-semibold text-purple-600">
                                    {feature.title}
                                </h3>

                                <p className="text-base text-gray-600">{feature.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
