import React, { useState } from 'react';
import { User, KeyRound, Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle2, ShieldAlert, Binary } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { Alert, AlertTitle, AlertDescription } from './ui/Alert';
import { authenticate } from '../lib/opnsense';
import { cn } from '../lib/utils';

export function LoginCard({ onLoginSuccess, onOpenTerms, initialError }) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialError || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [identityError, setIdentityError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIdentityError(false);
    setPasswordError(false);
    setTermsError(false);

    if (!identity.trim()) {
      setIdentityError(true);
      setErrorMessage('REQUIRED_FIELD // USER IDENTIFIER OR VOUCHER PASSCODE MISSING.');
      return;
    }

    if (!password.trim()) {
      setPasswordError(true);
      setErrorMessage('REQUIRED_FIELD // SYS_PASSKEY MISSING.');
      return;
    }

    if (!agreedTerms) {
      setTermsError(true);
      setErrorMessage('REQUIRED_FIELD // AUP ACCEPTANCE REQUIRED BEFORE ROUTING.');
      return;
    }

    setIsLoading(true);

    try {
      const cleanIdentity = identity.trim();
      let credentials = {};

      if (cleanIdentity.toLowerCase() === 'guest') {
        credentials = { isGuest: true };
      } else if (!password && cleanIdentity.length >= 4) {
        credentials = { voucher: cleanIdentity };
      } else {
        credentials = { user: cleanIdentity, password };
      }

      const res = await authenticate(credentials);

      if (res.success) {
        setSuccessMessage(res.message || 'ACCESS GRANTED. INITIALIZING ROUTE...');
        setTimeout(() => {
          onLoginSuccess(res);
        }, 1000);
      } else if (res.fallbackForm) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '$PORTAL_ACTION$';
        const fields = {
          redirurl: '$PORTAL_REDIRURL$',
          zone: '$PORTAL_ZONE$',
          auth_user: cleanIdentity,
          auth_pass: password || '',
          accept: 'Connect'
        };
        for (const [key, val] of Object.entries(fields)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = val;
          form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
      } else {
        setErrorMessage(res.error || 'ACCESS DENIED. INVALID CREDENTIAL TOKEN.');
      }
    } catch (err) {
      setErrorMessage('SYSTEM FAULT. UNABLE TO COMPLETE AUTH.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full font-mono bg-card text-card-foreground">
      <CardHeader className="text-center pb-3 border-b-2 border-foreground relative">
        <div className="absolute top-2 left-3 text-[9px] text-muted-foreground font-mono flex items-center gap-1">
          <Binary className="w-3 h-3" />
          <span>[ 01 // AUTH_NODE ]</span>
        </div>
        <div className="absolute top-2 right-3 text-[9px] text-muted-foreground font-mono">
          <span>SEC_LEVEL: 05</span>
        </div>

        <div className="cp2077-sm-wrapper mx-auto mb-2 mt-4">
          <div className="cp2077-sm-inner flex h-9 w-9 items-center justify-center bg-card text-foreground font-black">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>
        <CardTitle className="text-xl font-black tracking-widest uppercase text-foreground flex items-center justify-center gap-2">
          <span>SYS // AUTHENTICATION</span>
        </CardTitle>
        <CardDescription className="text-[11px] text-muted-foreground font-bold">
          GATEWAY // <span className="text-foreground font-black font-mono">BLACKWALL//GHOST</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {errorMessage && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertCircle className="h-4 w-4 text-foreground" />
            <AlertTitle>[ ERR // ACCESS_DENIED ]</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" className="animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-foreground" />
            <AlertTitle>[ OK // AUTHORIZED ]</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <Label htmlFor="identity" className={cn("font-black tracking-widest text-[11px]", identityError ? "text-destructive" : "text-foreground")}>
                &gt; SYS_USR_ID / VOUCHER_TOKEN
              </Label>
              <span className={cn("font-mono", identityError ? "text-destructive" : "text-muted-foreground")}>[ INPUT_01 ]</span>
            </div>
            <Input
              id="identity"
              type="text"
              placeholder="usr_identifier / voucher_token"
              icon={User}
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value);
                if (identityError) setIdentityError(false);
              }}
              disabled={isLoading}
              autoComplete="username"
              error={identityError}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <Label htmlFor="password" className={cn("font-black tracking-widest text-[11px]", passwordError ? "text-destructive" : "text-foreground")}>
                &gt; SYS_PASSKEY
              </Label>
              <span className={cn("font-mono", passwordError ? "text-destructive" : "text-muted-foreground")}>[ INPUT_02 ]</span>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              icon={KeyRound}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(false);
              }}
              disabled={isLoading}
              autoComplete="current-password"
              error={passwordError}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 font-mono text-[10px]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          {/* TERMS & CONDITIONS CHECKBOX */}
          <div className={cn("cp2077-btn-wrapper w-full", termsError && "bg-destructive")}>
            <div className="cp2077-btn-inner w-full flex items-center gap-2.5 font-mono bg-background p-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => {
                  setAgreedTerms(e.target.checked);
                  if (termsError) setTermsError(false);
                }}
                className={cn(
                  "h-4 w-4 rounded-none border-2 bg-background cursor-pointer shrink-0 accent-destructive",
                  termsError ? "border-destructive text-destructive" : "border-foreground text-foreground accent-foreground"
                )}
              />
              <label
                htmlFor="terms"
                className={cn(
                  "text-[11px] font-bold leading-none cursor-pointer select-none flex items-center gap-1.5 flex-wrap",
                  termsError ? "text-destructive" : "text-foreground"
                )}
              >
                <span>ACCEPT</span>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className={cn(
                    "underline font-black uppercase cursor-pointer hover:opacity-75",
                    termsError ? "text-destructive" : "text-foreground"
                  )}
                >
                  TERMS_OF_SERVICE & AUP
                </button>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="w-full mt-2 font-black font-mono tracking-widest uppercase"
            isLoading={isLoading}
            showHatch={false}
          >
            <span>[ INITIATE_ACCESS // POST ]</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-between border-t-2 border-foreground py-3 text-[10px] text-muted-foreground uppercase font-mono font-bold">
        <span>BWN_CITY // TERMINAL NODE</span>
        <span className="font-mono text-foreground font-black">[ ||||| v27.1_STABLE ]</span>
      </CardFooter>
    </Card>
  );
}
