import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, wrapperClassName, type, icon: Icon, rightElement, error, ...props }, ref) => {
  return (
    <div className={cn("cp2077-btn-wrapper relative w-full", error ? "bg-destructive" : "", wrapperClassName)}>
      <div className="cp2077-btn-inner relative w-full h-full bg-background flex items-center">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground pointer-events-none z-10">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full bg-background px-3 py-2 text-xs font-mono font-black text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-150 border-none outline-none",
            Icon && "pl-10",
            rightElement && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
})
Input.displayName = "Input"

export { Input }
