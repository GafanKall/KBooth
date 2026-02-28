import { useState } from 'react';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Booth from './pages/Booth';
import Gallery from './pages/Gallery';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-700">
      <Toaster richColors position="top-center" />

      {currentPage === 'home' && (
        <Home
          onStart={() => setCurrentPage('booth')}
          onViewGallery={() => setCurrentPage('gallery')}
        />
      )}

      {currentPage === 'booth' && (
        <Booth onBack={() => setCurrentPage('home')} />
      )}

      {currentPage === 'gallery' && (
        <Gallery onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;
