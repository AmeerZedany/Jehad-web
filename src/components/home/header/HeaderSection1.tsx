import React, { useEffect, useRef, useState, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typewriter } from 'react-simple-typewriter';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import jehadHeader from '../../../assets/jehad-header2.png';

// Types
type StatItem = {
  icon: string;
  number: string;
  label: string;
  suffix?: string;
};

// Enhanced motion variants with more sophisticated animations
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

/**
 * AnimatedNumber
 * Smoothly animates from 0 up to the given 'value', appending an optional suffix.
 * Resets the animation when 'resetKey' (e.g. the current language) changes.
 */
const AnimatedNumber = ({
  value,
  duration = 1500,
  suffix = "",
  resetKey,
}: {
  value: string;
  duration?: number;
  suffix?: string;
  resetKey?: any;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset count when value or resetKey changes
    setDisplayValue(0);
    startTimeRef.current = null;

    const targetValue = parseInt(value, 10) || 0;
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * targetValue);
      setDisplayValue(currentValue);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration, resetKey]);

  return <span aria-live="polite">{displayValue}{suffix}</span>;
};

/**
 * HeaderSection1
 * Main header with an animated background, typewriter text, call-to-actions,
 * animated stats (with optional plus sign), a clickable scroll indicator,
 * and a wave divider.
 */
const HeaderSection1 = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const stats = t('headerSection1.stats', { returnObjects: true }) as StatItem[];

  // Respect user preference for reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Smooth Scroll to Next Section
  const handleScrollDown = () => {
    const nextSection = document.getElementById('services') || document.getElementById('contact');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      role="banner"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-2 sm:px-4 md:px-6"
    >
      {/* Background & Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={jehadHeader}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.1 }}
          transition={
            shouldReduceMotion
              ? {}
              : { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          style={{
            background: 'radial-gradient(ellipse at center, transparent, rgba(0,0,0,0.9))',
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')]"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{ opacity: 0.03 }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
          animate={floatAnimation}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
          animate={floatAnimation}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-yellow-500/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-orange-500/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-4 py-4 sm:py-6 lg:py-8 mt-10">
        {/* Title/Subtitle Section */}
        <motion.div
          className={`w-full max-w-8xl ${isArabic ? 'text-right' : 'text-left'}`}
          variants={fadeInDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <h1 className="text-4xl sm:text-5xl md:text-4xl font-extrabold text-white drop-shadow-xl mb-2 sm:mb-4 leading-tight">
            {t('headerSection1.mainTitle')}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-yellow-300 font-semibold drop-shadow-md mb-4 sm:mb-6">
            <Typewriter
              words={[t('headerSection1.subtitle')]}
              loop={false}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
              cursor
              cursorStyle="|"
            />
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-sm max-w-3xl">
            {t('headerSection1.descriptionPart1')}{' '}
            <span className="text-yellow-300 font-bold relative inline-block">
              {t('headerSection1.descriptionHighlight')}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 to-orange-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>{' '}
            {t('headerSection1.descriptionPart2')}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          <HeaderButton
            ariaLabel={t('headerSection1.btnServices')}
            href="#services"
            variant="gradient-yellow"
          >
            {t('headerSection1.btnServices')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </HeaderButton>
          <HeaderButton
            ariaLabel={t('headerSection1.btnEbook')}
            href="https://go.jihad-shojaeha.com/free-ebook"
            variant="gradient-green"
            external
          >
            {t('headerSection1.btnEbook')}
          </HeaderButton>
          <HeaderButton
            ariaLabel={t('headerSection1.btnWhatsapp')}
            href="https://wa.me/972599358641"
            variant="whatsapp"
            external
            icon={<FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            {t('headerSection1.btnWhatsapp')}
          </HeaderButton>
          <HeaderButton
            ariaLabel={t('headerSection1.btnTelegram')}
            href="https://t.me/jihadshojaeha"
            variant="telegram"
            external
            icon={<FaTelegramPlane className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            {t('headerSection1.btnTelegram')}
          </HeaderButton>
          <HeaderButton
            ariaLabel={t('headerSection1.btnConsult')}
            href="#contact"
            variant="glass"
          >
            {t('headerSection1.btnConsult')}
          </HeaderButton>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="w-full px-2 sm:px-4 md:px-6 mt-4 sm:mt-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
        >
          <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-3 sm:py-5 md:py-6 px-3 sm:px-5 md:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 text-center relative">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group p-2 sm:p-3 rounded-xl overflow-hidden transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index, duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/15 to-yellow-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl blur" />
                  <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 text-yellow-400 drop-shadow-sm">
                    {stat.icon}
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
                    <AnimatedNumber value={stat.number} suffix={stat.suffix || ""} resetKey={i18n.language} />
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-white/80 mt-1 tracking-wide leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        className="absolute bottom-4 sm:bottom-6 flex flex-col items-center focus:outline-none group"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        aria-label="Scroll down to next section"
      >
        
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-white/90 group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ y: 0 }}
          animate={{ y: shouldReduceMotion ? 0 : 8 }}
          transition={{
            y: shouldReduceMotion
              ? {}
              : { repeat: Infinity, repeatType: 'reverse', duration: 1 },
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

    
    </header>
  );
};

type HeaderButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'gradient-yellow' | 'gradient-green' | 'whatsapp' | 'telegram' | 'glass' | 'default';
  external?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
};

const HeaderButton = memo(
  ({ href, children, variant = 'default', external = false, icon, ariaLabel }: HeaderButtonProps) => {
    const shouldReduceMotion = useReducedMotion();

    const baseClasses =
      'group px-5 py-3 sm:px-6 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-500 flex items-center justify-center gap-2';
    const variants: Record<string, string> = {
      'gradient-yellow': 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900',
      'gradient-green': 'bg-gradient-to-r from-green-400 to-lime-400 text-gray-900',
      whatsapp: 'bg-green-600 text-white',
      telegram: 'bg-blue-600 text-white',
      glass: 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20',
      default: 'bg-gray-800 text-white',
    };

    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variants[variant]}`}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {icon}
        {children}
      </motion.a>
    );
  }
);

export default HeaderSection1;
