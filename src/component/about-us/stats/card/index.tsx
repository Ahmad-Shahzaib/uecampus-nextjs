import { Card } from "@/components/ui/card"

interface StatCardProps {
  stat: string
  title: string
  description: string
  variant?:any
}

export function StatCard({ stat, title, description, variant = "light" }: StatCardProps) {
  const isDark = variant === "dark"

  return (
    <Card
      className={`rounded-3xl p-5 sm:p-6 md:p-8 transition-shadow duration-300 hover:shadow-lg flex flex-col justify-between ${
        isDark
          ? "bg-slate-900 border-0 text-white"
          : "bg-white border-2 border-gray-200 text-gray-900"
      }`}
      role="region"
      aria-label={`${title}: ${stat}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Stat Number */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <span
            className={`font-bold leading-none ${
              isDark
                ? "text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                : "outline-text text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]"
            }`}
          >
            {stat}
          </span>
        </div>

        {/* Text Content */}
        <div className="flex flex-col text-left">
          <h2
            className={`font-semibold mb-1 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl ${
              isDark ? "text-white" : "text-[#1b232a]"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}
