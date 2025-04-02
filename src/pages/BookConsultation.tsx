import React from 'react';
import PageTransition from '../components/PageTransition';
import { Calendar } from 'lucide-react';

const BookConsultation = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-32 max-w-4xl text-gray-800 leading-relaxed">
        <h1 className="text-4xl font-bold mb-8 text-center">احجز استشارتك الآن</h1>

        <p className="text-lg mb-6 text-gray-700 text-center">
          هل ترغب في دخول عالم التدريب المدفوع أو الحصول على عقود استشارية مع مؤسسات محلية ودولية؟  
          من خلال هذه الجلسات الإرشادية الفردية، سأساعدك على تحديد أهدافك وبناء مسارك المهني بخطوات عملية.
        </p>

        {/* الباقات */}
        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-orange-600">باقة استشارة فردية</h2>
            <p className="mb-4 text-gray-600">جلسة زووم لمدة 45 دقيقة لمراجعة وضعك وتوجيهك لبناء خطة عمل فورية.</p>
            <p className="font-bold text-lg mb-4">السعر: 50$</p>
            <a 
              href="https://calendly.com/jehad/1on1" 
              target="_blank" 
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full transition-all"
            >
              احجز الآن
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-orange-600">باقة متابعة لمدة شهر</h2>
            <p className="mb-4 text-gray-600">4 جلسات (كل أسبوع جلسة) + دعم على الواتساب + مراجعة ملفاتك واستراتيجيتك.</p>
            <p className="font-bold text-lg mb-4">السعر: 180$</p>
            <a 
              href="https://calendly.com/jehad/month" 
              target="_blank" 
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full transition-all"
            >
              احجز الباقة
            </a>
          </div>
        </div>

        {/* ملاحظة */}
        <div className="mt-12 text-center text-sm text-gray-500">
          يمكن الدفع عبر PayPal أو بطاقة ائتمان بعد الحجز. سيتم إرسال التفاصيل عبر البريد الإلكتروني.
        </div>
      </div>
    </PageTransition>
  );
};

export default BookConsultation;
