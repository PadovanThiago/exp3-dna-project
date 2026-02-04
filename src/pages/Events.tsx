import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const Events: React.FC = () => {
  const { t } = useLanguage();

  const upcomingEvents = [
    {
      title: 'AI Strategy Sprint Workshop',
      date: 'Feb 15, 2025',
      time: '09:00 - 17:00',
      location: 'São Paulo, Brazil',
      format: 'In-person',
      description: 'Intensive one-day workshop to define your AI strategy and identify high-impact opportunities.',
      spots: 12,
    },
    {
      title: 'Explainable AI for Executives',
      date: 'Feb 22, 2025',
      time: '14:00 - 16:00',
      location: 'Online',
      format: 'Webinar',
      description: 'Learn how to evaluate and implement AI systems that stakeholders can understand and trust.',
      spots: 50,
    },
    {
      title: 'Data Governance Masterclass',
      date: 'Mar 5-6, 2025',
      time: '09:00 - 18:00',
      location: 'New York, USA',
      format: 'In-person',
      description: 'Two-day intensive training on building governance frameworks for AI and data systems.',
      spots: 20,
    },
  ];

  const pastEvents = [
    {
      title: 'AI Implementation Best Practices',
      date: 'Jan 20, 2025',
      location: 'Online',
      attendees: 156,
    },
    {
      title: 'From POC to Production Workshop',
      date: 'Dec 12, 2024',
      location: 'London, UK',
      attendees: 24,
    },
    {
      title: 'Strategic AI Conference 2024',
      date: 'Nov 15-16, 2024',
      location: 'São Paulo, Brazil',
      attendees: 350,
    },
  ];

  const workshops = [
    {
      title: 'AI Strategy Sprint',
      duration: '1 day',
      description: 'Define your AI vision and roadmap with our guided methodology',
    },
    {
      title: 'Data Maturity Assessment',
      duration: '2 days',
      description: 'Comprehensive evaluation of your data infrastructure and capabilities',
    },
    {
      title: 'Governance Framework Design',
      duration: '3 days',
      description: 'Build custom governance policies tailored to your organization',
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
              {t('events.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('events.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-10"
          >
            {t('events.upcoming')}
          </motion.h2>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8 hover-lift"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        event.format === 'In-person' 
                          ? 'bg-exp3-emerald/10 text-exp3-emerald' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {event.format}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.spots} spots
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="default" className="glow-cyan">
                    {t('events.register')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Workshops */}
      <section className="section-padding bg-card/30">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Private Workshop Offerings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Customized training sessions delivered at your location or online, 
              tailored to your team's specific needs and challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{workshop.title}</h3>
                  <span className="text-sm text-primary font-medium">{workshop.duration}</span>
                </div>
                <p className="text-muted-foreground">{workshop.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="glow-cyan">
              <Link to="/contact">
                {t('events.schedulePrivate')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-10"
          >
            {t('events.past')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 opacity-80"
              >
                <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  <span>{event.attendees} attendees</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
