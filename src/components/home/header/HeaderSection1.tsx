import { useEffect, useRef, useState, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typewriter } from 'react-simple-typewriter';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import jehadHeader from '../../../assets/jehad-header2.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeaderSection1 = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const shouldReduceMotion = useReducedMotion();

  const stats = t('headerSection1.stats', { returnObjects: true }) as {
    icon: string;
    number: string;
    label: string;
    suffix?: string;
  }[];

  const handleScrollDown = () => {
    const next = document.getElementById('services') || document.getElementById('contact');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={jehadHeader}
          alt=""
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.1 }}
          transition={shouldReduceMotion ? {} : { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-6xl flex flex-col justify-center gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>

      <motion.h1
        className={`text-4xl sm:text-5xl font-extrabold text-white drop-shadow-xl leading-tight ${
          isArabic ? 'text-right' : 'text-left'
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {t('headerSection1.mainTitle')}
      </motion.h1>

      <motion.h2
        className={`text-xl sm:text-2xl md:text-3xl text-[#3182ce] font-semibold drop-shadow-md ${
          isArabic ? 'text-right' : 'text-left'
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0.3}
      >
        <Typewriter
          words={[t('headerSection1.subtitle')]}
          loop={false}
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1800}
          cursor
          cursorStyle="|"
        />
      </motion.h2>

      <motion.p
        className={`text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mt-2 leading-relaxed ${
          isArabic ? 'text-right' : 'text-left'
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0.4}
      >
        {t('headerSection1.descriptionPart1')}{' '}
        <span className="text-[#3182ce] font-bold">
          {t('headerSection1.descriptionHighlight')}
        </span>{' '}
        {t('headerSection1.descriptionPart2')}
      </motion.p>


        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0.6}
        >
          <HeaderButton href="#services" variant="blue">
            {t('headerSection1.btnServices')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </HeaderButton>
          <HeaderButton href="https://go.jihad-shojaeha.com/free-ebook" variant="white" external>
            {t('headerSection1.btnEbook')}
          </HeaderButton>
          <HeaderButton href="https://wa.me/972599358641" variant="whatsapp" external icon={<FaWhatsapp />}>
            {t('headerSection1.btnWhatsapp')}
          </HeaderButton>
          <HeaderButton href="https://t.me/jihadshojaeha" variant="telegram" external icon={<FaTelegramPlane />}>
            {t('headerSection1.btnTelegram')}
          </HeaderButton>
        </motion.div>

       
      </div>
       {/* Numbers Section - Moved down */}
       <motion.div
          className="mt-16 w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl py-6 px-4 sm:px-6 shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0.8}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className="text-xl sm:text-2xl text-[#3182ce] drop-shadow-sm">{stat.icon}</div>
                <div className="text-2xl font-bold text-[#3182ce]">
                  <AnimatedNumber value={stat.number} suffix={stat.suffix} resetKey={i18n.language} />
                </div>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      {/* Scroll Down */}
      <motion.button
        className="absolute bottom-6 text-white/80"
        onClick={handleScrollDown}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to next section"
      >
        <ArrowRight className="rotate-90 w-6 h-6" />
      </motion.button>
    </header>
  );
};

const AnimatedNumber = ({ value, duration = 2000, suffix = '', resetKey }: any) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    setDisplay(0);
    ref.current = null;

    const target = parseInt(value, 10) || 0;
    const animate = (timestamp: number) => {
      if (ref.current === null) ref.current = timestamp;
      const elapsed = timestamp - ref.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration, resetKey]);

  return <>{display}{suffix}</>;
};

const HeaderButton = memo(({ href, children, variant, external, icon }: any) => {
  const styles: any = {
    blue: 'bg-[#3182ce] text-white hover:bg-blue-600',
    white: 'bg-white text-black hover:bg-gray-100',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700',
    telegram: 'bg-blue-500 text-white hover:bg-blue-600',
  };

  return (
    <a
      href={href}
      className={`px-5 py-3 rounded-full font-semibold flex items-center transition-all duration-300 ${styles[variant]}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  );
});

export default HeaderSection1;
