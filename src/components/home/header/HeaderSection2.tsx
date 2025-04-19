import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBook, FaGlobe, FaBullseye } from 'react-icons/fa';
import jehadHeader from '../../../assets/logo.png';

const HeaderSection2 = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const decoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative z-10 bg-gradient-to-b from-[#0f172a] to-[#000] text-white py-12 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-36 overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
        variants={decoVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        variants={decoVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      />

   {/* ✨ Smoother & brighter bottom fade into the next image */}
{/* 🧼 Cleaner bottom fade — fully covers blend zone */}
<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto text-center space-y-8 md:space-y-14 relative z-30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Signature Logo Block */}
        <motion.div
          className="relative inline-block w-full px-4"
          variants={itemVariants}
        >
          <motion.div
            className={`relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-xl mx-auto transition-all duration-300 ${isArabic ? 'sm:flex-row-reverse text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src={jehadHeader}
              alt="Jehad Logo"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />

            <div className="hidden sm:flex text-3xl text-blue-400 font-light select-none items-center leading-none">
              |
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-[clamp(1.25rem,4vw,2.5rem)] font-extrabold text-gray-900 leading-snug tracking-tight">
                المدرب <span className="text-blue-500">جهاد شجاعية</span>
              </h2>
              <p className="text-[clamp(0.75rem,2vw,1.125rem)] text-gray-600 font-medium mt-1 tracking-wide">
                Professional Training
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-10 px-2 sm:px-0">
          {[ 
            {
              icon: <FaBook className="text-yellow-400" />,
              title: t('headerSection2.experience.title'),
              desc: t('headerSection2.experience.description'),
              color: 'yellow',
            },
            {
              icon: <FaGlobe className="text-purple-400" />,
              title: t('headerSection2.international.title'),
              desc: t('headerSection2.international.description'),
              color: 'purple',
            },
            {
              icon: <FaBullseye className="text-green-400" />,
              title: t('headerSection2.focus.title'),
              desc: t('headerSection2.focus.description'),
              color: 'green',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
              variants={itemVariants}
              whileHover={{
                y: -5,
                scale: 1.05,
                rotateX: shouldReduceMotion ? 0 : 3,
                rotateY: shouldReduceMotion ? 0 : 3,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <div className="relative flex flex-col items-center justify-center text-center">
                <motion.div
                  className="text-3xl sm:text-4xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className={`text-[clamp(1.1rem,3vw,1.5rem)] md:text-[1.75rem] font-bold mb-1 text-${item.color}-300 tracking-tight`}>
                  {item.title}
                </h3>
                <p className="text-[clamp(0.8rem,2vw,1rem)] md:text-[1.125rem] text-gray-300 leading-relaxed tracking-wide">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="about"
          className="mt-6 md:mt-8 inline-block px-8 py-3 sm:px-10 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-md transition-all duration-300 hover:shadow-xl text-sm sm:text-base md:text-lg"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('headerSection2.readMore')}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeaderSection2;
