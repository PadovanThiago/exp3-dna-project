import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { SectionHeading, ServiceCard } from '@/components/UIComponents';
import { 
  Search, 
  Cpu, 
  GraduationCap, 
  Shield, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const packages = [
    {
      name: 'Starter',
      description: 'Perfect for organizations beginning their AI journey',
      features: [
        'AI maturity assessment',
        '2-week diagnostic sprint',
        'Opportunity roadmap',
        'Risk assessment report',
        'Executive presentation',
      ],
      highlight: false,
    },
    {
      name: 'Growth',
      description: 'For organizations ready to scale their AI capabilities',
      features: [
        'Everything in Starter',
        'Pilot implementation',
        'Team training workshops',
        'Governance framework',
        '3-month support',
        'Quarterly reviews',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive transformation for large organizations',
      features: [
        'Everything in Growth',
        'Full-scale implementation',
        'Custom training program',
        'Dedicated support team',
        '12-month partnership',
        'Executive advisory',
      ],
      highlight: false,
    },
  ];

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

      {/* Packages Section */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <SectionHeading
            title="Service Packages"
            subtitle="Choose the engagement model that fits your organization's needs and goals"
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-card p-8 relative ${
                  pkg.highlight
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : ''
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-exp3-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={pkg.highlight ? 'default' : 'outline'}
                  className={`w-full ${pkg.highlight ? 'glow-cyan' : ''}`}
                >
                  <Link to="/contact">
                    {t('services.requestProposal')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
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
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your specific challenges and goals. We'll recommend the best 
              approach for your organization's AI journey.
            </p>
            <Button asChild size="lg" className="glow-cyan">
              <Link to="/contact">
                Schedule a Consultation
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
