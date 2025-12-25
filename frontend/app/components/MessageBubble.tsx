'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${role}`}>
      <div className="message-content">{content}</div>
    </div>
  );
}

