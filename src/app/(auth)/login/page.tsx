'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { Card, Button, Input } from '../../../components/ui/design-system';
import { Terminal, Shield } from 'lucide-react';

export default function LoginPage() {
  const { loginBypass, isLoading } = useAuth();
  const [username, setUsername] = useState('Hackathon Developer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      loginBypass(username);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Background ambient glowing radial effects */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 glass-panel border-border/60 relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-3.5 bg-primary/10 text-primary border border-primary/25 rounded-2xl">
            <Terminal className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Access AegisOS
          </h1>
          <p className="text-xs text-muted-foreground">
            Enterprise Multi-Agent Platform Orchestrator Console
          </p>
        </div>

        {/* Bypass Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Operator Username
            </label>
            <Input
              type="text"
              placeholder="e.g. hackathon-dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            <Shield className="h-4 w-4" />
            Initialize Operations Session
          </Button>
        </form>

        {/* Subfooter */}
        <div className="pt-4 border-t border-border/30 text-center">
          <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase">
            Designed for hackathon speed & scalability
          </p>
        </div>
      </Card>
    </div>
  );
}
