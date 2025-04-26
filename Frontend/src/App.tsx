import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />
        ) : (
          <Dashboard />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;