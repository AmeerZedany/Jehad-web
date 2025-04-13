import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowLeft, ArrowRight, X } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// Animation configurations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const backdropFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

interface Image {
  name: string;
  url: string;
}

const AlbumPage = ({ headerHeight = 0 }: { headerHeight?: number }) => {
  const { t } = useTranslation();
  const [state, setState] = useState<{
    images: Image[];
    loading: boolean;
    error: string | null;
    selectedImage: Image | null;
    showScrollTop: boolean;
  }>({
    images: [],
    loading: true,
    error: null,
    selectedImage: null,
    showScrollTop: false
  });

  const endpoint = 'https://opensheet.elk.sh/17nDf92K92d1y0ikBY_hUMjQ-ow7Z24QArToW6SFoW64/Sheet1';

  // Memoized utility functions
  const getThumbnail = useCallback((url: string) => {
    if (!url) return '';
    return url.includes('=w') ? url : `${url}=w500`;
  }, []);

  const stripExtension = useCallback((filename: string) => {
    return filename.replace(/\.[^/.]+$/, '');
  }, []);

  // Fetch images with proper error handling
  const fetchImages = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get<Array<{ Name: string; 'Image URL': string }>>(endpoint);
      const validImages = response.data
        .filter(row => row['Image URL']?.trim() && row.Name?.trim())
        .map(row => ({
          name: row.Name.trim(),
          url: row['Image URL'].trim()
        }));

      if (validImages.length === 0) {
        setState(prev => ({
          ...prev,
          error: t('gallery.noImages') || 'No images available',
          loading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          images: validImages,
          loading: false
        }));
      }
    } catch (err) {
      console.error('Image loading error:', err);
      setState(prev => ({
        ...prev,
        error: t('gallery.loadError') || 'Failed to load images',
        loading: false
      }));
    }
  }, [t]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Current image index for navigation
  const currentIndex = useMemo(() => {
    if (!state.selectedImage) return -1;
    return state.images.findIndex(img => img.url === state.selectedImage?.url);
  }, [state.selectedImage, state.images]);

  // Image navigation functions
  const showPrevImage = useCallback(() => {
    if (currentIndex > 0) {
      setState(prev => ({
        ...prev,
        selectedImage: state.images[currentIndex - 1]
      }));
    }
  }, [currentIndex, state.images]);

  const showNextImage = useCallback(() => {
    if (currentIndex < state.images.length - 1) {
      setState(prev => ({
        ...prev,
        selectedImage: state.images[currentIndex + 1]
      }));
    }
  }, [currentIndex, state.images]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!state.selectedImage) return;

    switch (e.key) {
      case 'Escape':
        setState(prev => ({ ...prev, selectedImage: null }));
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }, [state.selectedImage, showPrevImage, showNextImage]);

  // Scroll to top button visibility
  const handleScroll = useCallback(() => {
    setState(prev => ({
      ...prev,
      showScrollTop: window.scrollY > 400
    }));
  }, []);

  // Event listeners setup/cleanup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleKeyDown, handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: `${headerHeight + 24}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background effects */}
      <motion.div
        className="absolute top-16 left-8 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 right-8 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      />

      {/* Header section */}
<div className="max-w-5xl mx-auto text-center px-4 sm:px-6 pt-12 sm:pt-20 pb-6 sm:pb-8">
  <motion.h1
    className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
    initial={{ y: -15, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    }}
  >
    {t('gallery.title')}
  </motion.h1>

  <motion.p
    className="mt-3 sm:mt-4 text-[clamp(0.875rem,3.5vw,1.125rem)] text-gray-300/90 leading-relaxed max-w-2xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ 
      delay: 0.3, 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }}
  >
    {t('gallery.description')}
  </motion.p>
</div>


      {/* Content section */}
      <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
        {state.loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          </div>
        ) : state.error ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-400 text-sm sm:text-base">{state.error}</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {state.images.map((img) => (
              <motion.div
                key={img.url}
                className="relative group rounded-lg overflow-hidden cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10"
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                onClick={() => setState(prev => ({ ...prev, selectedImage: img }))}
              >
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={getThumbnail(img.url)}
                    alt={stripExtension(img.name)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      console.error(`Failed to load image: ${img.name}`);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Enhanced hover text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-medium line-clamp-2 px-2 py-1 bg-black/40 rounded backdrop-blur-sm">
                    {stripExtension(img.name)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {state.selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropFade}
            onClick={() => setState(prev => ({ ...prev, selectedImage: null }))}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image container with perfect fitting */}
              <div className="flex items-center justify-center h-[80vh] p-4">
                <motion.img
                  key={state.selectedImage.url}
                  src={state.selectedImage.url}
                  alt={stripExtension(state.selectedImage.name)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>

              {/* Enhanced caption */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white font-medium text-sm sm:text-base text-center px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm inline-block">
                  {stripExtension(state.selectedImage.name)}
                </p>
              </motion.div>

              {/* Close button */}
              <button
                onClick={() => setState(prev => ({ ...prev, selectedImage: null }))}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label={t('gallery.close') || 'Close'}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  aria-label={t('gallery.previous') || 'Previous'}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {currentIndex < state.images.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  aria-label={t('gallery.next') || 'Next'}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {state.showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-500/90 text-white shadow-lg hover:bg-blue-500 transition-all duration-300 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label={t('gallery.scrollTop') || 'Scroll to top'}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlbumPage;