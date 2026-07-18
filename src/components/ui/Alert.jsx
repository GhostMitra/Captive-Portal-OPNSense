import * as React from "react"
import { cn } from "@/lib/utils"

const alertVariants = {
  default: "bg-card text-card-foreground font-mono",
  destructive: "bg-card text-foreground font-mono border-l-4 border-destructive [&>svg]:text-destructive",
  success: "bg-card text-foreground font-mono border-l-4 border-foreground [&>svg]:text-foreground",
  warning: "bg-card text-foreground font-mono border-l-4 border-destructive [&>svg]:text-destructive",
  info: "bg-card text-foreground font-mono [&>svg]:text-foreground",
}

const alertWrapperVariants = {
  default: "bg-foreground",
  destructive: "bg-destructive",
  success: "bg-foreground",
  warning: "bg-destructive",
  info: "bg-foreground",
}

const Alert = React.forwardRef(({ className, wrapperClassName, variant = "default", children, ...props }, ref) => (
  <div className={cn("cp2077-btn-wrapper relative w-full", alertWrapperVariants[variant] || alertWrapperVariants.default, wrapperClassName)}>
    <div
      ref={ref}
      role="alert"
      className={cn(
        "cp2077-btn-inner relative w-full p-3 font-mono [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-3.5 [&>svg]:top-3.5 text-xs font-bold",
        alertVariants[variant] || alertVariants.default,
        variant === "destructive" && "[&>h5]:text-destructive",
        className
      )}
      {...props}
    >
      {/* Cyberpunk 4-Corner Crosshairs */}
      <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] font-black leading-none text-foreground select-none pointer-events-none">+</span>
      {children}
    </div>
  </div>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-black font-mono tracking-wider uppercase leading-none text-foreground", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[11px] font-mono leading-relaxed text-foreground font-medium", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
