import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const primaryBlue = '#2563eb'; // الأزرق المتqوسط من اللوجو

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navLinks = [
    { name: t('homeNAV'), path: '/' },
    { name: t('aboutNAV'), path: '/about' },
    { name: t('servicesNAV'), path: '/services' },
    { name: t('contactNAV'), path: '/contact' },
    { name: t('albumNAV'), path: '/album' },
   
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  const langLabel = i18n.language === 'ar' ? 'EN' : 'عربي';

  const socialIcons = [
    { icon: <FaFacebookF />, link: 'https://www.facebook.com/jihad.shojaeha' },
    { icon: <FaLinkedinIn />, link: 'https://www.linkedin.com/in/jihad-shojaeha/' },
    { icon: <FaInstagram />, link: 'https://www.instagram.com/jihad.shojaeha/?hl=en' },
  ];

  return (
    
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black backdrop-blur-xl border-b border-white/10 shadow-xl"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 sm:px-8">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={logo}
              alt="Jehad Logo"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>

          <motion.span
  className="text-white text-[28px] sm:text-[34px] whitespace-nowrap"
  style={{
    fontFamily: '"Great Vibes", cursive',
    fontWeight: 400,
    textShadow: '0 1px 1px rgba(255,255,255,0.15)',
    opacity: 0.9,
    letterSpacing: '0.2px',
  }}
  initial={{ opacity: 0, x: -5 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, delay: 0.2 }}
>
  Jehad Shojaeha
</motion.span>



        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm sm:text-base text-white font-medium">
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              className={`list-none relative group transition-all duration-300 ${
                location.pathname === link.path ? `text-[${primaryBlue}]` : 'text-white'
              }`}
              whileHover={{ y: -2, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to={link.path} className="relative px-1">
                <span className="relative z-10">{link.name}</span>
                <span
                  className="absolute left-0 bottom-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500"
                  style={{
                    background: primaryBlue,
                  }}
                />
              </Link>
            </motion.li>
          ))}

          {/* Social Icons */}
          <div className="flex items-center gap-4 ml-4">
            {socialIcons.map(({ icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
                className="text-white hover:text-blue-500 text-lg"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Language Switcher without flags */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="text-xs sm:text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition shadow-sm"
          >
            <span className="font-semibold">{langLabel}</span>
          </motion.button>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 w-3/4 h-full bg-black/90 backdrop-blur-md z-50 flex flex-col items-center text-center px-6 pt-24 space-y-6 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={link.path}
                  className={`text-white text-lg sm:text-xl font-medium hover:text-[${primaryBlue}] transition-all block ${
                    location.pathname === link.path ? `text-[${primaryBlue}]` : ''
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <div className="flex gap-5 pt-4">
              {socialIcons.map(({ icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-500 text-xl transition"
                >
                  {icon}
                </a>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="text-sm border border-white px-4 py-1 rounded-full text-white mt-6 hover:bg-white hover:text-black transition"
            >
              <span className="font-semibold">{langLabel}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
