import React, { useState, useEffect } from 'react';
import { Terminal, Clock, Download, Upload, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { logoutSession, checkSessionStatus } from '../lib/opnsense';

export function StatusCard({ sessionData, contextInfo, onLogout }) {
  const [status, setStatus] = useState(sessionData || {
    user: 'OPERATOR',
    sessionTimeout: 3600,
    bytesIn: 1048576,
    bytesOut: 5242880,
  });

  const [timeLeft, setTimeLeft] = useState(status.sessionTimeout || 3600);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const formatTimer = (seconds) => {
    if (!seconds || seconds <= 0) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
      h > 0 ? String(h).padStart(2, '0') : null,
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0.00 MB';
    const k = 1024;
    const sizes = ['BYTES', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    const pollInterval = setInterval(async () => {
      const live = await checkSessionStatus();
      if (live && live.authorized) {
        setStatus((prev) => ({ ...prev, ...live }));
        if (live.sessionTimeout) setTimeLeft(live.sessionTimeout);
      }
    }, 15000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(pollInterval);
    };
  }, []);

  const handleLogout = async () => {
    setIsDisconnecting(true);
    await logoutSession();
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  const handleContinue = () => {
    window.location.href = contextInfo.redirurl || 'https://google.com';
  };

  return (
    <Card className="w-full font-mono bg-card text-card-foreground">
      <CardHeader className="text-center pb-2 border-b-2 border-foreground">
        <div className="cp2077-sm-wrapper mx-auto mb-2">
          <div className="cp2077-sm-inner flex h-9 w-9 items-center justify-center bg-card text-foreground font-black">
            <Terminal className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="default" className="px-3 py-1 font-black">
            [ SECURE_LINK_ACTIVE ]
          </Badge>
        </div>
        <CardTitle className="text-xl font-black tracking-widest uppercase mt-2 text-foreground">
          ACTIVE_ROUTE // STATUS_OK
        </CardTitle>
        <CardDescription className="text-[11px] text-muted-foreground font-bold font-mono">
          NET // <strong className="text-foreground font-black font-mono">BLACKWALL//GHOST</strong> | USR // <strong className="text-foreground font-black">{status.user || 'OPERATOR'}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Countdown Timer Display HUD */}
        <div className="cp2077-btn-wrapper w-full">
          <div className="cp2077-btn-inner bg-background p-5 text-center w-full">
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-foreground animate-spin" style={{ animationDuration: '6s' }} />
              SESSION_TIMEOUT // T-MINUS
            </div>
            <div className="font-mono text-4xl sm:text-5xl font-black tracking-widest text-foreground py-1">
              {formatTimer(timeLeft)}
            </div>
            <div className="text-[9px] text-muted-foreground font-bold tracking-widest mt-1">
              [ |||||||||||||||||||||||||||||||| ] 100% ROUTE_STABLE
            </div>
          </div>
        </div>

        {/* Network Metrics Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="cp2077-btn-wrapper w-full">
            <div className="cp2077-btn-inner bg-card p-3 w-full">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase font-mono mb-1">
                <Download className="w-3.5 h-3.5 text-foreground" />
                RX // TELEMETRY
              </div>
              <div className="font-mono text-base font-black text-foreground">
                {formatBytes(status.bytesOut || 5242880)}
              </div>
            </div>
          </div>

          <div className="cp2077-btn-wrapper w-full">
            <div className="cp2077-btn-inner bg-card p-3 w-full">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase font-mono mb-1">
                <Upload className="w-3.5 h-3.5 text-foreground" />
                TX // TELEMETRY
              </div>
              <div className="font-mono text-base font-black text-foreground">
                {formatBytes(status.bytesIn || 1048576)}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons (Stacked one below another) */}
        <div className="flex flex-col items-stretch gap-3 pt-2">
          <Button
            onClick={handleContinue}
            variant="outline"
            size="lg"
            className="w-full font-black flex items-center justify-center"
            showHatch={false}
          >
            <span>[ PROCEED_TO_NET ]</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            size="lg"
            isLoading={isDisconnecting}
            className="w-full font-black flex items-center justify-center"
            showHatch={false}
          >
            <LogOut className="w-4 h-4 mr-1" />
            <span>[ DISCONNECT ]</span>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t-2 border-foreground py-3 text-[10px] text-muted-foreground uppercase font-mono font-bold gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-foreground" />
        ACTIVE SECURE TUNNEL // KERNEL
      </CardFooter>
    </Card>
  );
}
