import React from 'react';

export function Footer({ onOpenTerms, onOpenHelp }) {
  return (
    <footer className="w-full border-t-2 border-foreground bg-card py-4 text-center text-[10px] font-mono font-bold text-muted-foreground uppercase transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} BLACKWALL//GHOST // SECURE GATEWAY</p>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTerms}
            className="hover:text-foreground transition-colors cursor-pointer text-foreground font-black"
          >
            [ TERMS_OF_SERVICE ]
          </button>
          <span>//</span>
          <button
            onClick={onOpenHelp}
            className="hover:text-foreground transition-colors cursor-pointer text-foreground font-black"
          >
            [ HELP_DIAGNOSTICS ]
          </button>
        </div>
      </div>
    </footer>
  );
}
