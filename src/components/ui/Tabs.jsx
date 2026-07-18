import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext({ activeTab: '', setActiveTab: () => {} });

const Tabs = ({ defaultValue, value, onValueChange, children, className }) => {
  const [activeTab, setActiveTabState] = React.useState(value || defaultValue);

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTabState(value);
    }
  }, [value]);

  const setActiveTab = (val) => {
    setActiveTabState(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-11 w-full items-center justify-center rounded-none bg-neutral-950 p-1 text-neutral-400 border border-neutral-800 font-mono",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, children, icon: Icon, ...props }, ref) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-none px-3 py-1.5 text-xs font-bold font-mono tracking-wider transition-all duration-100 flex-1 gap-1.5 cursor-pointer select-none border uppercase",
        isActive
          ? "bg-white text-black border-white shadow-sm"
          : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-800",
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cn("w-3.5 h-3.5", isActive ? "text-black" : "text-neutral-500")} />}
      {children}
    </button>
  );
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "mt-4 focus-visible:outline-none animate-fade-in font-mono",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
