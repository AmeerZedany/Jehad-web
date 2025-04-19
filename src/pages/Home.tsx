import { useTranslation } from 'react-i18next';
import HeaderSection1 from '../components/home/header/HeaderSection1';
import HeaderSection2 from '../components/home/header/HeaderSection2';
import HeaderSection3 from '../components/home/header/HeaderSection3';
import JehadBetweenImage from '../assets/Jehad-between.png';

const Home = () => {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      className="bg-gradient-to-b from-[#0f172a] to-black text-white overflow-hidden"
    >
      {/* Hero with bottom fade */}
      <div className="relative">
        <HeaderSection1 />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-black" />
      </div>

      <HeaderSection2 />
      
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-hidden z-0">
      <img
        src={JehadBetweenImage}
        alt="Jehad transition"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.02] contrast-[1.05] saturate-[1.15]"
      />

      {/* ✅ Subtle 5px white blend at top */}
      <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

      {/* Bottom black fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none z-10" />
    </div>


      <HeaderSection3 />
    </div>
  );
};

export default Home;
