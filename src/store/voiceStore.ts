import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface VoiceState {
  isRecording: boolean;
  isListening: boolean; // For wake word / ongoing Web Speech API
  transcription: string;
  interimTranscript: string;
  volumeLevel: number; // 0 to 100
  audioUrl: string | null;
  error: string | null;
}

interface VoiceActions {
  setRecording: (isRecording: boolean) => void;
  setListening: (isListening: boolean) => void;
  setTranscription: (text: string) => void;
  setInterimTranscript: (text: string) => void;
  setVolumeLevel: (level: number) => void;
  setAudioUrl: (url: string | null) => void;
  setError: (error: string | null) => void;
  resetVoiceState: () => void;
}

type VoiceStore = VoiceState & VoiceActions;

const initialState: VoiceState = {
  isRecording: false,
  isListening: false,
  transcription: '',
  interimTranscript: '',
  volumeLevel: 0,
  audioUrl: null,
  error: null,
};

export const useVoiceStore = create<VoiceStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setRecording: (isRecording) => set({ isRecording }),
      setListening: (isListening) => set({ isListening }),
      setTranscription: (transcription) => set({ transcription }),
      setInterimTranscript: (interimTranscript) => set({ interimTranscript }),
      setVolumeLevel: (volumeLevel) => set({ volumeLevel }),
      setAudioUrl: (audioUrl) => set({ audioUrl }),
      setError: (error) => set({ error }),
      resetVoiceState: () => set(initialState),
    }),
    { name: 'VoiceStore' }
  )
);
