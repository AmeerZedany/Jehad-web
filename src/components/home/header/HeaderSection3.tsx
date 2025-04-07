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
    <section className="relative z-10 bg-gradient-to-b from-[#000] to-[#0f172a] text-white py-32 px-6 md:px-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto space-y-16 relative"
      >
        {/* Section Title */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
            {t('headerSection3.title')}
          </h2>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">
            {t('headerSection3.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* TOT Card */}
          <motion.div 
            className="group relative px-8 py-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative">
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaGraduationCap className="text-yellow-400" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                {t('headerSection3.tot.title')}
              </h3>
              <ul className="space-y-3 text-gray-300">
                {(t('headerSection3.tot.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-orange-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Consulting Card */}
          <motion.div 
            className="group relative px-8 py-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative">
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaLightbulb className="text-blue-400" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                {t('headerSection3.consulting.title')}
              </h3>
              <ul className="space-y-3 text-gray-300">
                {(t('headerSection3.consulting.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-orange-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Corporate Card */}
          <motion.div 
            className="group relative px-8 py-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative">
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaBuilding className="text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                {t('headerSection3.corporate.title')}
              </h3>
              <ul className="space-y-3 text-gray-300">
                {(t('headerSection3.corporate.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-orange-400">•</span>
                    {item}
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