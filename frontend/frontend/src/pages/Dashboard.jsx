import React from 'react';

const Dashboard = ({ onShowPage, onLogout }) => {
  return (
    <div>
      <nav className="jkuat-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-graduation-cap text-2xl"></i>
            <span className="text-xl font-bold">JKUAT Student Hub</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <i className="fas fa-bell text-xl"></i>
              <div className="notification-dot"></div>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://ui-avatars.com/api/?name=Imbeka+Musa&background=4caf50&color=fff" alt="User" className="w-8 h-8 rounded-full" />
              <span>Imbeka Musa</span>
            </div>
            <button onClick={onLogout} className="ml-4 text-white hover:text-green-200">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold jkuat-text mb-2">Welcome back, Imbeka!</h1>
          <p className="text-gray-600">Computer Science - Year 3</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
              <i className="fas fa-star mr-2"></i>
              <span>Points: 245</span>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center">
              <i className="fas fa-book mr-2"></i>
              <span>Courses: 6</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full flex items-center">
              <i className="fas fa-users mr-2"></i>
              <span>Groups: 3</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-5 card-hover cursor-pointer" onClick={() => onShowPage('lecture-notes')}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
                <i className="fas fa-book-open text-xl"></i>
              </div>
              <h3 className="font-bold text-lg">Lecture Notes</h3>
            </div>
            <p className="text-gray-600">Access course notes and study materials</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 card-hover cursor-pointer" onClick={() => onShowPage('study-groups')}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
                <i className="fas fa-users text-xl"></i>
              </div>
              <h3 className="font-bold text-lg">Study Groups</h3>
            </div>
            <p className="text-gray-600">Join or create study groups</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 card-hover cursor-pointer" onClick={() => onShowPage('group-chat')}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-3">
                <i className="fas fa-comments text-xl"></i>
              </div>
              <h3 className="font-bold text-lg">Group Chat</h3>
            </div>
            <p className="text-gray-600">Real-time messaging with your groups</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 card-hover cursor-pointer" onClick={() => onShowPage('ai-assistant')}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <h3 className="font-bold text-lg">AI Assistant</h3>
            </div>
            <p className="text-gray-600">Get help with your academic questions</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold jkuat-text mb-4">Recent Announcements</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold">Data Structures Exam</h3>
              <p className="text-gray-600">The exam venue has changed to LT2</p>
              <p className="text-sm text-gray-500">Posted by Dr. Omondi • 2 hours ago</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold">Group Project Submission</h3>
              <p className="text-gray-600">Deadline extended to Friday 5PM</p>
              <p className="text-sm text-gray-500">Posted by Prof. Kamau • 1 day ago</p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="font-semibold">Urgent: Class Meeting</h3>
              <p className="text-gray-600">All CS Year 3 students meeting tomorrow at 10AM</p>
              <p className="text-sm text-gray-500">Posted by Class Rep • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;