import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim(), name: name.trim(), language });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: t('newsletter.errorDuplicate'),
            variant: 'destructive',
          });
        } else {
          toast({
            title: t('newsletter.errorGeneric'),
            variant: 'destructive',
          });
        }
      } else {
        toast({ title: t('newsletter.success') });
        setName('');
        setEmail('');
      }
    } catch {
      toast({ title: t('newsletter.errorGeneric'), variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
        {t('newsletter.title')}
      </h4>
      <p className="text-muted-foreground text-sm mb-4">
        {t('newsletter.description')}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder={t('newsletter.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-secondary/50 border-border text-sm"
        />
        <Input
          type="email"
          required
          placeholder={t('newsletter.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary/50 border-border text-sm"
        />
        <Button type="submit" size="sm" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {t('newsletter.subscribe')}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
