import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { UniversitySelector } from './components/UniversitySelector';
import { StudentLogin } from './components/StudentLogin';
import { Dashboard } from './components/Dashboard';
import { University } from './types';

function App() {
  const [university, setUniversity] = useState<University | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  // Simple state-based routing logic for the single page flow
  // 1. Select Uni -> 2. Login -> 3. Dashboard

  const handleUniSelect = (uni: University) => {
    setUniversity(uni);
  };

  const handleLogin = (id: string) => {
    setStudentId(id);
  };

  const handleLogout = () => {
    setStudentId(null);
    setUniversity(null);
  };

  const handleBackToSelector = () => {
    setUniversity(null);
  }

  // View Controller
  if (!university) {
    return <UniversitySelector onSelect={handleUniSelect} />;
  }

  if (!studentId) {
    return (
        <StudentLogin 
            university={university} 
            onLogin={handleLogin} 
            onBack={handleBackToSelector} 
        />
    );
  }

  return (
    <HashRouter>
      <Dashboard 
        university={university} 
        studentId={studentId} 
        onLogout={handleLogout} 
      />
    </HashRouter>
  );
}

export default App;
