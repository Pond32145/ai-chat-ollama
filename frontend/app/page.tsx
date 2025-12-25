'use client';

import { useRouter } from 'next/navigation';
import ChatWindow from './components/ChatWindow';

export default function Home() {
  const router = useRouter();

  const handleConversationCreated = (id: string) => {
    router.push(`/conversations/${id}`);
  };

  return (
    <div className="chat-page">
      <ChatWindow conversationId={null} onConversationCreated={handleConversationCreated} />
    </div>
  );
}
