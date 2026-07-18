import React from 'react';
import { Dialog } from './ui/Dialog';

export function TermsModal({ isOpen, onClose }) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="AUP & TERMS_OF_SERVICE">
      <div className="space-y-3 font-mono text-xs text-foreground font-bold">
        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3">
            <p className="leading-relaxed">
              BY AUTHENTICATING TO BLACKWALL//GHOST, USER AGREES TO ACCESS NETWORK ENDPOINTS STRICTLY FOR AUTHORIZED ACTIVITIES. MALICIOUS PACKET INJECTION, UNAUTHORIZED PORT SCANNING, AND UNAPPROVED COMMERCIAL RELAYING ARE LOGGED AND BLOCKED.
            </p>
          </div>
        </div>

        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3">
            <p className="leading-relaxed">
              SESSION DATA (CLIENT IP, MAC HASH, PACKET COUNT, CONNECTION DURATION) IS MONITORED BY OPNSENSE FIREWALL ROUTINES FOR SYSTEM INTEGRITY AND AUDIT LOGGING.
            </p>
          </div>
        </div>

        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-card p-3">
            <p className="leading-relaxed">
              QUALITY OF SERVICE (QOS) THROTTLING, TOKEN-BUCKET RATE LIMITS, AND IDLE TIMEOUTS ARE AUTOMATICALLY ENFORCED PER NETWORK ZONE CONFIGURATION.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
