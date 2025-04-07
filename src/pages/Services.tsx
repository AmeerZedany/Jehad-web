import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const icons = [
  <Lightbulb className="w-8 h-8 text-yellow-400 group-hover:text-orange-400 transition" />,
  <Star className="w-8 h-8 text-yellow-400 group-hover:text-orange-400 transition" />,
  <Users className="w-8 h-8 text-yellow-400 group-hover:text-orange-400 transition" />,
];

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section
      id="services"
      className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-32 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Floating Circles */}
      <motion.div
        className="absolute top-20 left-8 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-8 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0.1}
      />

      {/* Section Title */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        {t('services.title')}
      </motion.h1>

      {/* Service Cards */}
      <motion.div
        className="max-w-5xl mx-auto space-y-20 text-white/90"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        {(t('services.cards', { returnObjects: true }) as any[]).map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl hover:scale-[1.01] transition-all duration-300 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.4 + idx * 0.2}
          >
            <div className="flex items-center gap-4 mb-6">
              {icons[idx]}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 group-hover:text-orange-400 transition-colors duration-300">
                {item.title}
              </h2>
            </div>
            <ul className="space-y-4 text-white/80 text-lg sm:text-xl leading-relaxed">
              {item.content.map((point: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span>{point}</span>
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