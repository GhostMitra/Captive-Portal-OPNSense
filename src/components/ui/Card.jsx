import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, wrapperClassName, children, ...props }, ref) => (
  <div className={cn("cp2077-card-wrapper w-full", wrapperClassName)}>
    <div
      ref={ref}
      className={cn(
        "cp2077-card-inner bg-card text-card-foreground relative p-1 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {/* Cyberpunk 4-Corner Crosshairs */}
      <span className="absolute -top-2 -left-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -top-2 -right-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -bottom-2 -left-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
      <span className="absolute -bottom-2 -right-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
      {children}
    </div>
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 pb-3 border-b-2 border-foreground bg-muted/40", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-black font-mono tracking-widest uppercase text-foreground flex items-center justify-center gap-2",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs font-mono text-muted-foreground leading-relaxed font-bold tracking-wider", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-4", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0 font-mono text-[10px] text-muted-foreground font-bold tracking-widest", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
