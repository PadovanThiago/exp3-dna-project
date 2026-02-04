import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/UIComponents';
import { ExternalLink, Mail } from 'lucide-react';

const Content: React.FC = () => {
  const { t } = useLanguage();

  const articles = [
    {
      title: 'The Future of Cognitive Symbiosis in Enterprise AI',
      excerpt: 'How the partnership between human creativity and machine intelligence is reshaping business operations and creating new paradigms for value creation.',
      date: 'Jan 28, 2025',
    },
    {
      title: 'Beyond Black Boxes: Implementing Explainable AI',
      excerpt: 'A practical guide to building AI systems that stakeholders can understand and trust. Why transparency is the foundation of sustainable AI adoption.',
      date: 'Jan 15, 2025',
    },
    {
      title: 'The DNA Model: Why Sequential AI Implementation Fails',
      excerpt: 'Understanding why the most successful AI implementations embrace entanglement over sequence. Lessons from organizations that got it right.',
      date: 'Jan 5, 2025',
    },
    {
      title: 'Governance First: Building Trust in AI Systems',
      excerpt: 'The essential layer most organizations skip. How to establish governance frameworks that enable rather than restrict innovation.',
      date: 'Dec 18, 2024',
    },
    {
      title: 'From POC to Production: The Exploitation Challenge',
      excerpt: 'Why 80% of AI proofs of concept never reach production, and the engineering principles that separate successful implementations.',
      date: 'Dec 5, 2024',
    },
    {
      title: 'The Exploration Mindset: Testing Hypotheses at Scale',
      excerpt: 'How leading organizations create safe spaces for AI experimentation without risking core operations or compliance.',
      date: 'Nov 22, 2024',
    },
  ];

  const resources = [
    {
      title: 'AI Implementation Checklist',
      description: 'A comprehensive guide to preparing your organization for AI adoption',
      type: 'PDF Guide',
    },
    {
      title: 'Data Maturity Assessment Framework',
      description: 'Self-assessment tool to evaluate your data infrastructure readiness',
      type: 'Interactive Tool',
    },
    {
      title: 'Governance Template Pack',
      description: 'Ready-to-use templates for AI governance policies and procedures',
      type: 'Template Pack',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('content.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('content.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-primary/5 border-y border-border/50">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('content.subscribe')}</h3>
                <p className="text-sm text-muted-foreground">Get weekly insights on strategic AI</p>
              </div>
            </div>
            <Button asChild variant="default" className="glow-cyan">
              <a href="https://substack.com" target="_blank" rel="noopener noreferrer">
                Subscribe on Substack
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-10"
          >
            {t('content.latest')}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ContentCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                readMoreText={t('content.readMore')}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Downloadable Resources
            </h2>
            <p className="text-muted-foreground">
              Practical tools and frameworks to accelerate your AI journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 hover-lift cursor-pointer group"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                  {resource.type}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
