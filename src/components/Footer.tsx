import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const navigationLinks = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'cases', path: '/cases' },
    { key: 'contact', path: '/contact' },
  ];

  const resourceLinks = [
    { key: 'content', path: '/content' },
    { key: 'events', path: '/events' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-foreground">EXP</span>
                <span className="text-gradient-cyan">³</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@exp3.ai"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {t(`nav.${link.key}` as any)}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {t(`nav.${link.key}` as any)}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                >
                  Newsletter
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t('footer.cookies')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EXP³. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-exp3-emerald animate-pulse" />
            <span>Cognitive Symbiosis Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
