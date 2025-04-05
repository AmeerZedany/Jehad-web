import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // تأكد أن هذا موجود أعلى الملف
import TermsAndPrivacyPage from '../pages/PrivacyPolicyPage'; // مسار الصفحة

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <footer
      dir={dir}
      className="relative z-10 bg-[#0b0b0b] text-white px-6 py-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/5 blur-2xl pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top: Contact & WhatsApp */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed">
            هل أنت مستعد لتبدأ رحلتك؟ <br className="hidden sm:block" />
            <span className="text-blue-400 font-semibold">
              لدخول عالم التدريب المدفوع والعقود التدريبية.
            </span>
          </p>

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
            تواصل معنا على واتساب
          </motion.a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Social Icons */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="flex gap-4 text-white/70 text-xl">
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
          </div>

          {/* Copyright Center */}
          <div className="text-center text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} {t('footer.rights')}
          </div>

          {/* Terms on the left */}
<div className="text-xs text-blue-400 font-medium hover:underline">
  <Link to="/privacy-policy">
    {t('footer.terms')}
  </Link>
</div>

        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
