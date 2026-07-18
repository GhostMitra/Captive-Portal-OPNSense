import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
  outline: "bg-background text-foreground hover:bg-foreground hover:text-background font-black",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
  ghost: "bg-transparent text-foreground hover:bg-foreground hover:text-background",
  link: "text-foreground underline-offset-4 hover:underline font-black",
};

const buttonSizes = {
  default: "h-11 px-4 text-xs font-black",
  sm: "h-8 px-3 text-[10px] font-bold",
  lg: "h-12 px-6 text-sm font-black tracking-widest",
  icon: "h-9 w-9 p-0 justify-center",
};

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  isLoading = false,
  showHatch = true,
  wrapperClassName,
  children,
  disabled,
  ...props 
}, ref) => {
  const marginClasses = className?.match(/\b(m[tbrlxys]?-\S+)\b/g)?.join(" ") || "";
  const cleanClassName = className?.replace(/\b(m[tbrlxys]?-\S+)\b/g, "").trim();
  const isFullWidth = className?.includes("w-full");

  return (
    <div className={cn("cp2077-btn-wrapper inline-flex items-center justify-center", isFullWidth && "w-full", marginClasses, wrapperClassName)}>
      <button
        className={cn(
          "cp2077-btn-inner flex items-center justify-center font-mono uppercase tracking-widest transition-all duration-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer w-full h-full gap-2 border-0 outline-none",
          buttonVariants[variant] || buttonVariants.default,
          buttonSizes[size] || buttonSizes.default,
          cleanClassName
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2 font-mono">
            <span className="inline-block animate-spin font-mono">[ / ]</span>
            PROCESSING_DATA...
          </span>
        ) : (
          <>
            <span className="flex items-center justify-center gap-2 font-mono">{children}</span>
            {showHatch && size !== 'icon' && (
              <span className="flex items-center justify-center h-4 w-4 border border-current p-0.5 shrink-0 ml-1">
                <span className="h-full w-full cp2077-hatch block"></span>
              </span>
            )}
          </>
        )}
      </button>
    </div>
  )
})
Button.displayName = "Button"

export { Button }
