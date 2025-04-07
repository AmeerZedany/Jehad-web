import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHandshake, FaChalkboardTeacher } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
     
    <section className="relative bg-gradient-to-b from-[#0f172a] to-[#000] text-white py-24 px-6 md:px-24 min-h-screen overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* خلفيات ضبابية ناعمة */}
      <div className="absolute w-[480px] h-[480px] bg-[#63b3ed] opacity-10 rounded-full blur-[180px] top-[-100px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#3182ce] opacity-10 rounded-full blur-[160px] bottom-[-80px] right-[-120px]" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto space-y-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* ✅ العنوان الرئيسي مع تدرج أزرق */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#63b3ed] to-[#3182ce] drop-shadow-xl leading-tight text-center">
          {t('about.title')}
        </h1>

        {/* صندوق المحتوى الرئيسي */}
        <motion.div
          className="bg-white/5 p-6 md:p-10 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            {t('about.mainDescription')}
          </p>

          {/* ✅ الإحصائيات مع ألوان زرقاء متدرجة */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-4 group">
              <FaChalkboardTeacher className="text-[#63b3ed] text-3xl group-hover:text-[#3182ce] transition-colors duration-300" />
              <p className="text-gray-100">
                {t('about.stats.trainingHours')}
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <FaUsers className="text-[#63b3ed] text-3xl group-hover:text-[#3182ce] transition-colors duration-300" />
              <p className="text-gray-100">
                {t('about.stats.trainees')}
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <FaHandshake className="text-[#63b3ed] text-3xl group-hover:text-[#3182ce] transition-colors duration-300" />
              <p className="text-gray-100">
                {t('about.stats.partnerships')}
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <FaAward className="text-[#63b3ed] text-3xl group-hover:text-[#3182ce] transition-colors duration-300" />
              <p className="text-gray-100">
                {t('about.stats.awards')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ✅ باقي التفاصيل */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {t('about.collaborations')}
          </p>

          {/* ✅ تغيير اللون الجانبي من برتقالي لأزرق */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed bg-white/5 p-5 rounded-lg border-r-4 border-[#3182ce] shadow-md">
            {t('about.recentFocus')}
          </p>

          <p className="text-center text-xl font-semibold text-white mt-10">
            {t('about.conclusion')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
