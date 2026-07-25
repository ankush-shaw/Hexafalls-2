'use client';

import React, { useEffect } from 'react';
import { Settings, Sliders, Cpu } from 'lucide-react';

import { useAnalyticsStore } from '../../store/analyticsStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function SettingsPanel() {
  const { settings, updateSettings } = useAnalyticsStore();
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Settings', href: '/settings' }, { label: 'Platform & AI Preferences' }]);
  }, [setBreadcrumbs]);

  return (
    <PageContainer className="space-y-6 max-w-[1300px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-xl">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-foreground">Enterprise System & AI Configuration</h1>
          <p className="text-xs text-muted-foreground">Manage multi-agent execution preferences, LLM model selection, temperature, and notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Agent Configuration */}
        <div className="p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Cpu className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-extrabold text-foreground">AI Model & Multi-Agent Execution Settings</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-foreground block">Primary LLM Model Selection</label>
              <select
                value={settings.aiConfig.model}
                onChange={(e) =>
                  updateSettings({
                    aiConfig: { ...settings.aiConfig, model: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-border/50 bg-card text-foreground font-semibold cursor-pointer"
              >
                <option value="Gemini 2.5 Flash / Pro Hybrid">Gemini 2.5 Flash / Pro Hybrid (Recommended)</option>
                <option value="Gemini 2.5 Pro Ultra Deep Reasoning">Gemini 2.5 Pro Ultra Deep Reasoning</option>
                <option value="Gemini Flash 2.5 High Throughput">Gemini Flash 2.5 High Throughput</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-foreground">Temperature (Creativity):</span>
                <span className="text-primary font-bold">{settings.aiConfig.temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.aiConfig.temperature}
                onChange={(e) =>
                  updateSettings({
                    aiConfig: { ...settings.aiConfig, temperature: Number(e.target.value) },
                  })
                }
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="font-bold text-foreground">Auto-Approve Confidence Threshold:</span>
                <span className="text-emerald-400 font-bold">{settings.aiConfig.autoApproveConfidence}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                step="1"
                value={settings.aiConfig.autoApproveConfidence}
                onChange={(e) =>
                  updateSettings({
                    aiConfig: { ...settings.aiConfig, autoApproveConfidence: Number(e.target.value) },
                  })
                }
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-muted rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* General & Preferences */}
        <div className="p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Sliders className="h-5 w-5 text-sky-400" />
            <h3 className="text-sm font-extrabold text-foreground">Platform & Localization Preferences</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-foreground block">Timezone</label>
              <select
                value={settings.general.timezone}
                onChange={(e) =>
                  updateSettings({
                    general: { ...settings.general, timezone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-border/50 bg-card text-foreground font-semibold cursor-pointer"
              >
                <option value="UTC -05:00 (EST)">UTC -05:00 (EST)</option>
                <option value="UTC +00:00 (GMT)">UTC +00:00 (GMT)</option>
                <option value="UTC +05:30 (IST)">UTC +05:30 (IST)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-foreground">Enable Voice Interaction Engine</h4>
                <p className="text-[10px] text-muted-foreground">Voice input & audio feedback synthesis</p>
              </div>
              <input
                type="checkbox"
                checked={settings.aiConfig.enableVoice}
                onChange={(e) =>
                  updateSettings({
                    aiConfig: { ...settings.aiConfig, enableVoice: e.target.checked },
                  })
                }
                className="h-4 w-4 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default SettingsPanel;
