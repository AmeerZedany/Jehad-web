import { useTranslation } from 'react-i18next';
import HeaderSection1 from '../components/home/header/HeaderSection1';
import HeaderSection2 from '../components/home/header/HeaderSection2';
import HeaderSection3 from '../components/home/header/HeaderSection3';
import JehadBetweenImage from '../assets/Jehad-between.png';

const Home = () => {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="bg-gradient-to-b from-[#0f172a] to-[#000] text-white">
      <HeaderSection1 />
      <HeaderSection2 />

      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-hidden">
        {/* الصورة الأساسية */}
        <img
          src={JehadBetweenImage}
          alt="Jehaf transition"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.85] contrast-[1.1] saturate-[1.2] scale-[1.02]"
          loading="lazy"
        />

        {/* تدرج فوق الصورة من الأسفل للأعلى لدمجها مع الخلفية */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-black/60 to-transparent pointer-events-none" />

        {/* تدرج ثاني من الأعلى للأسفل */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* تأثير إضافي للعمق */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
      </div>
      <HeaderSection3 />
    </div>
  );
};

export default Home;
