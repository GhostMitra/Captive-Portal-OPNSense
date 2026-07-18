import React from 'react';
import { Dialog } from './ui/Dialog';
import { Ticket, RefreshCw, Terminal } from 'lucide-react';

export function FaqModal({ isOpen, onClose }) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="SYSTEM // HELP_DIAGNOSTICS">
      <div className="space-y-3 text-xs font-mono">
        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3 flex gap-3 items-start w-full">
            <Ticket className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-foreground mb-0.5 uppercase">&gt; VOUCHER PASSCODE ISSUANCE</h5>
              <p className="text-muted-foreground text-[11px]">
                Vouchers are generated via OPNsense voucher manager. Format: 8 alphanumeric characters (e.g. <code className="text-foreground">A8X9-4K2P</code>).
              </p>
            </div>
          </div>
        </div>

        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3 flex gap-3 items-start w-full">
            <Terminal className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-foreground mb-0.5 uppercase">&gt; RE-AUTHENTICATION PROMPT</h5>
              <p className="text-muted-foreground text-[11px]">
                If session timeout or hard quota limit occurs, re-enter your account passkey or voucher token to resume routing.
              </p>
            </div>
          </div>
        </div>

        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3 flex gap-3 items-start w-full">
            <RefreshCw className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-foreground mb-0.5 uppercase">&gt; DNS / ROUTING TROUBLESHOOTING</h5>
              <p className="text-muted-foreground text-[11px]">
                If redirection fails, temporarily bypass custom DNS overrides (DoH / DoT) on client device until gateway token is validated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
