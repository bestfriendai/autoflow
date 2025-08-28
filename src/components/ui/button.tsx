import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-automotive-red to-automotive-darkRed text-white hover:from-automotive-darkRed hover:to-automotive-red transform hover:scale-[1.02] hover:shadow-xl hover:shadow-automotive-red/30",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-500/30",
        outline: "border-2 border-automotive-red/30 bg-transparent text-automotive-red hover:bg-automotive-red hover:text-white hover:border-automotive-red neon-button backdrop-blur-sm",
        secondary: "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 hover:shadow-xl hover:shadow-gray-500/20",
        ghost: "text-gray-300 hover:bg-automotive-red/10 hover:text-automotive-red backdrop-blur-sm",
        link: "text-automotive-red underline-offset-4 hover:underline hover:text-automotive-orange",
        automotive: "automotive-gradient text-white hover:shadow-2xl hover:shadow-automotive-red/40 transform hover:scale-[1.02] transition-all duration-300",
        success: "bg-gradient-to-r from-automotive-green to-green-600 text-white hover:from-green-500 hover:to-automotive-green hover:shadow-xl hover:shadow-green-500/30",
        warning: "bg-gradient-to-r from-automotive-orange to-automotive-yellow text-white hover:from-automotive-yellow hover:to-automotive-orange hover:shadow-xl hover:shadow-orange-500/30",
        neon: "neon-button bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-black hover:shadow-2xl hover:shadow-neon-red/50",
        premium: "premium-card bg-gradient-to-r from-purple-600 via-automotive-red to-automotive-orange text-white hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-[1.02]",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-12 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }