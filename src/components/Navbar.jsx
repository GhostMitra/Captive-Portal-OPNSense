import React from 'react';
import { Sun, Moon, HelpCircle, Terminal, Cpu } from 'lucide-react';
import { Button } from './ui/Button';

export function Navbar({ theme, toggleTheme, onOpenHelp }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-foreground bg-card/95 backdrop-blur-md font-mono text-foreground transition-colors duration-200">
      {/* BWN_CITY HUD Telemetry Bar above header */}
      <div className="bg-foreground text-background text-[9px] px-4 py-0.5 font-black tracking-widest flex justify-between items-center border-b border-background select-none">
        <span>BWN_CITY_CORP_RECORD_DATABASE // 0x2710_AUTH</span>
        <span>SYS_STATUS: ONLINE</span>
      </div>

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="cp2077-btn-wrapper">
            <div className="cp2077-btn-inner flex h-8 w-8 items-center justify-center bg-foreground text-background font-black">
              <Terminal className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-foreground flex items-center gap-2 font-mono uppercase">
              [ BLACKWALL // GHOST ]
            </span>
            <p className="text-[10px] text-muted-foreground font-mono font-bold flex items-center gap-1.5">
              <span>SYS_VER 27.1</span>
              <span>::</span>
              <span className="text-foreground flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                NET_LINK <span className="animate-cursor font-black">_</span>
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="text-foreground whitespace-nowrap"
            title="Toggle Theme"
            showHatch={false}
          >
            {theme === 'dark' ? (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Sun className="h-3.5 w-3.5 shrink-0" />
                <span>[ LIGHT ]</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Moon className="h-3.5 w-3.5 shrink-0" />
                <span>[ DARK ]</span>
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenHelp}
            className="text-foreground whitespace-nowrap"
            title="System Info"
            showHatch={false}
          >
            <HelpCircle className="h-3.5 w-3.5 shrink-0" />
          </Button>
        </div>
      </div>
    </header>
  );
}
