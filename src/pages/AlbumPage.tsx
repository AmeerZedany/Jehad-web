import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { X } from 'lucide-react';

const endpoint =
  'https://opensheet.elk.sh/17nDf92K92d1y0ikBY_hUMjQ-ow7Z24QArToW6SFoW64/Sheet1';

interface Image {
  name: string;
  url: string;
}

function getThumbnail(url: string) {
  return url.includes('&sz=') ? url : `${url}&sz=w500`;
}

function stripExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}

const AlbumPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
  
      try {
        const response = await axios.get<Array<{ Name: string; 'Image URL': string }>>(endpoint);
        const data = response.data;
  
        const mapped: Image[] = data.map((row) => ({
          name: row.Name,
          url: row['Image URL'],
        }));
  
        setImages(mapped);
      } catch (err) {
        console.error('❌ خطأ في تحميل الصور من Google Sheet:', err);
      } finally {
        setLoading(false);
      }
    };
  
    // Clear the cache explicitly (in case it was previously stored)
    localStorage.removeItem('cached_album_images');
    localStorage.removeItem('cached_album_images_expiry');
  
    fetchImages();
  }, []);
  

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = selectedImage ? images.findIndex((img) => img.url === selectedImage.url) : -1;

  const showPrevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const showNextImage = () => {
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white via-gray-50 to-blue-50 px-4 sm:px-6 lg:px-20 py-20 sm:py-24 min-h-screen text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
     <motion.h1
      className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-3 tracking-tight drop-shadow-sm"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {t('gallery.title')}
    </motion.h1>

    <motion.p
      className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-md sm:max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {t('gallery.description')}
    </motion.p>


      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-12 h-12 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        </div>
      ) : images.length === 0 ? (
        <motion.p
          className="text-red-500 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          😢 لا توجد صور متاحة حالياً.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {images.map((img, idx) => {
            const thumb = getThumbnail(img.url);

            return (
              <motion.div
                key={idx}
                className="relative group rounded-xl overflow-hidden shadow-xl cursor-pointer bg-white transition duration-700 ease-in-out hover:shadow-[0_8px_30px_rgba(0,118,255,0.35)]"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
              >
                <motion.img
                  src={thumb}
                  alt={img.name}
                  className="w-full h-44 sm:h-52 lg:h-60 object-cover transition-transform duration-700 ease-in-out"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`❌ فشل تحميل الصورة: ${img.name}`, thumb);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 backdrop-blur-xl text-black font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
                  {stripExtension(img.name)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

<AnimatePresence>
  {selectedImage && (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedImage(null)}
    >
      <motion.div
        className="bg-white rounded-2xl overflow-hidden max-w-full sm:max-w-5xl w-full relative border border-blue-200 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={selectedImage.url}
          src={selectedImage.url}
          alt={selectedImage.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="w-full h-auto object-contain max-h-[80vh] sm:max-h-[90vh]"
        />

        {/* النص تحت الصورة */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg font-semibold backdrop-blur-md shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {stripExtension(selectedImage.name)}
        </motion.div>

        {/* زر الإغلاق الجديد */}
<button
  onClick={() => setSelectedImage(null)}
  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/60 hover:bg-white/80 text-blue-700 p-3 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110"
  aria-label="إغلاق الصورة"
>
  <X className="w-5 h-5" />
</button>


       {/* زر السهم لليمين (السابق) */}
        {currentIndex > 0 && (
          <button
            onClick={showPrevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-blue-700 p-3 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110"
            aria-label="الصورة السابقة"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}

        {/* زر السهم لليسار (التالي) */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={showNextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 text-blue-700 p-3 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110"
            aria-label="الصورة التالية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        )}


      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          aria-label="العودة للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
};

export default AlbumPage;