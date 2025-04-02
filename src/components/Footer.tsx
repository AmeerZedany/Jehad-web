import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <footer
      dir={dir}
      className="relative z-10 bg-[#0b0b0b] text-white px-6 py-14 overflow-hidden"
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-green-500/10 blur-2xl pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contact CTA */}
        <p className="text-lg sm:text-xl font-medium text-white/90">
          {t('footer.ready')}
        </p>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/972599358641"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-2.5 rounded-full text-base font-semibold shadow-md transition-all duration-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          {t('footer.whatsapp')}
        </motion.a>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-6" />

        {/* Social Icons */}
        <div className="flex gap-5 text-white/70 text-lg">
          <a
            href="https://www.facebook.com/jihad.shojaeha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/jihad.shojaeha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/jihad-shojaeha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {t('footer.rights')}
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
