import { motion } from 'framer-motion';

const TermsAndPrivacyPage = () => {
  return (
    <motion.div
      className="bg-white text-gray-800 px-6 py-20 sm:py-24 max-w-5xl mx-auto leading-relaxed text-right"
      initial={{ opacity: 0.2, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Title with AppBar padding */}
      <div className="mb-14 text-center">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-blue-600 mb-4">
          الشروط والأحكام
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          نُقدّر ثقتك بنا. يرجى قراءة الشروط والسياسات التالية بعناية لفهم كيفية استخدامك لموقعنا وخدماتنا.
        </p>
        <div className="w-28 h-1 bg-blue-500/70 rounded-full mt-6 mx-auto" />
      </div>

      {/* Sections */}
      {[
        {
          title: 'شروط الاستخدام',
          content: [
            'يرجى قراءة هذه الشروط بعناية قبل استخدام هذا الموقع الإلكتروني.',
            'دخولك إلى الموقع أو استخدامه يعني موافقتك الكاملة غير المشروطة على الالتزام بهذه الشروط.',
            'إذا لم توافق على أي من هذه الشروط، نرجو التوقف عن استخدام الموقع فورًا.',
          ],
        },
        {
          title: 'سياسة الخصوصية',
          content: [
            'نحترم خصوصيتك. لا يتم جمع أي معلومات شخصية دون موافقتك الصريحة.',
            'تصفح الموقع لا يتطلب تسجيل بيانات شخصية، إلا عند الاشتراك في خدمات محددة.',
          ],
        },
        {
          title: 'الملكية الفكرية',
          content: [
            'جميع المحتويات (نصوص، صور، تصاميم، شعارات، فيديوهات، ...إلخ) مملوكة للمدرب جهاد شجاعية وفريقه.',
            'يُمنع إعادة استخدام أو تعديل أو توزيع أي محتوى دون إذن كتابي رسمي.',
          ],
        },
        {
          title: 'الاستخدام القانوني للموقع',
          content: [
            'يُمنع استخدام الموقع في أي أغراض غير قانونية أو تنتهك الحقوق أو تنشر محتوى ضار.',
          ],
          list: [
            'المحتوى غير القانوني أو المنتهك لحقوق الملكية.',
            'التحريض على العنف أو الكراهية أو التمييز.',
            'النشر الدعائي غير المصرّح به أو البرمجيات الخبيثة.',
          ],
        },
        {
          title: 'العلامات التجارية',
          content: [
            'كل العلامات والشعارات المرتبطة بالموقع هي علامات تجارية حصرية.',
            'أي استخدام لها دون إذن يُعد انتهاكًا قانونيًا.',
          ],
        },
        {
          title: 'استخدام المنتجات المجانية والمدفوعة',
          content: [
            'يُسمح بالاستخدام الشخصي فقط للمنتجات المتوفرة في الموقع (الدورات، الملفات، إلخ).',
          ],
          list: [
            'يُمنع البيع أو إعادة النشر أو التعديل.',
            'يُمنع الاستخدام التجاري دون موافقة خطية.',
          ],
        },
        {
          title: 'عدم تقديم ضمانات',
          content: [
            'الموقع والخدمات تُقدّم كما هي بدون أي ضمانات مباشرة أو ضمنية.',
            'لا نضمن دقة أو استمرارية الخدمة أو خلوها من الأعطال.',
          ],
        },
        {
          title: 'تحديد المسؤولية',
          content: [
            'الموقع غير مسؤول عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدامك أو عدم قدرتك على استخدامه.',
          ],
        },
      ].map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mb-4 border-b border-blue-100 pb-1">
            {section.title}
          </h2>
          {section.content.map((para, idx) => (
            <p key={idx} className="mb-3 text-[15px] text-gray-700">
              {para}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mt-2 pr-2">
              {section.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Last Updated */}
      <p className="mt-16 text-xs text-gray-400 text-center">
        تم تحديث هذه الصفحة بتاريخ: {new Date().toLocaleDateString('ar-EG')}.
      </p>
    </motion.div>
  );
};

export default TermsAndPrivacyPage;
