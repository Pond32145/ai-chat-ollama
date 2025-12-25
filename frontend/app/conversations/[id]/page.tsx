'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '../../components/ChatWindow';

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id as string;

  return (
    <div className="chat-page">
      <ChatWindow conversationId={conversationId} />
    </div>
  );
}

