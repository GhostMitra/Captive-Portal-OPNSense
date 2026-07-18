import React, { useState } from 'react';
import { Terminal, Copy, Check, Radio } from 'lucide-react';
import { Badge } from './ui/Badge';

export function NetworkInfo({ contextInfo }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="cp2077-card-wrapper w-full">
      <div className="cp2077-card-inner relative flex flex-wrap items-center justify-between gap-3 bg-card p-3 font-mono text-[11px] text-foreground transition-colors duration-200">
        {/* Cyberpunk 4-Corner Crosshairs */}
        <span className="absolute -top-2 -left-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
        <span className="absolute -top-2 -right-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
        <span className="absolute -bottom-2 -left-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>
        <span className="absolute -bottom-2 -right-2 font-mono text-xs font-black leading-none text-foreground select-none pointer-events-none">+</span>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-foreground font-mono font-bold">
          <Radio className="h-3.5 w-3.5 text-foreground animate-pulse shrink-0" />
          <span className="text-muted-foreground">// IP:</span>
          <strong className="text-foreground font-black">[ {contextInfo.clientIp} ]</strong>
          <button
            onClick={() => copyToClipboard(contextInfo.clientIp, 'ip')}
            className="hover:opacity-75 transition-colors p-0.5 text-foreground cursor-pointer"
            title="Copy IP"
          >
            {copiedField === 'ip' ? <Check className="h-3 w-3 text-foreground" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-foreground font-mono font-bold">
          <span className="text-muted-foreground">// MAC:</span>
          <strong className="text-foreground font-black">[ {contextInfo.clientMac} ]</strong>
          <button
            onClick={() => copyToClipboard(contextInfo.clientMac, 'mac')}
            className="hover:opacity-75 transition-colors p-0.5 text-foreground cursor-pointer"
            title="Copy MAC"
          >
            {copiedField === 'mac' ? <Check className="h-3 w-3 text-foreground" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>

        <div className="flex items-center gap-1.5 font-mono font-bold">
          <span className="text-muted-foreground">// ZONE:</span>
          <strong className="text-foreground font-black">[ {contextInfo.zone} ]</strong>
        </div>
      </div>

      <div>
        {contextInfo.isLocalDev ? (
          <Badge variant="outline" className="text-foreground font-black">
            [ DEV_SIMULATOR ]
          </Badge>
        ) : (
          <Badge variant="default" className="font-black">
            [ NET_ONLINE ]
          </Badge>
        )}
      </div>
    </div>
  </div>
  );
}
