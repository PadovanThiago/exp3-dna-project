import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/UIComponents';
import { 
  Search, 
  Cpu, 
  GraduationCap, 
  Shield, 
  ArrowRight
} from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-exp3-orange/10 via-transparent to-transparent" />
        
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('services.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              title={t('services.diagnosis.title')}
              description={t('services.diagnosis.desc')}
              deliverables={t('services.diagnosis.deliverables')}
              icon={<Search className="w-6 h-6" />}
              delay={0.1}
            />
            <ServiceCard
              title={t('services.implementation.title')}
              description={t('services.implementation.desc')}
              deliverables={t('services.implementation.deliverables')}
              icon={<Cpu className="w-6 h-6" />}
              delay={0.2}
            />
            <ServiceCard
              title={t('services.training.title')}
              description={t('services.training.desc')}
              deliverables={t('services.training.deliverables')}
              icon={<GraduationCap className="w-6 h-6" />}
              delay={0.3}
            />
            <ServiceCard
              title={t('services.governance.title')}
              description={t('services.governance.desc')}
              deliverables={t('services.governance.deliverables')}
              icon={<Shield className="w-6 h-6" />}
              delay={0.4}
            />
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('services.cta.desc')}
            </p>
            <Button asChild size="lg" className="glow-cyan">
              <Link to="/contact">
                {t('services.cta.button')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
