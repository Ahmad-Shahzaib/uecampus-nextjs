import { Card } from "@/components/ui/card"

interface StatCardProps {
  stat: string
  title: string
  description: string
  variant: "dark" | "light"
}

export function StatCard({ stat, title, description, variant }: StatCardProps) {
  const isDark = variant === "dark"

  return (
    <Card
      className={`rounded-3xl p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg ${
        isDark ? "bg-slate-900 border-0 text-white" : "bg-white border-2 border-gray-300 text-gray-900"
      }`}
      role="region"
      aria-label={`${title}: ${stat}`}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-5xl sm:text-6xl font-bold text-gray-400">{stat}</span>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}
