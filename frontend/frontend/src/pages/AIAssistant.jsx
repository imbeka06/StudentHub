import React from 'react';

const AIAssistant = ({ onShowPage, onLogout }) => {
  return (
    <div>
      <nav className="jkuat-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={() => onShowPage('dashboard')} className="text-white mr-2">
              <i className="fas fa-arrow-left"></i>
            </button>
            <i className="fas fa-robot text-2xl"></i>
            <span className="text-xl font-bold">AI Assistant</span>
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
          <h1 className="text-2xl font-bold jkuat-text mb-6">AI Learning Assistant</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="border rounded-lg mb-6">
                <div className="border-b p-4 bg-gray-50">
                  <h3 className="font-semibold">Chat with AI Assistant</h3>
                  <p className="text-sm text-gray-500">Ask questions about your courses and get instant help</p>
                </div>
                
                <div className="p-4 h-96 overflow-y-auto">
                  {/* Chat messages */}
                </div>
                
                <div className="border-t p-4">
                  <div className="flex">
                    <input type="text" placeholder="Type your question..." className="form-input flex-grow rounded-r-none" />
                    <button className="jkuat-bg text-white px-4 py-2 rounded-r-md">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {/* Suggested questions */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;