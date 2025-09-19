import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    navigate(`/${role}-login`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <i className="fas fa-graduation-cap text-4xl jkuat-text"></i>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            JKUAT Student Hub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in as...
          </p>
        </div>
        <div className="space-y-4">
          <button onClick={() => selectRole('student')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white jkuat-bg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Student
          </button>
          <button onClick={() => selectRole('class_rep')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white class-rep-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            Class Rep
          </button>
          <button onClick={() => selectRole('lecturer')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white lecturer-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Lecturer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;