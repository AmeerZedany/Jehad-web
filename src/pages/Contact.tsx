import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch('https://formspree.io/f/xqkrbzkw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('✅ تم إرسال رسالتك بنجاح.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
      }
    } catch (error) {
      setStatus('❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-32 overflow-hidden"
    >
      {/* Floating Backgrounds */}
      <motion.div
        className="absolute top-16 left-8 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 right-8 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
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

      {/* Title */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        تواصل معنا
      </motion.h1>

      {/* Contact Info Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        {[
          {
            icon: <Mail className="w-5 h-5" />,
            label: 'البريد الإلكتروني',
            link: 'mailto:jihadxp@gmail.com',
            text: 'jihadxp@gmail.com',
          },
          {
            icon: <Phone className="w-5 h-5" />,
            label: 'الهاتف',
            link: 'tel:+972599358641',
            text: '+972 599 358641',
          },
          {
            icon: <MessageCircle className="w-5 h-5" />,
            label: 'واتساب',
            link: 'https://wa.me/972599358641',
            text: 'واتساب مباشر',
          },
          {
            icon: <Calendar className="w-5 h-5" />,
            label: 'احجز استشارة',
            link: 'https://calendly.com/jihad_coach/jihad_coach1',
            text: 'رابط الحجز',
          },
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 backdrop-blur-md shadow-xl hover:scale-[1.02] duration-300"
          >
            <div className="text-yellow-400">{item.icon}</div>
            <div>
              <p className="text-sm font-semibold text-white/90">{item.label}</p>
              <p className="text-sm text-white/60 break-words">{item.text}</p>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Social Media Links */}
      <motion.div
        className="max-w-sm mx-auto flex items-center justify-around mb-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.35}
      >
        {[
          {
            icon: <Facebook className="w-6 h-6" />,
            link: 'https://www.facebook.com/jihad.shojaeha',
            label: 'فيسبوك',
          },
          {
            icon: <Instagram className="w-6 h-6" />,
            link: 'https://www.instagram.com/jihad.shojaeha/?hl=en',
            label: 'إنستغرام',
          },
          {
            icon: <Linkedin className="w-6 h-6" />,
            link: 'https://www.linkedin.com/in/jihad-shojaeha/',
            label: 'لينكدإن',
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition duration-200 flex flex-col items-center"
            aria-label={item.label}
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
          </a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto space-y-6"
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
            placeholder="الاسم الكامل"
            className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="اكتب رسالتك هنا..."
          className="w-full bg-transparent border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        ></textarea>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-full shadow-md transition-all duration-300 w-full sm:w-auto mx-auto"
        >
          <Send className="w-5 h-5" /> إرسال الرسالة
        </button>
        {status && <p className="text-center text-sm text-white/80 mt-4 animate-pulse">{status}</p>}
      </motion.form>
    </section>
  );
};

export default Contact;
