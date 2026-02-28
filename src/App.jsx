import { useState } from 'react';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import LayoutSelection from './pages/LayoutSelection';
import SelfieBooth from './pages/SelfieBooth';
import StripBooth from './pages/StripBooth';
import Gallery from './pages/Gallery';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-700">
      <Toaster richColors position="top-center" />

      {currentPage === 'home' && (
        <Home
          onStart={() => setCurrentPage('layout-selection')}
          onViewGallery={() => setCurrentPage('gallery')}
        />
      )}

      {currentPage === 'layout-selection' && (
        <LayoutSelection
          onSelect={(layout) => {
            setCurrentPage(layout === 'selfie' ? 'booth-selfie' : 'booth-strip');
          }}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'booth-selfie' && (
        <SelfieBooth onBack={() => setCurrentPage('layout-selection')} />
      )}

      {currentPage === 'booth-strip' && (
        <StripBooth onBack={() => setCurrentPage('layout-selection')} />
      )}

      {currentPage === 'gallery' && (
        <Gallery onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;
