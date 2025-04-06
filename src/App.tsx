import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import TermsAndPrivacyPage from './pages/PrivacyPolicyPage';
import AlbumPage from './pages/AlbumPage';
import NotFound from './pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
  <AnimatePresence mode="sync" initial={false}>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/album" element={<AlbumPage />} />
      <Route path="/privacy-policy" element={<TermsAndPrivacyPage />} />
      {/* ✅ 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AnimatePresence>

  );
};

function App() {
  return (
    <Router
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
  basename="/Jehad-web/"
>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* حاوية الصفحات المتحركة */}
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
