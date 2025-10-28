import { Card } from "@/components/ui/card"

export interface FeatureCardProps {
  title: string
  description: string
  variant: "primary" | "secondary" | "tertiary"
}

export function FeatureCard({ title, description, variant }: FeatureCardProps) {
  const variantStyles = {
    primary: {
      container: "bg-gradient-to-br from-purple-600 to-purple-700 text-white",
      title: "text-white",
      description: "text-purple-100",
    },
    secondary: {
      container: "bg-slate-900 text-white",
      title: "text-white",
      description: "text-slate-300",
    },
    tertiary: {
      container: "bg-slate-100",
      title: "text-purple-600",
      description: "text-slate-700",
    },
  }

  const styles = variantStyles[variant]

  return (
    <Card
      className={`${styles.container} border-0 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="space-y-4">
        <h2 className={`${styles.title} text-2xl md:text-3xl font-semibold leading-tight text-balance`}>{title}</h2>
        <p className={`${styles.description} text-sm md:text-base leading-relaxed`}>{description}</p>
      </div>
    </Card>
  )
}
