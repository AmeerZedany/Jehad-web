import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaGraduationCap,
  FaLightbulb,
  FaBuilding,
} from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

interface ServiceCardProps {
  icon: React.ComponentType<IconBaseProps>;
  color: string; // Tailwind hue (yellow | blue | green)
  titleKey: string;
  listKey: string;
  variants: Record<string, any>;
}

const ServiceCard = ({
  icon: Icon,
  color,
  titleKey,
  listKey,
  variants,
}: ServiceCardProps) => {
  const { t, i18n } = useTranslation();
  const bulletColor = 'text-orange-400';

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="group relative flex h-full flex-col rounded-xl bg-white/5 px-5 py-6 backdrop-blur-md
                 border border-white/10 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      {/* Hover tint */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
                    group-hover:opacity-100 bg-gradient-to-br from-${color}-500/15 to-transparent`}
      />
      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          whileHover={{ rotate: 5, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mb-4 text-4xl"
        >
          <Icon className={`text-${color}-400`} />
        </motion.span>

        <h3
          className={`mb-4 font-bold tracking-tight text-${color}-300
                      text-[clamp(1.1rem,3.2vw,1.6rem)]`}
        >
          {t(titleKey)}
        </h3>

        <ul
          className="flex-1 space-y-2 overflow-hidden text-[clamp(0.82rem,2.2vw,1rem)]
                     leading-relaxed text-gray-300"
        >
          {(t(listKey, { returnObjects: true }) as string[]).map(
            (item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`${bulletColor} mt-1`}>•</span>
                <span className="break-words text-pretty">{item}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Section                                                      */
/* ------------------------------------------------------------------ */

const HeaderSection3 = () => {
  const { t } = useTranslation();

  /* Animation variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-black to-[#0f172a] px-4 py-16 text-white
                        sm:px-6 sm:py-24 md:px-8 md:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl
                        sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl
                        sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className="relative mx-auto max-w-6xl space-y-14"
      >
        {/* Title */}
        <motion.header variants={itemVariants} className="text-center">
          <h2 className="mb-5 text-[clamp(1.75rem,5vw,3.2rem)] font-extrabold tracking-tight">
            {t('headerSection3.title')}
          </h2>
          <p className="mx-auto max-w-3xl px-2 text-[clamp(0.9rem,3vw,1.5rem)] tracking-wide text-white/80 sm:px-0">
            {t('headerSection3.subtitle')}
          </p>
        </motion.header>

        {/* Services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={FaGraduationCap}
            color="yellow"
            titleKey="headerSection3.tot.title"
            listKey="headerSection3.tot.items"
            variants={itemVariants}
          />
          <ServiceCard
            icon={FaLightbulb}
            color="blue"
            titleKey="headerSection3.consulting.title"
            listKey="headerSection3.consulting.items"
            variants={itemVariants}
          />
          <ServiceCard
            icon={FaBuilding}
            color="green"
            titleKey="headerSection3.corporate.title"
            listKey="headerSection3.corporate.items"
            variants={itemVariants}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeaderSection3;
