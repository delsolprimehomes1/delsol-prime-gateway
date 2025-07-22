
import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Euro, Home, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface ROICalculatorProps {
  className?: string;
}

interface FormData {
  purchasePrice: string;
  annualRental: string;
  annualCosts: string;
}

interface ROIResult {
  roi: number;
  netIncome: number;
  isVisible: boolean;
}

const InvestmentROICalculator = ({ className }: ROICalculatorProps) => {
  const [language, setLanguage] = useState<'en' | 'es' | 'nl'>('en');
  const [formData, setFormData] = useState<FormData>({
    purchasePrice: '',
    annualRental: '',
    annualCosts: ''
  });
  const [result, setResult] = useState<ROIResult>({
    roi: 0,
    netIncome: 0,
    isVisible: false
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const { elementRef: resultRef, isVisible: resultVisible } = useIntersectionObserver({ threshold: 0.3 });

  // Animated ROI counter
  const animatedROI = useAnimatedCounter({
    target: result.roi,
    isVisible: result.isVisible && resultVisible,
    duration: 1500,
    suffix: '%'
  });

  const translations = {
    en: {
      title: 'What Is Your Costa del Sol Property Investment ROI?',
      subtitle: 'Calculate your Costa del Sol property investment returns',
      purchasePrice: 'Purchase Price',
      annualRental: 'Annual Rental Income',
      annualCosts: 'Annual Costs & Expenses',
      calculate: 'Calculate ROI',
      calculating: 'Calculating...',
      result: 'Your Investment ROI',
      netIncome: 'Annual Net Income',
      explanation: 'This ROI calculation shows your annual return on investment based on rental income minus expenses.',
      cta: 'Request Our Top ROI Listings',
      ctaSubtext: 'Get exclusive access to our highest-yielding properties',
      language: 'Language'
    },
    es: {
      title: '¿Cuál Es el ROI de Tu Inversión Inmobiliaria en Costa del Sol?',
      subtitle: 'Calcula los rendimientos de tu inversión inmobiliaria en Costa del Sol',
      purchasePrice: 'Precio de Compra',
      annualRental: 'Ingresos Anuales de Alquiler',
      annualCosts: 'Costos y Gastos Anuales',
      calculate: 'Calcular ROI',
      calculating: 'Calculando...',
      result: 'Tu ROI de Inversión',
      netIncome: 'Ingresos Netos Anuales',
      explanation: 'Este cálculo de ROI muestra tu retorno anual de inversión basado en ingresos de alquiler menos gastos.',
      cta: 'Solicitar Nuestras Mejores Propiedades ROI',
      ctaSubtext: 'Obtén acceso exclusivo a nuestras propiedades de mayor rendimiento',
      language: 'Idioma'
    },
    nl: {
      title: 'Wat Is Uw Costa del Sol Vastgoedinvestering ROI?',
      subtitle: 'Bereken uw Costa del Sol vastgoedinvestering rendementen',
      purchasePrice: 'Aankoopprijs',
      annualRental: 'Jaarlijkse Huurinkomsten',
      annualCosts: 'Jaarlijkse Kosten & Uitgaven',
      calculate: 'ROI Berekenen',
      calculating: 'Berekenen...',
      result: 'Uw Investering ROI',
      netIncome: 'Jaarlijks Netto Inkomen',
      explanation: 'Deze ROI-berekening toont uw jaarlijks rendement op investering gebaseerd op huurinkomsten minus uitgaven.',
      cta: 'Vraag Onze Top ROI Aanbiedingen',
      ctaSubtext: 'Krijg exclusieve toegang tot onze hoogst renderende eigendommen',
      language: 'Taal'
    }
  };

  const t = translations[language];

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Only allow numbers and decimal points
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const calculateROI = () => {
    const purchasePrice = parseFloat(formData.purchasePrice);
    const annualRental = parseFloat(formData.annualRental);
    const annualCosts = parseFloat(formData.annualCosts);

    if (!purchasePrice || !annualRental || purchasePrice <= 0) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const netIncome = annualRental - (annualCosts || 0);
      const roi = (netIncome / purchasePrice) * 100;

      setResult({
        roi: Math.max(0, roi),
        netIncome,
        isVisible: true
      });
      setIsCalculating(false);

      // Show CTA if ROI is good
      if (roi > 3) {
        setTimeout(() => setShowLeadForm(true), 2000);
      }
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn('w-full max-w-7xl mx-auto', className)}>
      {/* Header */}
      <AnimatedElement animation="fade-in-up" className="text-center space-y-4 mb-8 lg:mb-12">
        <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Calculator className="w-4 h-4 mr-2" />
          INVESTMENT TOOLS
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-display text-foreground mb-4">
          {t.title}
        </h2>
        
        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          {t.subtitle}
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="text-sm text-muted-foreground">{t.language}:</span>
          {(['en', 'es', 'nl'] as const).map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage(lang)}
              className="min-w-[50px] text-xs sm:text-sm"
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
      </AnimatedElement>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start">
        {/* Calculator Form */}
        <AnimatedElement animation="fade-in-left" delay={200}>
          <InteractiveCard variant="luxury" hover="lift" className="p-4 sm:p-6 lg:p-8">
            <CardHeader className="text-center pb-4 lg:pb-6 px-0">
              <CardTitle className="flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl">
                <div className="p-2 lg:p-3 rounded-full bg-primary/10">
                  <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                </div>
                <span className="hidden sm:inline">{t.title}</span>
                <span className="sm:hidden">ROI Calculator</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 lg:space-y-6 px-0">
              {/* Purchase Price Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  {t.purchasePrice}
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder="500,000"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    onFocus={() => setFocusedField('purchasePrice')}
                    onBlur={() => setFocusedField('')}
                    className={cn(
                      'pl-10 text-base lg:text-lg h-12 lg:h-14 transition-all duration-300',
                      focusedField === 'purchasePrice' && 'ring-2 ring-primary/20 scale-[1.02]'
                    )}
                  />
                </div>
              </div>

              {/* Annual Rental Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-secondary" />
                  {t.annualRental}
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder="30,000"
                    value={formData.annualRental}
                    onChange={(e) => handleInputChange('annualRental', e.target.value)}
                    onFocus={() => setFocusedField('annualRental')}
                    onBlur={() => setFocusedField('')}
                    className={cn(
                      'pl-10 text-base lg:text-lg h-12 lg:h-14 transition-all duration-300',
                      focusedField === 'annualRental' && 'ring-2 ring-secondary/20 scale-[1.02]'
                    )}
                  />
                </div>
              </div>

              {/* Annual Costs Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-orange-500" />
                  {t.annualCosts}
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder="5,000"
                    value={formData.annualCosts}
                    onChange={(e) => handleInputChange('annualCosts', e.target.value)}
                    onFocus={() => setFocusedField('annualCosts')}
                    onBlur={() => setFocusedField('')}
                    className={cn(
                      'pl-10 text-base lg:text-lg h-12 lg:h-14 transition-all duration-300',
                      focusedField === 'annualCosts' && 'ring-2 ring-orange-500/20 scale-[1.02]'
                    )}
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateROI}
                disabled={!formData.purchasePrice || !formData.annualRental || isCalculating}
                className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold mt-6 lg:mt-8"
                variant="hero"
              >
                {isCalculating ? (
                  <>
                    <Calculator className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-spin" />
                    {t.calculating}
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    {t.calculate}
                  </>
                )}
              </Button>
            </CardContent>
          </InteractiveCard>
        </AnimatedElement>

        {/* Results Display */}
        <div className="space-y-4 lg:space-y-6" ref={resultRef}>
          {result.isVisible && (
            <AnimatedElement animation="fade-in-right" delay={300}>
              <InteractiveCard variant="luxury" hover="glow" className="p-4 sm:p-6 lg:p-8 border-primary/20">
                <CardContent className="text-center space-y-4 lg:space-y-6 px-0">
                  <div className="inline-flex items-center justify-center p-3 lg:p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                    <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2">{t.result}</h3>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                      {animatedROI}
                    </div>
                  </div>

                  <div className="space-y-3 p-4 lg:p-6 bg-muted/30 rounded-xl">
                    <div className="flex justify-between items-center text-sm lg:text-base">
                      <span className="text-muted-foreground">{t.netIncome}:</span>
                      <span className="font-semibold">{formatCurrency(result.netIncome)}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-2">
                    {t.explanation}
                  </p>
                </CardContent>
              </InteractiveCard>
            </AnimatedElement>
          )}

          {/* CTA Section */}
          {showLeadForm && (
            <AnimatedElement animation="scale-in" delay={500}>
              <InteractiveCard variant="luxury" hover="lift" className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30">
                <CardContent className="text-center space-y-4 lg:space-y-6 px-0">
                  <div className="inline-flex items-center justify-center p-3 lg:p-4 rounded-full bg-primary/10">
                    <Home className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2">{t.cta}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground">{t.ctaSubtext}</p>
                  </div>

                  <Button size="lg" variant="hero" className="px-6 lg:px-8 text-sm lg:text-base">
                    {t.cta}
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                  </Button>
                </CardContent>
              </InteractiveCard>
            </AnimatedElement>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentROICalculator;
