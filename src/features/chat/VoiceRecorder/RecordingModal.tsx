'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause, X, AlertTriangle, Globe } from 'lucide-react';
import { Waveform } from './Waveform';
import { TranscriptEditor } from './TranscriptEditor';
import { formatDuration } from '../../../utils/date.utils';
import { cn } from '../../../utils/cn';

interface ISpeechRecognitionResult {
  0: { transcript: string };
  isFinal: boolean;
}

interface ISpeechRecognitionEvent {
  results: {
    length: number;
    [index: number]: ISpeechRecognitionResult;
  };
}

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
}

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendTranscript: (transcript: string) => void;
}

export function RecordingModal({ isOpen, onClose, onSendTranscript }: RecordingModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [language, setLanguage] = useState('en-US');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Timer effect
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setDurationSeconds((s) => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  // Web Speech API initialization
  useEffect(() => {
    if (!isOpen) return;

    const win = window as unknown as {
      SpeechRecognition?: new () => ISpeechRecognition;
      webkitSpeechRecognition?: new () => ISpeechRecognition;
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event: ISpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: { error: string }) => {
        console.warn('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }

  }, [isOpen, language]);

  const startRecording = async () => {
    setPermissionError(null);
    setTranscript('');
    setDurationSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Ignore if already started
        }
      }
    } catch (err: unknown) {
      console.error('Microphone permission denied:', err);
      setPermissionError('Microphone access denied. Please allow microphone permissions in browser settings.');
    }

  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (isPaused) {
      mediaRecorderRef.current.resume();
      if (recognitionRef.current) recognitionRef.current.start();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current.pause();
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsPaused(true);
    }
  };

  const handleClose = () => {
    stopRecording();
    setTranscript('');
    onClose();
  };

  const handleSend = () => {
    if (transcript.trim()) {
      onSendTranscript(transcript.trim());
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          onClick={handleClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-popover shadow-2xl p-6 overflow-hidden space-y-5"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                <Mic className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold">Voice Input Engine</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border/50 text-[10px] font-medium bg-muted/40">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-foreground"
                >
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                  <option value="ja-JP">Japanese</option>
                </select>
              </div>

              <button
                onClick={handleClose}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {permissionError ? (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Microphone Error</p>
                <p className="mt-0.5 leading-relaxed">{permissionError}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Waveform & Duration Display */}
              <div className="flex flex-col items-center justify-center py-4 space-y-2 rounded-xl bg-card border border-border/40">
                <Waveform isRecording={isRecording} isPaused={isPaused} volumeLevel={isRecording ? 65 : 10} />
                <div className="text-xl font-mono font-bold tracking-wider text-foreground">
                  {formatDuration(durationSeconds)}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                  {isPaused ? 'Recording Paused' : isRecording ? 'Listening for speech...' : 'Ready to record'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/30 cursor-pointer scale-105"
                  >
                    <Mic className="h-5 w-5" /> Start Recording
                  </button>
                ) : (
                  <>
                    <button
                      onClick={togglePause}
                      className={cn(
                        'p-3 rounded-full border text-foreground transition-all cursor-pointer',
                        isPaused ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-muted border-border hover:bg-muted/80'
                      )}
                      title={isPaused ? 'Resume' : 'Pause'}
                    >
                      {isPaused ? <Play className="h-5 w-5 fill-amber-400" /> : <Pause className="h-5 w-5" />}
                    </button>

                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/30 cursor-pointer"
                    >
                      <Square className="h-4 w-4 fill-white" /> Stop
                    </button>
                  </>
                )}
              </div>

              {/* Live Transcript Preview */}
              <TranscriptEditor
                transcript={transcript}
                onChange={(txt) => setTranscript(txt)}
                onClear={() => setTranscript('')}
                onRetry={startRecording}
                onSend={handleSend}
                isTranscribing={isRecording}
              />
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default RecordingModal;
