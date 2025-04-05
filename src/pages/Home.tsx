import { useTranslation } from 'react-i18next';
import HeaderSection1 from '../components/home/header/HeaderSection1';
import HeaderSection2 from '../components/home/header/HeaderSection2';
import HeaderSection3 from '../components/home/header/HeaderSection3';

const Home = () => {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';


  return (
    <div dir={dir} className="bg-gradient-to-br from-[#0f172a] via-[#3b0764] to-[#1e1b4b] text-white">
      <HeaderSection1 />
      <HeaderSection2 />
      <HeaderSection3 />
      </div>
  );
};

export default Home;