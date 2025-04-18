import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaLightbulb, FaBuilding } from 'react-icons/fa';

const HeaderSection3 = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative z-10 bg-gradient-to-b from-[#000] to-[#0f172a] text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto space-y-10 sm:space-y-14 md:space-y-16 relative"
      >
        {/* Section Title */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
            {t('headerSection3.title')}
          </h2>
          <p className="text-[clamp(0.9rem,3vw,1.5rem)] text-white/80 max-w-3xl mx-auto tracking-wide px-2 sm:px-0">
            {t('headerSection3.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
          {/* TOT Card */}
          <motion.div 
            className="group relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl" />
            <div className="relative flex flex-col items-center justify-center text-center">
              <motion.div 
                className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaGraduationCap className="text-yellow-400" />
              </motion.div>
              <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] md:text-[1.75rem] font-bold mb-3 sm:mb-4 text-yellow-300 tracking-tight">
                {t('headerSection3.tot.title')}
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[clamp(0.8rem,2vw,1rem)] md:text-[1.125rem] text-gray-300 tracking-wide">
                {(t('headerSection3.tot.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Consulting Card */}
          <motion.div 
            className="group relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl" />
            <div className="relative flex flex-col items-center justify-center text-center">
              <motion.div 
                className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaLightbulb className="text-blue-400" />
              </motion.div>
              <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] md:text-[1.75rem] font-bold mb-3 sm:mb-4 text-blue-300 tracking-tight">
                {t('headerSection3.consulting.title')}
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[clamp(0.8rem,2vw,1rem)] md:text-[1.125rem] text-gray-300 tracking-wide">
                {(t('headerSection3.consulting.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Corporate Card */}
          <motion.div 
            className="group relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl" />
            <div className="relative flex flex-col items-center justify-center text-center">
              <motion.div 
                className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaBuilding className="text-green-400" />
              </motion.div>
              <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] md:text-[1.75rem] font-bold mb-3 sm:mb-4 text-green-300 tracking-tight">
                {t('headerSection3.corporate.title')}
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[clamp(0.8rem,2vw,1rem)] md:text-[1.125rem] text-gray-300 tracking-wide">
                {(t('headerSection3.corporate.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeaderSection3;