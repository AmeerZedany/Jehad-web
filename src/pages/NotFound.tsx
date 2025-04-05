// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-white text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">الصفحة غير موجودة</p>
      <p className="text-gray-600 mb-6">
        يبدو أنك تحاول الوصول إلى صفحة غير متوفرة. ربما تم حذفها أو تم تغيير رابطها.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </motion.div>
  );
};

export default NotFound;
