import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-foreground text-background font-mono font-bold uppercase",
  secondary: "bg-secondary text-secondary-foreground font-mono font-bold uppercase",
  destructive: "bg-foreground text-background font-mono uppercase",
  outline: "text-foreground font-mono font-bold uppercase bg-background",
  success: "bg-foreground text-background font-mono font-bold uppercase",
}

function Badge({ className, wrapperClassName, variant = "default", ...props }) {
  return (
    <div className={cn("cp2077-sm-wrapper inline-flex items-center justify-center", wrapperClassName)}>
      <div
        className={cn(
          "cp2077-sm-inner inline-flex items-center px-2 py-0.5 text-[10px] font-bold font-mono tracking-wider transition-colors",
          badgeVariants[variant] || badgeVariants.default,
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Badge }
