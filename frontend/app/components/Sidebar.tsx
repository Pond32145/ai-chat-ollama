'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface Conversation {
  _id: string;
  title: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  // Refresh conversations when pathname changes (new conversation created)
  useEffect(() => {
    fetchConversations();
  }, [pathname]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/conversations`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    router.push('/');
  };

  const isActive = (id: string) => {
    return pathname === `/conversations/${id}`;
  };

  const isNewChatActive = pathname === '/';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button 
          className={`new-chat-button ${isNewChatActive ? 'active' : ''}`} 
          onClick={handleNewChat}
        >
          <span className="plus-icon">+</span>
          New Chat
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-title">My Chats</div>
        {isLoading ? (
          <div className="sidebar-loading">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="sidebar-empty">No conversations yet</div>
        ) : (
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <Link
                key={conversation._id}
                href={`/conversations/${conversation._id}`}
                className={`conversation-item ${isActive(conversation._id) ? 'active' : ''}`}
              >
                {conversation.title || 'New Conversation'}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

