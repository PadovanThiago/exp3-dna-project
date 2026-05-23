import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const switchLanguage = async (lang: 'pt' | 'en') => {
    if (lang === language) return;
    const path = location.pathname;

    // Blog list pages
    if (path === '/blog' || path === '/en/blog') {
      setLanguage(lang);
      navigate(lang === 'en' ? '/en/blog' : '/blog');
      return;
    }

    // Blog post pages
    const match = path.match(/^\/(?:en\/)?blog\/(.+)$/);
    if (match) {
      const currentSlug = match[1];
      // Look up current post, then sibling in target language
      const { data: current } = await supabase
        .from('posts')
        .select('translation_group_id')
        .eq('slug', currentSlug)
        .eq('status', 'published')
        .maybeSingle();

      if (current) {
        const { data: sibling } = await supabase
          .from('posts')
          .select('slug')
          .eq('translation_group_id', current.translation_group_id)
          .eq('language', lang)
          .eq('status', 'published')
          .maybeSingle();

        setLanguage(lang);
        if (sibling) {
          navigate(lang === 'en' ? `/en/blog/${sibling.slug}` : `/blog/${sibling.slug}`);
        } else {
          navigate(lang === 'en' ? '/en/blog' : '/blog');
        }
        return;
      }
    }

    setLanguage(lang);
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-foreground">EXP</span>
              <span className="text-gradient-cyan">³</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-center min-w-[90px] ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {t(`nav.${item.key}` as any)}
              </Link>
            ))}
          </nav>

          {/* Right side - Language toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-secondary/50 rounded-full p-1">
              <button
                onClick={() => switchLanguage('pt')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  language === 'pt'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button asChild variant="default" className="glow-cyan">
              <Link to="/contact">{t('hero.cta')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-accent/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="container-wide mx-auto px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {t(`nav.${item.key}` as any)}
                </Link>
              ))}
              
              {/* Language Toggle Mobile */}
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="text-sm text-muted-foreground mr-2">Language:</span>
                <button
                  onClick={() => switchLanguage('pt')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    language === 'pt'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* CTA Mobile */}
              <div className="px-4 pt-4">
                <Button asChild variant="default" className="w-full glow-cyan">
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('hero.cta')}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
