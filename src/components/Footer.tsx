import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const year = new Date().getFullYear();

  return (
    <footer
      dir={dir}
      className="relative z-10 bg-[#0b0b0b] text-white px-4 py-8 sm:px-6"
    >
      {/* Blur background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/10 blur-xl pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* CTA */}
        <div className="flex flex-col items-center gap-3 text-center text-sm sm:text-base leading-relaxed px-2">
        <p className="text-white/90 font-medium">
          {t('footer.ctaLine1')} <br />
          <span className="text-blue-400 font-semibold">
            {t('footer.ctaLine2')}
          </span>
        </p>
          <motion.a
            href="https://wa.me/972599358641"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-md transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-4 h-4"
            />
            {t('footer.whatsapp')}
          </motion.a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-center sm:text-start px-2">
          {/* Social Icons */}
          <div className="flex gap-4 text-white/70 text-lg">
            <a
              href="https://www.facebook.com/jihad.shojaeha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/jihad.shojaeha/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/jihad-shojaeha/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400">
            © {year} {t('footer.rights')}
          </div>

          {/* Terms link */}
          <div className="text-blue-400 hover:underline">
            <Link to="/privacy-policy">{t('footer.terms')}</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
