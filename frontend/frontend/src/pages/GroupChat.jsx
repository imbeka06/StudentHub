// client/src/pages/GroupChat.jsx (Refined with dynamic fetching, loading/error, socket for real-time, and send form)
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const GroupChat = ({ role, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const groupId = '1';  // Hardcoded for prototype; in real, pass via props or URL param
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/chat/${groupId}`)
      .then(res => {
        setMessages(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch messages');
        setIsLoading(false);
      });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('message');
  }, [groupId]);

  const sendMessage = async () => {
    if (!message) return;
    try {
      await api.post('/chat', { content: message, group: groupId });
      socket.emit('message', message);  // Broadcast via socket
      setMessage('');
    } catch (err) {
      setError('Send failed');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <nav className="jkuat-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/dashboard')} className="text-white mr-2">
              <i className="fas fa-arrow-left"></i>
            </button>
            <i className="fas fa-comments text-2xl"></i>
            <span className="text-xl font-bold">Group Chat</span>
          </div>
          <div className="flex items-center space-x-4">
            <img src="https://ui-avatars.com/api/?name=Imbeka+Musa&background=4caf50&color=fff" alt="User" className="w-8 h-8 rounded-full" />
            <button onClick={onLogout} className="text-white hover:text-green-200">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold jkuat-text mb-6">Group Chats</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {/* Group selection - can add dynamic fetch if needed */}
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-3">Select a group to chat</h3>
                <div className="space-y-3">
                  {/* Static for now; fetch similarly if dynamic */}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="border rounded-lg">
                <div className="border-b p-4 bg-gray-50">
                  <h3 className="font-semibold">Data Structures Group</h3>
                  <p className="text-sm text-gray-500">12 members • 3 online</p>
                </div>
                
                <div className="p-4 h-96 overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-start">
                        <img src="https://ui-avatars.com/api/?name=User&background=4caf50&color=fff" alt="User" className="w-8 h-8 rounded-full mr-3" />
                        <div>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">User • {new Date(msg.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t p-4">
                  <div className="flex">
                    <input 
                      type="text" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Type your message..." 
                      className="form-input flex-grow rounded-r-none" 
                    />
                    <button onClick={sendMessage} className="jkuat-bg text-white px-4 py-2 rounded-r-md">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;