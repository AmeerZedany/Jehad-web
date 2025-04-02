import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBook, FaGlobe, FaBullseye } from 'react-icons/fa';

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

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
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
    <section className="relative z-10 bg-gradient-to-b from-[#0f172a] to-[#000] text-white py-24 px-4 sm:px-6 md:px-16 lg:px-28 xl:px-36 overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
        variants={decoVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        variants={decoVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      />

      <motion.div
        className="max-w-7xl mx-auto text-center space-y-14 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Title */}
        <motion.div className="relative inline-block px-4" variants={itemVariants}>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-3">
            {t('headerSection2.title')}
          </h2>
          <p className="text-[clamp(1.1rem,3vw,1.8rem)] text-white/90 font-medium mb-6 leading-snug">
            {t('headerSection2.subtitle')}
          </p>
          <motion.div
            className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 w-28 sm:w-36 lg:w-48 mx-auto rounded-full origin-left"
            variants={underlineVariants}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {/* Card Component */}
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
              className={`group relative px-6 py-5 sm:px-8 sm:py-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-500`}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotateX: shouldReduceMotion ? 0 : 3,
                rotateY: shouldReduceMotion ? 0 : 3,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <div className="relative">
                <motion.div
                  className="text-3xl sm:text-4xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 text-${item.color}-300`}>
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="about"
          className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg transition-all duration-500 hover:shadow-2xl text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('headerSection2.readMore')}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeaderSection2;
