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

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const Contact = () => {
    const { t } = useTranslation();

    // بيانات النموذج (name, email, message)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    // حالة الإرسال / الرسالة للمستخدم
    const [status, setStatus] = useState('');

    // متابعة التغير في الحقول
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // إرسال النموذج عبر web3forms
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        setStatus(t('contact.form.sending') || 'جاري الإرسال...');
    
        const form = e.currentTarget;
        const formData = new FormData(form);
    
        // Web3Forms API key
        formData.append('access_key', 'be9559ff-33e5-4a81-8574-66b4a099e6b2');
    
        // Optional metadata
        formData.append('subject', 'رسالة جديدة من نموذج التواصل');
        formData.append('from_name', 'Jehad Website');
    
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
    
        const result = await response.json();
    
        if (result.success) {
          setStatus(t('contact.form.success') || 'تم إرسال الرسالة بنجاح.');
          setFormData({ name: '', email: '', message: '' });
          form.reset();
        } else {
          console.error('Web3Forms Error:', result);
          setStatus(t('contact.form.error') || 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
        }
      } catch (err) {
        console.error('Unexpected Error:', err);
        setStatus(t('contact.form.error') || 'حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.');
      }
    };
    
    

    return (
      <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-[#0f172a] to-[#000] text-white px-6 py-28 overflow-hidden"
    >
      {/* الخلفيات العائمة بلون أزرق بدلًا من الأصفر والبرتقالي */}
      <motion.div
        className="absolute top-16 left-8 w-72 h-72 bg-[#63b3ed]/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 right-8 w-72 h-72 bg-[#3182ce]/10 rounded-full blur-3xl"
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
    
      {/* العنوان بتدرج أزرق */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[#63b3ed] to-[#3182ce] drop-shadow-lg"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        {t('contact.title')}
      </motion.h1>
    
      {/* التوضيح */}
      <motion.p
        className="max-w-xl mx-auto text-center text-sm sm:text-base text-white/80 mb-12 px-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.25}
      >
        {t('contact.intro')}
      </motion.p>
    
      {/* بطاقات التواصل */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
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
            text: <span dir="ltr">+972 599 358641</span>,
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
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 backdrop-blur-md shadow-xl hover:scale-[1.02] duration-300"
          >
            <div className="text-[#63b3ed] group-hover:text-[#3182ce] transition">{item.icon}</div>
            <div>
              <p className="text-sm font-semibold text-white/90">{item.label}</p>
              <p className="text-sm text-white/60 break-words">{item.text}</p>
            </div>
          </a>
        ))}
      </motion.div>
    
      {/* نموذج التواصل */}
      <motion.form
        onSubmit={onSubmit}
        className="bg-white/5 border border-white/10 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto space-y-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.4}
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('contact.form.fullName') || ''}
            className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contact.form.email') || ''}
            className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
            required
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder={t('contact.form.message') || ''}
          className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#63b3ed] to-[#3182ce] hover:from-[#7ec9f5] hover:to-[#2563eb] text-white font-bold px-6 py-3 rounded-full shadow-md transition-all duration-300 w-full sm:w-auto mx-auto"
        >
          <Send className="w-5 h-5" />
          {t('contact.form.button')}
        </button>
        {status && (
          <p className="text-center text-sm text-white/80 mt-4 animate-pulse">
            {status}
          </p>
        )}
      </motion.form>
    </section>
    
    );
  };

  export default Contact;
