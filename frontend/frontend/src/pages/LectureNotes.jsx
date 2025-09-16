import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LectureNotes = ({ role, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/notes')
      .then(res => {
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch notes');
        setIsLoading(false);
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('course', course);
    formData.append('year', year);
    formData.append('file', file);
    try {
      await api.post('/notes', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Refresh notes
      api.get('/notes').then(res => setNotes(res.data));
    } catch (err) {
      setError('Upload failed');
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
            <i className="fas fa-book-open text-2xl"></i>
            <span className="text-xl font-bold">Lecture Notes</span>
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
          <h1 className="text-2xl font-bold jkuat-text mb-4">Lecture Notes Repository</h1>
          
          {role === 'lecturer' && (
            <form onSubmit={handleUpload} className="mb-6">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="form-input mb-2" required />
              <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" className="form-input mb-2" required />
              <input value={year} onChange={(e) => setYear(e.target.value)} type="number" placeholder="Year" className="form-input mb-2" required />
              <input onChange={(e) => setFile(e.target.files[0])} type="file" required />
              <button type="submit" className="jkuat-bg text-white px-4 py-2 rounded-md mt-2">Upload Note</button>
            </form>
          )}
          
          <div className="mb-6">
            {/* Filters/search as before */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <div key={note.id} className="border rounded-lg p-4 card-hover">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{note.course}</span>
                  <span className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-3">Year: {note.year}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Uploaded by ID: {note.uploadedBy}</span>
                  <a href={note.fileUrl} download className="jkuat-bg text-white px-3 py-1 rounded text-sm">Download</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureNotes;