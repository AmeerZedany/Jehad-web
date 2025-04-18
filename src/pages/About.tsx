import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHandshake, FaChalkboardTeacher } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section 
      className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white px-6 py-20 sm:py-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background effects */}
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-400/10 rounded-full blur-[120px] top-[-100px] left-[-150px]" />
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-600/10 rounded-full blur-[120px] bottom-[-100px] right-[-150px]" />

      <div className="max-w-5xl mx-auto">
        {/* Title section */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
            {t('about.title')}
          </h1>
        </motion.div>

        {/* Main content box */}
        <motion.div
          className="bg-white/5 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg space-y-6 mb-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed text-justify sm:text-start">
            {t('about.mainDescription')}
          </p>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 group">
              <FaChalkboardTeacher className="text-blue-400 text-xl group-hover:text-blue-500 transition-colors duration-300 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-300/90 text-justify sm:text-start">
                {t('about.stats.trainingHours')}
              </p>
            </div>
            <div className="flex items-start gap-3 group">
              <FaUsers className="text-blue-400 text-xl group-hover:text-blue-500 transition-colors duration-300 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-300/90 text-justify sm:text-start">
                {t('about.stats.trainees')}
              </p>
            </div>
            <div className="flex items-start gap-3 group">
              <FaHandshake className="text-blue-400 text-xl group-hover:text-blue-500 transition-colors duration-300 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-300/90 text-justify sm:text-start">
                {t('about.stats.partnerships')}
              </p>
            </div>
            <div className="flex items-start gap-3 group">
              <FaAward className="text-blue-400 text-xl group-hover:text-blue-500 transition-colors duration-300 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-300/90 text-justify sm:text-start">
                {t('about.stats.awards')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional content */}
        <motion.div
          className="space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed text-justify sm:text-start">
            {t('about.collaborations')}
          </p>

          <div className="bg-white/5 p-5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed text-justify sm:text-start">
              {t('about.recentFocus')}
            </p>
          </div>

          <p className="text-center text-sm sm:text-base font-medium text-gray-200 mt-8">
            {t('about.conclusion')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
