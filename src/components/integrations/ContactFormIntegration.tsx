
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { analytics } from './AnalyticsProvider';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType: string;
  budget: string;
}

export function ContactFormIntegration() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission attempt
      analytics.trackEvent('form_submit_start', {
        form_type: 'contact',
        property_type: formData.propertyType,
        budget_range: formData.budget,
      });

      // Here you would integrate with your backend (Supabase, etc.)
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Track successful submission
      analytics.trackEvent('form_submit_success', {
        form_type: 'contact',
        property_type: formData.propertyType,
      });

      // Track conversion
      analytics.trackConversion('contact_form_submission');

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyType: '',
        budget: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track error
      analytics.trackEvent('form_submit_error', {
        form_type: 'contact',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });

      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Contact Our Property Experts</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="penthouse">Penthouse</option>
            <option value="townhouse">Townhouse</option>
            <option value="plot">Plot/Land</option>
          </select>
        </div>

        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={formData.budget}
          onChange={(e) => handleInputChange('budget', e.target.value)}
        >
          <option value="">Budget Range</option>
          <option value="200k-500k">€200,000 - €500,000</option>
          <option value="500k-1m">€500,000 - €1,000,000</option>
          <option value="1m-2m">€1,000,000 - €2,000,000</option>
          <option value="2m-5m">€2,000,000 - €5,000,000</option>
          <option value="5m+">€5,000,000+</option>
        </select>

        <Textarea
          placeholder="Tell us about your property requirements..."
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={4}
          required
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
