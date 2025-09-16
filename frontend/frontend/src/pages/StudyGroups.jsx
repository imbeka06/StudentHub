// client/src/pages/StudyGroups.jsx (Refined with dynamic fetching, loading/error, and create form)
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudyGroups = ({ role, onLogout }) => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/groups')
      .then(res => {
        setGroups(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch groups');
        setIsLoading(false);
      });
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/groups', { name, description, course });
      // Refresh groups
      api.get('/groups').then(res => setGroups(res.data));
    } catch (err) {
      setError('Create failed');
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
            <i className="fas fa-users text-2xl"></i>
            <span className="text-xl font-bold">Study Groups</span>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold jkuat-text mb-6">Study Groups</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {groups.map(group => (
              <div key={group.id} className="border rounded-lg p-5 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{group.members ? group.members.length : 0} members</span>
                </div>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Created: {new Date(group.createdAt).toLocaleDateString()}</span>
                  <button className="jkuat-bg text-white px-3 py-1 rounded text-sm">Open Group</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold jkuat-text mb-4">Create New Study Group</h2>
            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="form-input" placeholder="Enter group name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select value={course} onChange={(e) => setCourse(e.target.value)} className="form-input" required>
                    <option>Select a course</option>
                    <option>Data Structures</option>
                    <option>Web Technologies</option>
                    <option>Artificial Intelligence</option>
                    <option>Database Systems</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" rows="3" placeholder="Describe the purpose of this group" required />
              </div>
              <button type="submit" className="jkuat-bg text-white px-4 py-2 rounded-md">Create Group</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;