import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  Send,
  MessageCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/* ------------------------------ Animations ------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ----------------------------------------------------------------------- */
const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  /* --------------------------- Form Handlers --------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(t('contact.form.sending') || 'Sending...');
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      data.append('access_key', 'be9559ff-33e5-4a81-8574-66b4a099e6b2');
      data.append('subject', 'New contact message');
      data.append('from_name', 'Jehad Website');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        
      });
      const result = await res.json();

      if (result.success) {
        setStatus(t('contact.form.success') || 'Message sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        form.reset();
      } else {
        setStatus(t('contact.form.error') || 'Error sending message.');
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus(t('contact.form.error') || 'Unexpected error.');
    }
  };

  /* ------------------------------- JSX ------------------------------- */
  return (
    <section
      id="contact"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative bg-gradient-to-b from-[#0a1122] to-black text-white px-6 py-16 sm:py-20 overflow-hidden"
    >
      {/* -------- Decorative Backgrounds -------- */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-[#63b3ed]/10 rounded-xl blur-xl rotate-45 opacity-60"
        animate={{ rotate: [45, -45, 45] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-40 h-40 bg-[#3182ce]/10 rounded-full blur-xl opacity-60"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ---------------- Title ---------------- */}
      <div className="max-w-4xl mx-auto text-center px-4 pt-6 pb-8">
        <motion.h1
          className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-white mb-4 sm:mb-6 tracking-tight"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          custom={0.1}
        >
          {t('contact.title')}
        </motion.h1>

        <motion.p
          className="mt-3 text-[clamp(0.9rem,3vw,1.1rem)] text-gray-300/90 max-w-xl mx-auto leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          {t('contact.intro')}
        </motion.p>
      </div>

      {/* --------------- Main Grid --------------- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {/* ---------------- FORM ---------------- */}
        <motion.form
          onSubmit={onSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          {/* Inputs */}
          <div className="grid sm:grid-cols-2 gap-5">
            {['name', 'email'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                required
                placeholder={t(`contact.form.${field === 'name' ? 'fullName' : 'email'}`) || ''}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#63b3ed]/50 focus:outline-none transition"
              />
            ))}
            <input
              type="text"
              name="subject"
              required
              placeholder={t('contact.form.subject') || ''}
              value={formData.subject}
              onChange={handleChange}
              className="sm:col-span-2 w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#63b3ed]/50 focus:outline-none transition"
            />
          </div>

          <textarea
            name="message"
            rows={5}
            required
            placeholder={t('contact.form.message') || ''}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#63b3ed]/50 focus:outline-none transition min-h-[120px]"
          />

          {/* Submit */}
          <div className="pt-2">
  <button
    type="submit"
    className={`flex items-center justify-center bg-gradient-to-r from-[#63b3ed] to-[#3182ce] hover:from-[#7ec9f5] hover:to-[#2563eb] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg w-full text-sm transition`}
  >
    <Send
      className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`}
    />
    <span>{t('contact.form.button')}</span>
  </button>

  {status && (
    <motion.p
      className="text-center text-sm text-white/80 mt-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {status}
    </motion.p>
  )}
</div>

        </motion.form>

        {/* -------------- INFO CARDS -------------- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          {[
            {
              icon: <Mail className="w-5 h-5" />,
              label: t('contact.infoCards.email'),
              link: 'mailto:jihadxp@gmail.com',
              text: 'jihadxp@gmail.com',
            },
            {
              icon: <Phone className="w-5 h-5" />,
              label: t('contact.infoCards.phone'),
              link: 'tel:+972599358641',
              text: <span dir="ltr">+972&nbsp;599&nbsp;358641</span>,
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              label: t('contact.infoCards.whatsapp'),
              link: 'https://wa.me/972599358641',
              text: t('contact.infoCards.whatsapp'),
            },
            {
              icon: <Calendar className="w-5 h-5" />,
              label: t('contact.infoCards.booking'),
              link: 'https://calendly.com/jihad_coach/jihad_coach1',
              text: t('contact.infoCards.booking'),
            },
          ].map((c, i) => (
            <a
              key={i}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#63b3ed] group-hover:text-[#3182ce] transition-colors">
                {c.icon}
              </span>
              <p className="text-sm font-medium text-white/90">{c.label}</p>
              <p className="text-xs text-white/60 break-words">{c.text}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
