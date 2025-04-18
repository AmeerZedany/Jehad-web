import { useEffect, useRef, useState, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typewriter } from 'react-simple-typewriter';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import jehadHeader from '../../../assets/jehad-header2.png';
import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

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
      <div className={`relative z-10 w-full max-w-6xl mx-4 flex flex-col justify-center gap-4 md:gap-6 ${isArabic ? 'text-right' : 'text-left'}`}>
        <motion.h1
          className={`text-[clamp(2rem,6vw,4rem)] font-extrabold text-white drop-shadow-xl leading-tight tracking-tight ${
            isArabic ? 'text-right' : 'text-left'
          }`}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {t('headerSection1.mainTitle')}
        </motion.h1>

        <motion.h2
          className={`text-[clamp(1.25rem,4vw,2.5rem)] text-[#3182ce] font-semibold drop-shadow-md tracking-wide ${
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
          className={`text-[clamp(0.9rem,3vw,1.5rem)] text-white/90 max-w-3xl mt-1 md:mt-2 leading-relaxed tracking-wide ${
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
      {/* -------------------- CTA Buttons -------------------- */}
<motion.div
  className="flex w-full flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10"
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  custom={0.6}
>
  <HeaderButton
    to="/services"
    variant="blue"
    className="w-full sm:w-auto"
    icon={<ArrowRight className="w-4 h-4" />}
  >
    {t('headerSection1.btnServices')}
  </HeaderButton>

  <HeaderButton
    href="https://go.jihad-shojaeha.com/free-ebook"
    variant="white"
    external
    className="w-full sm:w-auto"
    icon={<FiDownload className="w-4 h-4" />}
  >
    {t('headerSection1.btnEbook')}
  </HeaderButton>

  <HeaderButton
    href="https://wa.me/972599358641"
    variant="whatsapp"
    external
    className="w-full sm:w-auto"
    icon={<FaWhatsapp className="w-4 h-4" />}
  >
    {t('headerSection1.btnWhatsapp')}
  </HeaderButton>

  <HeaderButton
    href="https://t.me/jihadshojaeha"
    variant="telegram"
    external
    className="w-full sm:w-auto"
    icon={<FaTelegramPlane className="w-4 h-4" />}
  >
    {t('headerSection1.btnTelegram')}
  </HeaderButton>
</motion.div>

      </div>

      {/* Numbers Section */}
      <motion.div
        className="mt-8 sm:mt-12 md:mt-16 w-full max-w-5xl mx-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl py-4 sm:py-6 px-3 sm:px-6 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0.8}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div className="text-lg sm:text-xl md:text-2xl text-[#3182ce] drop-shadow-sm">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-[#3182ce]">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} resetKey={i18n.language} />
              </div>
              <p className="text-xs sm:text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
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

const HeaderButton = memo(({ href, to, children, variant, external, icon }: any) => {
  const styles: any = {
    blue: 'bg-[#63b3ed] text-white hover:bg-[#4299e1]',
    white: 'bg-white text-black hover:bg-gray-100',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700',
    telegram: 'bg-blue-500 text-white hover:bg-blue-600',
  };

  const commonClasses = `px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full font-medium sm:font-semibold flex items-center transition-all duration-300 text-sm sm:text-base ${styles[variant]}`;

  if (to) {
    return (
      <Link to={to} className={`${commonClasses} w-50% sm:w-auto`}>
      {icon && <span className="mr-1 sm:mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={`${commonClasses} w-50% sm:w-auto`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {icon && <span className="mr-1 sm:mr-2">{icon}</span>}
      {children}
    </a>
  );
});

export default HeaderSection1;