import { Card } from "@/components/ui/card"
import { features } from "@/constants"

export default function AdvanceCareer() {
    return (
        <main className="min-h-screen bg-white px-6 py-8 ">
            <div className="mx-auto w-full
            ">
                <h1 className="mb-16 text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl px-4">
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
                                className="border bg-white py-4 px-4 shadow-none transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className=" inline-flex rounded-lg bg-[#6A1B9A] w-11 p-3">
                                    <Icon className="h-4 w-4 text-white" />
                                </div>

                                <div className="text-lg font-semibold text-[#6A1B9A] ">
                                    {feature.title}
                                </div>
                                <div className="text-base text-gray-600">{feature.description}</div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
