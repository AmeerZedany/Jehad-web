
const testimonials = [
  {
    name: 'سارة - متدربة',
    content: 'بعد تدريبي مع المدرب جهاد، حصلت على أول عقد تدريبي لي مع مؤسسة دولية. كانت التجربة فارقة!',
  },
  {
    name: 'خالد - مدرب مستقل',
    content: 'جهاد ساعدني أرتب أفكاري وأبني عرض تدريبي احترافي، والنتيجة؟ عقد تدريب بـ 4 أرقام!',
  },
  {
    name: 'ليلى - مشاركة في برنامج BreakThrough',
    content: 'تجربتي مع جهاد كانت ملهمة، شعرت أني أقدر أغيّر واقعي المهني بالكامل.',
  },
];

const Testimonials = () => {
  return (
      <div className="container mx-auto px-4 pt-32 max-w-4xl text-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center">قصص النجاح والتوصيات</h1>

        <p className="text-lg text-center mb-12 text-gray-600">
          قصص لأشخاص خاضوا رحلة التدريب مع جهاد شجاعية وحققوا إنجازات حقيقية.
        </p>

        <div className="space-y-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">“{t.content}”</p>
              <p className="text-sm text-gray-500 text-right">- {t.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">قريبًا: فيديوهات، صور، وشهادات صوتية حقيقية من المتدربين والعملاء.</p>
          <p className="text-sm text-gray-400">يمكنك إرسال التوصيات أو الشهادات لاحقًا وسأضيفها هنا.</p>
        </div>
      </div>
  );
};

export default Testimonials;
