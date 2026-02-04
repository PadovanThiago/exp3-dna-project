import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import DNAHelix from '@/components/DNAHelix';
import StrandCard from '@/components/StrandCard';
import { SectionHeading } from '@/components/UIComponents';
import { Search, Rocket, Shield, Users, Zap, Target } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-exp3-cyan/10 via-transparent to-transparent" />
        
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('about.intro')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* DNA Methodology Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <SectionHeading
            title={t('methodology.title')}
            subtitle={t('methodology.description')}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* DNA Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <DNAHelix size="lg" />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="glass-card p-6 border-l-4 border-exp3-cyan">
                <h4 className="text-lg font-semibold text-exp3-cyan mb-2">Continuous Entanglement</h4>
                <p className="text-muted-foreground">
                  Unlike traditional sequential approaches, our three strands work simultaneously, 
                  constantly informing and enhancing each other throughout the engagement.
                </p>
              </div>
              <div className="glass-card p-6 border-l-4 border-exp3-orange">
                <h4 className="text-lg font-semibold text-exp3-orange mb-2">Dynamic Intensity</h4>
                <p className="text-muted-foreground">
                  The intensity of each strand varies based on the current needs, but all three 
                  are always present and active—never fully dormant.
                </p>
              </div>
              <div className="glass-card p-6 border-l-4 border-exp3-emerald">
                <h4 className="text-lg font-semibold text-exp3-emerald mb-2">Mutual Reinforcement</h4>
                <p className="text-muted-foreground">
                  Each strand strengthens the others: exploration informs exploitation, 
                  exploitation reveals what needs explanation, and explanation guides new exploration.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Strand Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            <StrandCard
              title={t('methodology.explore.title')}
              subtitle={t('methodology.explore.subtitle')}
              description={t('methodology.explore.desc')}
              icon={<Search className="w-7 h-7" />}
              strand="explore"
              delay={0.1}
            />
            <StrandCard
              title={t('methodology.exploit.title')}
              subtitle={t('methodology.exploit.subtitle')}
              description={t('methodology.exploit.desc')}
              icon={<Rocket className="w-7 h-7" />}
              strand="exploit"
              delay={0.2}
            />
            <StrandCard
              title={t('methodology.explain.title')}
              subtitle={t('methodology.explain.subtitle')}
              description={t('methodology.explain.desc')}
              icon={<Shield className="w-7 h-7" />}
              strand="explain"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Think Tank Section */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.thinkTank.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t('about.thinkTank.desc')}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Collaborative</h4>
                    <p className="text-sm text-muted-foreground">Your team inside the process</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Real-time</h4>
                    <p className="text-sm text-muted-foreground">Knowledge refined continuously</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Contextual</h4>
                    <p className="text-sm text-muted-foreground">Your business, our expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Exploratory</h4>
                    <p className="text-sm text-muted-foreground">Positive intellectual friction</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-exp3-cyan/5 to-exp3-emerald/5" />
                <div className="relative z-10">
                  <blockquote className="text-xl md:text-2xl font-medium text-foreground italic mb-6">
                    "The complexity of AI demands multiple perspectives. We create environments 
                    where knowledge is generated, tested, and refined in real-time."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">E³</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">EXP³ Philosophy</p>
                      <p className="text-sm text-muted-foreground">Strategic Think Tank</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
