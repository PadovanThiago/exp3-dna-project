import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import DNAHelix from '@/components/DNAHelix';
import StrandCard from '@/components/StrandCard';
import { StatCard, ContentCard } from '@/components/UIComponents';
import heroBg from '@/assets/hero-bg.jpg';
import { 
  Search, 
  Rocket, 
  Shield, 
  BrainCircuit, 
  Users, 
  Scale,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-exp3-cyan/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-exp3-cyan/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-exp3-emerald/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Strategic AI Consulting</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                {t('hero.title').split(':')[0]}:
                <span className="text-gradient-cyan block mt-2">
                  {t('hero.title').split(':')[1]}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="glow-cyan text-base px-8">
                  <Link to="/contact">
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8">
                  <Link to="/about">
                    {t('hero.ctaSecondary')}
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* DNA Helix Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center"
            >
              <DNAHelix size="lg" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('value.title')}
              <span className="text-gradient-cyan block">{t('value.titleHighlight')}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-exp3-cyan/10 flex items-center justify-center mx-auto mb-6">
                <BrainCircuit className="w-8 h-8 text-exp3-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value.symbiosis.title')}
              </h3>
              <p className="text-muted-foreground">{t('value.symbiosis.desc')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-exp3-orange/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-exp3-orange" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value.augmented.title')}
              </h3>
              <p className="text-muted-foreground">{t('value.augmented.desc')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-exp3-emerald/10 flex items-center justify-center mx-auto mb-6">
                <Scale className="w-8 h-8 text-exp3-emerald" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value.governance.title')}
              </h3>
              <p className="text-muted-foreground">{t('value.governance.desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Preview */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('methodology.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('methodology.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                {t('methodology.learnMore')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="50+" label={t('stats.projects')} delay={0} />
            <StatCard value="2000+" label={t('stats.hours')} delay={0.1} />
            <StatCard value="30+" label={t('stats.clients')} delay={0.2} />
            <StatCard value="12" label={t('stats.countries')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Latest Content Preview */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t('content.latest')}
              </h2>
              <p className="text-muted-foreground">{t('content.subtitle')}</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/content">
                {t('content.viewAll')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ContentCard
              title="The Future of Cognitive Symbiosis in Enterprise AI"
              excerpt="How the partnership between human creativity and machine intelligence is reshaping business operations..."
              date="Jan 28, 2025"
              readMoreText={t('content.readMore')}
              delay={0.1}
            />
            <ContentCard
              title="Beyond Black Boxes: Implementing Explainable AI"
              excerpt="A practical guide to building AI systems that stakeholders can understand and trust..."
              date="Jan 15, 2025"
              readMoreText={t('content.readMore')}
              delay={0.2}
            />
            <ContentCard
              title="The DNA Model: Why Sequential AI Implementation Fails"
              excerpt="Understanding why the most successful AI implementations embrace entanglement over sequence..."
              date="Jan 5, 2025"
              readMoreText={t('content.readMore')}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-exp3-cyan/10 via-transparent to-exp3-emerald/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                {t('contact.subtitle')}
              </p>
              <Button asChild size="lg" className="glow-cyan text-base px-10">
                <Link to="/contact">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
