'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Plus } from 'lucide-react';
import { useConversationStore } from '../../../store/conversationStore';
import { useChatStore } from '../../../store/chatStore';
import { useUIStore } from '../../../store/uiStore';
import { PageContainer } from '../../../components/shared/PageContainer';
import { PageHeader } from '../../../components/shared/PageHeader';

import {
  ConversationList,
  ChatMessage,
  TypingIndicator,
  PromptComposer,
  ActionBar,
  WelcomeScreen,
  PromptTemplates,
  RecordingModal,
  UploadZone,
} from '../../../features/chat';
import { ChatMessage as ChatMessageType, Attachment } from '../../../types/chat.types';

export default function AgentsPage() {
  const { setBreadcrumbs } = useUIStore();
  const {
    activeConversationId,
    conversations,
    createConversation,
    updateConversation,
  } = useConversationStore();

  const {
    getMessages,
    addMessage,
    deleteMessage,
    updateMessage,
    attachments,
    addAttachment,
    removeAttachment,
    clearAttachments,
    isGenerating,
    setGenerating,
  } = useChatStore();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [uploadZoneOpen, setUploadZoneOpen] = useState(false);

  const timelineEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBreadcrumbs([{ label: 'Agents', href: '/agents' }, { label: 'AI Workspace' }]);
  }, [setBreadcrumbs]);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeConvId = activeConv?.id || 'conv-1';
  const messages = getMessages(activeConvId);
  const currentAttachments = attachments[activeConvId] || [];
  const generating = isGenerating[activeConvId] || false;

  // Scroll to bottom when messages update
  useEffect(() => {
    timelineEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, generating]);

  // Message Handler: Adds user message + triggers mock AI Response for UI preview
  const handleSendMessage = (content: string, files: Attachment[]) => {
    if (!content.trim() && files.length === 0) return;

    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      role: 'user',
      content,
      attachments: files,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      senderName: 'Hackathon Admin',
    };

    addMessage(activeConvId, userMsg);
    clearAttachments(activeConvId);

    // Update conversation last snippet
    updateConversation(activeConvId, {
      lastMessageSnippet: content || `${files.length} file(s) attached`,
      messageCount: (activeConv?.messageCount || 0) + 1,
    });

    // Simulate Boss Agent streaming response
    setGenerating(activeConvId, true);
    setTimeout(() => {
      const assistantMsg: ChatMessageType = {
        id: `msg-${Date.now() + 1}`,
        conversationId: activeConvId,
        role: 'assistant',
        senderName: 'Boss Agent',
        agentRole: 'boss',
        content: `I have received your request:\n> "${content}"\n\nDecomposing query and allocating tasks to **Supervisor Agent** & active Worker nodes. Workflow payload prepared for execution.`,
        timestamp: new Date().toISOString(),
        status: 'delivered',
        reactions: { '🚀': 1 },
      };

      addMessage(activeConvId, assistantMsg);
      setGenerating(activeConvId, false);
      updateConversation(activeConvId, {
        messageCount: (activeConv?.messageCount || 0) + 2,
      });
    }, 1200);
  };

  return (
    <PageContainer animate={false} className="h-[calc(100vh-8.5rem)] flex flex-col space-y-0 -m-6">
      {/* Top Page Header */}
      <div className="px-6 pt-4 pb-3 border-b border-border/40 bg-card/40 backdrop-blur-sm shrink-0">
        <PageHeader
          title={activeConv?.title || 'AI Multi-Agent Workspace'}
          description="Interact naturally with Boss Agent, Supervisor, and Worker Agents."
          breadcrumbs={[{ label: 'Agents' }, { label: activeConv?.title || 'Workspace' }]}
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTemplatesModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-card hover:bg-muted text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Templates
              </button>
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Mic className="h-3.5 w-3.5" /> Voice Mode
              </button>
              <button
                onClick={() => createConversation()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" /> New Chat
              </button>
            </div>
          }
        />
      </div>

      {/* Workspace Split Layout: Conversation History Sidebar + Main Chat */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <ConversationList />

        {/* Main Conversation Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 bg-background/50">
          {/* Scrollable Message Timeline */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
            {messages.length === 0 ? (
              <WelcomeScreen
                onSelectPrompt={(promptText) => handleSendMessage(promptText, [])}
                onOpenTemplates={() => setTemplatesModalOpen(true)}
              />
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onDelete={(id) => deleteMessage(activeConvId, id)}
                    onEdit={() => {}}
                    onReact={(id, emoji) => {
                      const currentReactions = msg.reactions || {};
                      updateMessage(activeConvId, id, {
                        reactions: {
                          ...currentReactions,
                          [emoji]: (currentReactions[emoji] || 0) + 1,
                        },
                      });
                    }}
                  />
                ))}

                {generating && <TypingIndicator agentName="Boss Agent" />}
                <div ref={timelineEndRef} />
              </div>
            )}
          </div>

          {/* Upload Zone Collapse Drawer */}
          <AnimatePresence>
            {uploadZoneOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 py-2 border-t border-border/40 bg-card/60"
              >
                <UploadZone
                  onFilesSelected={(newFiles) => {
                    newFiles.forEach((file) => addAttachment(activeConvId, file));
                    setUploadZoneOpen(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Composer Area */}
          <div className="p-4 sm:p-6 border-t border-border/40 bg-card/30 backdrop-blur-md shrink-0 space-y-2 max-w-5xl mx-auto w-full">
            <PromptComposer
              onSend={handleSendMessage}

              onOpenVoiceModal={() => setVoiceModalOpen(true)}
              onOpenTemplatesModal={() => setTemplatesModalOpen(true)}
              onOpenUpload={() => setUploadZoneOpen((v) => !v)}
              attachments={currentAttachments}
              onRemoveAttachment={(id) => removeAttachment(activeConvId, id)}
              disabled={generating}
            />

            <ActionBar
              onOpenVoice={() => setVoiceModalOpen(true)}
              onOpenTemplates={() => setTemplatesModalOpen(true)}
              onOpenUpload={() => setUploadZoneOpen((v) => !v)}
            />
          </div>
        </div>
      </div>

      {/* Voice Recorder Modal */}
      <RecordingModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onSendTranscript={(transcriptText) => handleSendMessage(transcriptText, [])}
      />

      {/* Prompt Templates Library Modal */}
      <PromptTemplates
        isOpen={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        onSelectTemplate={(promptText) => handleSendMessage(promptText, [])}
      />
    </PageContainer>
  );
}
