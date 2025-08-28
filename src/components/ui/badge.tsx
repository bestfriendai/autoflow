import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-automotive-red/30 bg-gradient-to-r from-automotive-red to-automotive-darkRed text-white shadow-lg shadow-automotive-red/20",
        secondary: "border-gray-600/50 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 shadow-lg shadow-gray-500/10",
        destructive: "border-red-500/50 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20",
        outline: "border-automotive-red/50 text-automotive-red bg-automotive-red/5 hover:bg-automotive-red/10",
        success: "border-automotive-green/50 bg-gradient-to-r from-automotive-green/80 to-green-600/80 text-white shadow-lg shadow-green-500/20",
        warning: "border-automotive-orange/50 bg-gradient-to-r from-automotive-orange/80 to-automotive-yellow/80 text-white shadow-lg shadow-orange-500/20",
        info: "border-automotive-blue/50 bg-gradient-to-r from-automotive-blue/80 to-blue-600/80 text-white shadow-lg shadow-blue-500/20",
        pending: "border-automotive-orange/50 bg-gradient-to-r from-automotive-orange/70 to-orange-500/70 text-white shadow-lg shadow-orange-500/20 animate-pulse",
        completed: "border-automotive-green/50 bg-gradient-to-r from-automotive-green/80 to-green-600/80 text-white shadow-lg shadow-green-500/20",
        cancelled: "border-red-500/50 bg-gradient-to-r from-red-600/80 to-red-700/80 text-white shadow-lg shadow-red-500/20",
        urgent: "border-red-500 bg-gradient-to-r from-red-500 to-red-600 text-white animate-neon-pulse shadow-2xl shadow-red-500/40",
        high: "border-automotive-orange/50 bg-gradient-to-r from-automotive-orange to-orange-600 text-white shadow-lg shadow-orange-500/30",
        medium: "border-automotive-yellow/50 bg-gradient-to-r from-automotive-yellow/80 to-yellow-600/80 text-black shadow-lg shadow-yellow-500/20",
        low: "border-gray-500/50 bg-gradient-to-r from-gray-600/80 to-gray-700/80 text-gray-100 shadow-lg shadow-gray-500/10",
        neon: "border-neon-red bg-transparent text-neon-red shadow-lg shadow-neon-red/30 hover:bg-neon-red/10",
        premium: "border-automotive-purple/50 bg-gradient-to-r from-automotive-purple/80 to-purple-600/80 text-white shadow-lg shadow-purple-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }