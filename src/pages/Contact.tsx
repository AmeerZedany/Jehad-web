import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Send, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { 
            duration: 0.6, 
            delay, 
            ease: [0.22, 1, 0.36, 1] 
        },
    }),
};

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(t('contact.form.sending') || 'Sending...');
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
            formData.append('subject', 'New contact message');
            formData.append('from_name', 'Jehad Website');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

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

    return (
        <section
        id="contact"
        className="relative bg-gradient-to-b from-[#0a1122] to-[#000] text-white px-6 py-16 sm:py-20 overflow-hidden"
      >
        {/* Subtle Background Effects */}
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
      
        {/* Optimized Title Section */}
        <div className="max-w-4xl mx-auto text-center px-4 pt-6 pb-8">
          <motion.h1
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            custom={0.1}
          >
            {t('contact.title')}
          </motion.h1>
      
          <motion.p
            className="mt-3 text-[clamp(0.9rem,3vw,1.1rem)] text-gray-300/90 leading-relaxed max-w-xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            {t('contact.intro')}
          </motion.p>
        </div>
            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                {/* Form Section */}
                <motion.form
                    onSubmit={onSubmit}
                    className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl space-y-6"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.3}
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('contact.form.fullName') || ''}
                                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63b3ed]/50 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('contact.form.email') || ''}
                                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63b3ed]/50 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder={t('contact.form.subject') || ''}
                                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63b3ed]/50 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder={t('contact.form.message') || ''}
                            className="w-full bg-white/5 border border-white/15 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63b3ed]/50 focus:border-transparent transition-all duration-200 min-h-[120px]"
                            required
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#63b3ed] to-[#3182ce] hover:from-[#7ec9f5] hover:to-[#2563eb] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full text-sm"
                        >
                            <Send className="w-4 h-4" />
                            <span>{t('contact.form.button')}</span>
                        </button>
                        {status && (
                            <p className="text-center text-sm text-white/80 mt-3 animate-pulse">
                                {status}
                            </p>
                        )}
                    </div>
                </motion.form>

                {/* Contact Cards Section */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-fit"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    {[
                        {
                            icon: <Mail className="w-4 h-4" />,
                            label: t('contact.infoCards.email'),
                            link: 'mailto:jihadxp@gmail.com',
                            text: 'jihadxp@gmail.com',
                        },
                        {
                            icon: <Phone className="w-4 h-4" />,
                            label: t('contact.infoCards.phone'),
                            link: 'tel:+972599358641',
                            text: <span dir="ltr">+972 599 358641</span>,
                        },
                        {
                            icon: <MessageCircle className="w-4 h-4" />,
                            label: t('contact.infoCards.whatsapp'),
                            link: 'https://wa.me/972599358641',
                            text: t('contact.infoCards.whatsapp'),
                        },
                        {
                            icon: <Calendar className="w-4 h-4" />,
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
                            className="group flex gap-4 items-start p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-white/10 p-3 rounded-lg text-[#63b3ed] group-hover:text-[#3182ce] transition-colors duration-300">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white/90 mb-1">
                                    {item.label}
                                </p>
                                <p className="text-xs text-white/60 break-words">
                                    {item.text}
                                </p>
                            </div>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;