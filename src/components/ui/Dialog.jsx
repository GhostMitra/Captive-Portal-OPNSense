import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

const Dialog = ({ isOpen, onClose, title, children, className }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in font-mono">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Content with Cyberpunk 2077 Chamfer Box */}
      <div className="cp2077-wrapper relative z-50 w-full max-w-xl">
        <div
          className={cn(
            "cp2077-inner bg-card p-6 max-h-[85vh] flex flex-col overflow-hidden text-card-foreground",
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-foreground">
            <h3 className="text-sm sm:text-base font-black font-mono tracking-widest uppercase text-foreground flex items-center gap-2">
              <span className="text-muted-foreground">[ // ]</span>
              {title}
            </h3>

            {/* Top Right Square X Close Button */}
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 flex items-center justify-center text-foreground font-black shrink-0"
              title="Close window"
              showHatch={false}
            >
              <X className="w-4 h-4 stroke-[3]" />
            </Button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto py-4 text-xs font-mono text-foreground font-bold leading-relaxed pr-2 space-y-3">
            {children}
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t-2 border-foreground flex justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              size="default"
              className="font-black tracking-widest uppercase"
              showHatch={false}
            >
              <span>[ CLOSE_WINDOW ]</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dialog }
