import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHandshake, FaChalkboardTeacher } from 'react-icons/fa';

const About = () => {
  return (
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white py-24 px-6 md:px-24 min-h-screen text-right overflow-hidden" dir="rtl">
        {/* خلفيات ناعمة بلوب */}
        <div className="absolute w-[480px] h-[480px] bg-indigo-700 opacity-10 rounded-full blur-[180px] top-[-100px] left-[-150px]" />
        <div className="absolute w-[400px] h-[400px] bg-pink-600 opacity-10 rounded-full blur-[160px] bottom-[-80px] right-[-120px]" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto space-y-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* العنوان */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-400 drop-shadow-xl leading-tight text-center">
            اكتشف خبرة وتميّز المدرب جهاد شجاعية
          </h1>

          {/* مربع التعريف الأساسي */}
          <motion.div
            className="bg-white/5 p-6 md:p-10 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              جهاد شجاعية هو مدرب وخبير استشاري يتمتع بخبرة دولية واسعة، قدّم خلالها آلاف الساعات التدريبية في فلسطين ومختلف الدول العربية والأوروبية، منها: <span className="text-orange-400 font-medium">الأردن، لبنان، تونس، العراق، السودان، هولندا، وألمانيا</span>.
            </p>

            {/* أيقونات الأرقام */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <FaChalkboardTeacher className="text-yellow-400 text-3xl" />
                <p className="text-gray-100">
                  أكثر من <span className="text-white font-bold">15,000</span> ساعة تدريبية.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaUsers className="text-blue-400 text-3xl" />
                <p className="text-gray-100">
                  أكثر من <span className="text-white font-bold">10,000</span> متدرب ومتدربة.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaHandshake className="text-green-400 text-3xl" />
                <p className="text-gray-100">
                  شراكات مع منظمات مثل <span className="text-white font-bold">EFE، GIZ، JICA، البنك الدولي</span>.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaAward className="text-purple-400 text-3xl" />
                <p className="text-gray-100">
                  حاصل على جوائز محلية ودولية تقديرًا لإسهاماته.
                </p>
              </div>
            </div>
          </motion.div>

          {/* التفاصيل الأخرى */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              تعاون جهاد مع مؤسسات عالمية مرموقة مثل: مؤسسة التعليم من أجل التوظيف، JICA، GIZ، البنك الدولي، والوكالة السويدية للتنمية، بالإضافة إلى مؤسسات مجتمعية محلية بارزة.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed bg-white/5 p-5 rounded-lg border-r-4 border-orange-500 shadow-md">
              ركّز في السنوات الأخيرة على دعم المدربين الطموحين، من خلال استراتيجيات فعّالة للحصول على عقود مع مؤسسات محلية ودولية، واحتراف سوق التدريب المدفوع.
            </p>

            <p className="text-center text-xl font-semibold text-white mt-10">
              سواء كنت مدربًا في بداية الطريق أو محترفًا يسعى للتوسّع... جهاد شجاعية هو شريكك الحقيقي للانطلاق بثقة نحو النجاح.
            </p>
            
          </motion.div>
        </motion.div>

      </section>
  );
};

export default About;
