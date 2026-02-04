import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeading, CaseCard } from '@/components/UIComponents';

const Cases: React.FC = () => {
  const { t } = useLanguage();

  const cases = [
    {
      key: 'financial',
      industry: 'Financial Services',
    },
    {
      key: 'retail',
      industry: 'Retail & E-commerce',
    },
    {
      key: 'manufacturing',
      industry: 'Manufacturing',
    },
    {
      key: 'healthcare',
      industry: 'Healthcare',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-exp3-emerald/10 via-transparent to-transparent" />
        
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('cases.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('cases.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((caseItem, index) => (
              <CaseCard
                key={caseItem.key}
                title={t(`cases.${caseItem.key}.title` as any)}
                challenge={t(`cases.${caseItem.key}.challenge` as any)}
                result={t(`cases.${caseItem.key}.result` as any)}
                industry={caseItem.industry}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Highlight */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <SectionHeading
            title="Our Approach in Action"
            subtitle="Every case study demonstrates how our DNA methodology delivers results through continuous entanglement of exploration, exploitation, and explanation."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-8 border-t-4 border-exp3-cyan"
            >
              <h3 className="text-xl font-semibold text-exp3-cyan mb-4">Explore</h3>
              <p className="text-muted-foreground">
                We identify hidden patterns and opportunities in client data, testing hypotheses 
                with minimal disruption to existing operations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 border-t-4 border-exp3-orange"
            >
              <h3 className="text-xl font-semibold text-exp3-orange mb-4">Exploit</h3>
              <p className="text-muted-foreground">
                Validated insights become production-ready systems, engineered for scalability, 
                reliability, and seamless integration.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 border-t-4 border-exp3-emerald"
            >
              <h3 className="text-xl font-semibold text-exp3-emerald mb-4">Explain</h3>
              <p className="text-muted-foreground">
                Every solution includes comprehensive governance frameworks, ensuring stakeholders 
                understand and trust AI-driven decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cases;
