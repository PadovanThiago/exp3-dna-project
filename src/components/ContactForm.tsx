import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

// TODO: Replace with your Formspree Form ID
const FORMSPREE_FORM_ID = 'YOUR_FORM_ID';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error(t('contact.form.consentError'));
      return;
    }

    if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
      toast.error('Formspree não configurado. Entre em contato por email.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success(t('contact.success'));
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          consent: false,
        });
      } else {
        toast.error(t('contact.error'));
      }
    } catch (error) {
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card p-8 md:p-10 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {t('contact.form.name')} *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-secondary/50 border-border/50 focus:border-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {t('contact.form.email')} *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-secondary/50 border-border/50 focus:border-primary"
            placeholder="john@company.com"
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-foreground">
            {t('contact.form.company')}
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="bg-secondary/50 border-border/50 focus:border-primary"
            placeholder="Company Inc."
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            {t('contact.form.phone')}
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="bg-secondary/50 border-border/50 focus:border-primary"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          {t('contact.form.subject')}
        </label>
        <Select
          value={formData.subject}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, subject: value }))
          }
        >
          <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-primary">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consulting">
              {t('contact.form.subjects.consulting')}
            </SelectItem>
            <SelectItem value="training">
              {t('contact.form.subjects.training')}
            </SelectItem>
            <SelectItem value="partnership">
              {t('contact.form.subjects.partnership')}
            </SelectItem>
            <SelectItem value="other">
              {t('contact.form.subjects.other')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t('contact.form.message')} *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, consent: checked as boolean }))
          }
          className="mt-0.5"
        />
        <label
          htmlFor="consent"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
        >
          {t('contact.form.consent')}
        </label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto glow-cyan"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            {t('contact.form.submit')}
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
