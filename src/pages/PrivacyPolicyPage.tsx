import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Section {
  title: string;
  content?: string[];
  list?: string[];
}

const TermsAndPrivacyPage = () => {
  const { t, i18n } = useTranslation();
  const sections = t('termsPage.sections', { returnObjects: true }) as Section[];

  return (
    <div className="relative bg-gradient-to-b from-[#0a1122] to-[#000] px-4 py-16 sm:py-20 overflow-hidden min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto leading-relaxed text-gray-200"
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        initial={{ opacity: 0.2, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mb-14 text-center">
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-blue-400 mb-4">
            {t('termsPage.title')}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            {t('termsPage.description')}
          </p>
          <div className="w-28 h-1 bg-blue-500/70 rounded-full mt-6 mx-auto" />
        </div>

        {sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 border-b border-blue-100 pb-1">
              {section.title}
            </h2>
            {section.content?.map((para: string, idx: number) => (
              <p key={idx} className="mb-4 text-[15px] text-gray-300">{para}</p>
            ))}
            {section.list && (
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 mt-2 pr-2">
                {section.list.map((item: string, idx: number) => (
                  <li key={idx} className="py-1">{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className="mt-16 text-xs text-gray-500 text-center">
          {t('termsPage.lastUpdated', { date: new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US') })}
        </p>
      </motion.div>
    </div>
  );
};

export default TermsAndPrivacyPage;
