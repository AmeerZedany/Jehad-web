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
{/* Signature Logo Block */}
<motion.div className="relative inline-block px-4" variants={itemVariants}>
  <motion.div
    className={`relative z-10 flex items-center justify-center gap-6 flex-wrap px-8 py-6 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto ${
      isArabic ? 'flex-row-reverse text-right' : 'text-left'
    }`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {/* Logo */}
    <motion.img
      src={jehadHeader}
      alt="Jehad Logo"
      className="h-16 sm:h-20 w-auto object-contain"
      animate={{ y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />

    {/* Elegant separator */}
    <div className="text-[2.5rem] text-blue-400 font-light select-none flex items-center justify-center leading-none">
      |
    </div>

    {/* Name & subtitle */}
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-[1.6rem] sm:text-[1.9rem] md:text-[2.1rem] font-extrabold text-black leading-snug">
        المدرب <span className="text-blue-500">جهاد شجاعية</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mt-1">
        Professional Training
      </p>
    </div>
  </motion.div>

 
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

       {/* CTA Button - Bigger and Blue */}
<motion.a
  href="about"
  className="mt-8 inline-block px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-md transition-all duration-300 hover:shadow-xl text-base sm:text-lg"
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
