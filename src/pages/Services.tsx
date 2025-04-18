import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      delay, 
      ease: [0.16, 1, 0.3, 1] 
    },
  }),
};

const icons = [
  <Lightbulb className="w-7 h-7 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />,
  <Star className="w-7 h-7 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />,
  <Users className="w-7 h-7 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />,
];

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      id="services"
      className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white px-6 py-20 sm:py-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background effects */}
      <motion.div
        className="absolute top-20 left-8 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0.1}
      />

      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center px-4 pt-6 pb-12">
        <motion.h1
          className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          custom={0.1}
        >
          {t('services.title')}
        </motion.h1>
      </div>

      {/* Services cards */}
      <motion.div
        className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        {(t('services.cards', { returnObjects: true }) as any[]).map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3 + idx * 0.1}
          >
            <div className="flex items-center gap-4 mb-5">
              {icons[idx]}
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400 group-hover:text-blue-500 transition-colors duration-300">
                {item.title}
              </h2>
            </div>
            <ul className="space-y-3 text-gray-300/90 text-sm sm:text-base leading-relaxed text-justify">
  {item.content.map((point: string, i: number) => (
    <li key={i} className="flex items-start gap-2">
      <span className="text-blue-400/80 mt-1">•</span>
      <span className="text-justify">{point}</span>
    </li>
  ))}
</ul>

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;