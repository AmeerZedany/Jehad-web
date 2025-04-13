import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Assets
import logo from '../assets/logo.png';
import signature from '../assets/signature.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Check if current language is Arabic
  const isRTL = i18n.language === 'ar';
  const langLabel = isRTL ? 'EN' : 'عربي';

  // Colors for potential usage
  const colors = useMemo(() => ({
    primary: '#3b82f6',
    secondary: '#60a5fa',
    dark: '#0f172a',
    light: '#f8fafc',
    accent: '#f59e0b',
  }), []);

  // Strings from translation
  const translations = useMemo(() => ({
    home: t('homeNAV'),
    about: t('aboutNAV'),
    services: t('servicesNAV'),
    contact: t('contactNAV'),
    album: t('albumNAV'),
    aria: {
      menu: t('aria.menu'),
      close: t('aria.close'),
      language: t('aria.language'),
      social: (platform: string) => t('aria.social', { platform }),
    },
  }), [t]);

  // Build navigation data
  const navData = useMemo(() => ({
    links: [
      { name: translations.home, path: '/' },
      { name: translations.about, path: '/about' },
      { name: translations.services, path: '/services' },
      { name: translations.contact, path: '/contact' },
      { name: translations.album, path: '/album' },
    ],
    social: [
      {
        icon: <FaFacebookF />,
        link: 'https://facebook.com/jihad.shojaeha',
        label: translations.aria.social('Facebook'),
      },
      {
        icon: <FaLinkedinIn />,
        link: 'https://linkedin.com/in/jihad-shojaeha/',
        label: translations.aria.social('LinkedIn'),
      },
      {
        icon: <FaInstagram />,
        link: 'https://instagram.com/jihad.shojaeha',
        label: translations.aria.social('Instagram'),
      },
    ],
  }), [translations]);

  // Toggle language logic
  const toggleLanguage = useCallback(() => {
    const nextLang = isRTL ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('preferredLanguage', nextLang);
  }, [isRTL, i18n]);

  // Mobile menu open/close
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Scroll detection for styling changes
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on path change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Initialize direction & language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) i18n.changeLanguage(storedLang);
  }, [isRTL, i18n]);

  // Animated side menu
  const sideMenuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 320, damping: 28 },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.3 },
    },
  };

  // Animated list items
  const navItemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, type: 'spring' },
    }),
    exit: { x: 30, opacity: 0 },
  };

  // Smoothly scroll to top if clicking logo on homepage
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 border-b border-gray-700 shadow-lg transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2' : 'bg-gray-900/80 py-3'
      }`}
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Main container */}
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Signature */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 px-1 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={handleLogoClick}
            aria-label="Go to homepage"
          >
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-500/30 shadow-md overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={logo}
                alt="Jehad Logo"
                className="w-full h-full object-cover scale-110"
                loading="lazy"
              />
            </motion.div>

            <motion.img
              src={signature}
              alt="Jehad Shojaeha Signature"
              className="h-9 sm:h-12 max-w-[150px] object-contain drop-shadow-md motion-safe:animate-[float_3s_ease-in-out_infinite]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Main Nav Links */}
          <ul className="flex items-center gap-1">
            {navData.links.map((link, idx) => (
              <motion.li
                key={idx}
                className="relative list-none"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 block text-sm lg:text-base font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  <span className="relative inline-block">
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute left-0 bottom-0 h-0.5 bg-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 0.6,
                        }}
                      />
                    )}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Social Icons + Language */}
          <div
            className={`flex items-center gap-4 ${
              isRTL ? 'mr-4 pr-4 border-r' : 'ml-4 pl-4 border-l'
            } border-gray-700`}
          >
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {navData.social.map(({ icon, link, label }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, color: colors.secondary }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-blue-300 text-lg transition-colors p-1.5"
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Language Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              aria-label={translations.aria.language}
              className="text-xs sm:text-sm border border-gray-400 px-3 py-1.5 rounded-full font-medium shadow-sm bg-white text-black hover:bg-gray-100 transition-all"
            >
              {langLabel}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden text-white p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? translations.aria.close : translations.aria.menu}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={26} className="text-blue-400" />
          ) : (
            <Menu size={26} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark overlay behind the menu */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* Off-Canvas Drawer */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-screen w-2/3 max-w-xs bg-gray-900/95 backdrop-blur-lg border-l border-gray-700 shadow-2xl md:hidden flex flex-col pt-24 px-6 pb-8"
              variants={sideMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="flex flex-col gap-1">
                {navData.links.map((link, i) => (
                  <motion.li
                    key={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={i}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-blue-900/40 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                      onClick={closeMenu}
                      aria-current={location.pathname === link.path ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Social + Language at bottom */}
              <div className="mt-auto pt-8 border-t border-gray-700">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex justify-center gap-6">
                    {navData.social.map(({ icon, link, label }, i) => (
                      <motion.a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.1, color: colors.secondary }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-300 text-2xl p-2"
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => {
                      toggleLanguage();
                      closeMenu();
                    }}
                    className="w-full border border-gray-400 px-4 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {langLabel}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
