import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Euro, Home, BarChart3, ArrowRight, ChevronDown, Download, Share2, Bot, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AdvancedROICalculatorProps {
  className?: string;
}

type Language = 'en' | 'es' | 'nl';
type Currency = 'EUR' | 'USD' | 'GBP';

interface BasicFormData {
  purchasePrice: string;
  annualRental: string;
  annualCosts: string;
}

interface AdvancedFormData {
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: string;
  maintenanceReserve: number;
  managementFee: number;
  appreciationRate: number;
  occupancyRate: number;
}

interface ROIResults {
  basicROI: number;
  netIncome: number;
  cashOnCashReturn: number;
  capRate: number;
  fiveYearEquity: number;
  totalProfit: number;
  breakEvenYear: number;
  isVisible: boolean;
}

const AdvancedROICalculator = ({ className }: AdvancedROICalculatorProps) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [region, setRegion] = useState<string>('marbella');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  const [basicData, setBasicData] = useState<BasicFormData>({
    purchasePrice: '',
    annualRental: '',
    annualCosts: ''
  });

  const [advancedData, setAdvancedData] = useState<AdvancedFormData>({
    downPayment: 20,
    interestRate: 3.5,
    loanTerm: 25,
    propertyTax: '1.5',
    maintenanceReserve: 1,
    managementFee: 8,
    appreciationRate: 3,
    occupancyRate: 85
  });

  const [results, setResults] = useState<ROIResults>({
    basicROI: 0,
    netIncome: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    fiveYearEquity: 0,
    totalProfit: 0,
    breakEvenYear: 0,
    isVisible: false
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [activeChart, setActiveChart] = useState<'income' | 'costs' | 'growth'>('income');

  const { elementRef: resultRef, isVisible: resultVisible } = useIntersectionObserver({ threshold: 0.3 });

  const animatedROI = useAnimatedCounter({
    target: results.basicROI,
    isVisible: results.isVisible && resultVisible,
    duration: 1500,
    suffix: '%'
  });

  const translations = {
    en: {
      title: 'What Is Your Costa del Sol Property Investment ROI?',
      subtitle: 'Calculate comprehensive returns with advanced analytics',
      purchasePrice: 'Purchase Price',
      annualRental: 'Annual Rental Income',
      annualCosts: 'Annual Costs & Expenses',
      calculate: 'Calculate ROI',
      calculating: 'Calculating...',
      advancedOptions: 'Advanced Options',
      downPayment: 'Down Payment %',
      interestRate: 'Interest Rate %',
      loanTerm: 'Loan Term (Years)',
      propertyTax: 'Property Tax (€)',
      maintenanceReserve: 'Maintenance Reserve %',
      managementFee: 'Property Management Fee %',
      appreciationRate: 'Expected Appreciation Rate %',
      occupancyRate: 'Occupancy Rate %',
      basicROI: 'Basic ROI',
      basicROITooltip: 'Unleveraged return on investment without financing costs',
      netIncome: 'Annual Net Income',
      cashOnCash: 'Cash-on-Cash Return',
      cashOnCashTooltip: 'Return on actual cash invested, accounting for financing',
      capRate: 'Cap Rate',
      fiveYearEquity: '5-Year Equity Growth',
      totalProfit: 'Total Profit (5 Years)',
      breakEvenYear: 'Break-even Year',
      region: 'Region',
      currency: 'Currency',
      downloadReport: 'Download PDF Report',
      shareResults: 'Share Results',
      askAI: 'Ask AI Assistant',
      scheduleViewing: 'Schedule Viewing Trip',
      chartIncome: 'Income vs Expenses',
      chartCosts: 'Cost Breakdown',
      chartGrowth: 'Value Growth Over Time',
      aboveAverage: 'above average',
      belowAverage: 'below average',
      regionalComparison: 'Your ROI is {comparison} for {region}',
      aiPrompt: 'Would you like help finding properties that match your ROI goal?'
    },
    es: {
      title: '¿Cuál Es el ROI de Tu Inversión Inmobiliaria en Costa del Sol?',
      subtitle: 'Calcula rendimientos integrales con análisis avanzados',
      purchasePrice: 'Precio de Compra',
      annualRental: 'Ingresos Anuales de Alquiler',
      annualCosts: 'Costos y Gastos Anuales',
      calculate: 'Calcular ROI',
      calculating: 'Calculando...',
      advancedOptions: 'Opciones Avanzadas',
      downPayment: 'Pago Inicial %',
      interestRate: 'Tasa de Interés %',
      loanTerm: 'Plazo del Préstamo (Años)',
      propertyTax: 'Impuesto sobre Bienes (€)',
      maintenanceReserve: 'Reserva de Mantenimiento %',
      managementFee: 'Tarifa de Administración %',
      appreciationRate: 'Tasa de Apreciación Esperada %',
      occupancyRate: 'Tasa de Ocupación %',
      basicROI: 'ROI Básico',
      basicROITooltip: 'Retorno de inversión sin apalancamiento, sin costos de financiamiento',
      netIncome: 'Ingresos Netos Anuales',
      cashOnCash: 'Retorno Efectivo',
      cashOnCashTooltip: 'Retorno sobre el efectivo invertido, contabilizando el financiamiento',
      capRate: 'Tasa de Capitalización',
      fiveYearEquity: 'Crecimiento del Patrimonio (5 Años)',
      totalProfit: 'Beneficio Total (5 Años)',
      breakEvenYear: 'Año de Equilibrio',
      region: 'Región',
      currency: 'Moneda',
      downloadReport: 'Descargar Informe PDF',
      shareResults: 'Compartir Resultados',
      askAI: 'Consultar IA',
      scheduleViewing: 'Programar Viaje de Visita',
      chartIncome: 'Ingresos vs Gastos',
      chartCosts: 'Desglose de Costos',
      chartGrowth: 'Crecimiento del Valor',
      aboveAverage: 'por encima del promedio',
      belowAverage: 'por debajo del promedio',
      regionalComparison: 'Tu ROI está {comparison} para {region}',
      aiPrompt: '¿Te gustaría ayuda para encontrar propiedades que coincidan con tu objetivo de ROI?'
    },
    nl: {
      title: 'Wat Is Uw Costa del Sol Vastgoedinvestering ROI?',
      subtitle: 'Bereken uitgebreide rendementen met geavanceerde analyses',
      purchasePrice: 'Aankoopprijs',
      annualRental: 'Jaarlijkse Huurinkomsten',
      annualCosts: 'Jaarlijkse Kosten & Uitgaven',
      calculate: 'ROI Berekenen',
      calculating: 'Berekenen...',
      advancedOptions: 'Geavanceerde Opties',
      downPayment: 'Aanbetaling %',
      interestRate: 'Rente %',
      loanTerm: 'Looptijd Lening (Jaren)',
      propertyTax: 'Onroerend Goed Belasting (€)',
      maintenanceReserve: 'Onderhoudsreserve %',
      managementFee: 'Beheerkosten %',
      appreciationRate: 'Verwachte Waardestijging %',
      occupancyRate: 'Bezettingsgraad %',
      basicROI: 'Basis ROI',
      basicROITooltip: 'Ongevinancierd rendement op investering zonder financieringskosten',
      netIncome: 'Jaarlijks Netto Inkomen',
      cashOnCash: 'Cash-on-Cash Rendement',
      cashOnCashTooltip: 'Rendement op werkelijk geïnvesteerde cash, rekening houdend met financiering',
      capRate: 'Kapitalisatievoet',
      fiveYearEquity: 'Eigenkapitalgroei (5 Jaar)',
      totalProfit: 'Totale Winst (5 Jaar)',
      breakEvenYear: 'Break-even Jaar',
      region: 'Regio',
      currency: 'Valuta',
      downloadReport: 'PDF Rapport Downloaden',
      shareResults: 'Resultaten Delen',
      askAI: 'AI Assistent Vragen',
      scheduleViewing: 'Bezichtigingsreis Plannen',
      chartIncome: 'Inkomsten vs Uitgaven',
      chartCosts: 'Kostenverdeling',
      chartGrowth: 'Waardeontwikkeling',
      aboveAverage: 'boven gemiddeld',
      belowAverage: 'onder gemiddeld',
      regionalComparison: 'Uw ROI is {comparison} voor {region}',
      aiPrompt: 'Wilt u hulp bij het vinden van eigendommen die passen bij uw ROI-doel?'
    }
  };

  const t = translations[language];

  const regions = [
    { value: 'marbella', label: 'Marbella', averageROI: 6.5 },
    { value: 'estepona', label: 'Estepona', averageROI: 7.2 },
    { value: 'fuengirola', label: 'Fuengirola', averageROI: 6.8 },
    { value: 'benalmadena', label: 'Benalmadena', averageROI: 6.3 },
    { value: 'mijas', label: 'Mijas', averageROI: 5.9 }
  ];

  const calculateAdvancedROI = () => {
    const purchasePrice = parseFloat(basicData.purchasePrice);
    const annualRental = parseFloat(basicData.annualRental);
    const annualCosts = parseFloat(basicData.annualCosts);

    if (!purchasePrice || !annualRental || purchasePrice <= 0) return;

    setIsCalculating(true);

    setTimeout(() => {
      const downPaymentAmount = (purchasePrice * advancedData.downPayment) / 100;
      const loanAmount = purchasePrice - downPaymentAmount;
      const monthlyInterestRate = advancedData.interestRate / 100 / 12;
      const numberOfPayments = advancedData.loanTerm * 12;
      
      const monthlyPayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      const adjustedRental = (annualRental * advancedData.occupancyRate) / 100;
      const propertyTaxAmount = parseFloat(basicData.annualCosts) || (purchasePrice * 0.015);
      const maintenanceAmount = (purchasePrice * advancedData.maintenanceReserve) / 100;
      const managementAmount = (adjustedRental * advancedData.managementFee) / 100;
      
      // Calculate unleveraged NOI (for Basic ROI and Cap Rate)
      const unleveragedNOI = adjustedRental - annualCosts - propertyTaxAmount - maintenanceAmount - managementAmount;
      
      // Calculate leveraged net income (for Cash-on-Cash Return)
      const leveragedNetIncome = unleveragedNOI - (monthlyPayment * 12);
      
      // Basic ROI: Unleveraged return on total investment
      const basicROI = Math.max(0, (unleveragedNOI / purchasePrice) * 100);
      
      // Cash-on-Cash Return: Leveraged return on actual cash invested
      const cashOnCashReturn = Math.max(0, (leveragedNetIncome / downPaymentAmount) * 100);
      
      // Cap Rate: Unleveraged NOI / Purchase Price
      const capRate = Math.max(0, (unleveragedNOI / purchasePrice) * 100);
      
      const fiveYearValue = purchasePrice * Math.pow(1 + advancedData.appreciationRate / 100, 5);
      const fiveYearEquity = fiveYearValue - purchasePrice;
      const totalProfit = (leveragedNetIncome * 5) + fiveYearEquity;
      
      const breakEvenYear = downPaymentAmount / Math.max(leveragedNetIncome, 1);

      setResults({
        basicROI,
        netIncome: leveragedNetIncome,
        cashOnCashReturn,
        capRate,
        fiveYearEquity,
        totalProfit,
        breakEvenYear: Math.min(breakEvenYear, 50),
        isVisible: true
      });

      setIsCalculating(false);
      
      if (basicROI > 5) {
        setTimeout(() => setShowAIAssistant(true), 2000);
      }
    }, 1000);
  };

  const formatCurrency = (amount: number, currencyType: Currency = currency) => {
    const currencyMap = { EUR: '€', USD: '$', GBP: '£' };
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currencyType,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getChartData = () => {
    const purchasePrice = parseFloat(basicData.purchasePrice) || 0;
    const annualRental = parseFloat(basicData.annualRental) || 0;
    const annualCosts = parseFloat(basicData.annualCosts) || 0;

    const incomeVsExpenses = [
      { name: 'Rental Income', value: annualRental, fill: 'hsl(var(--primary))' },
      { name: 'Annual Costs', value: annualCosts, fill: 'hsl(var(--destructive))' }
    ];

    const costBreakdown = [
      { name: 'Maintenance', value: (purchasePrice * advancedData.maintenanceReserve) / 100, fill: 'hsl(var(--chart-1))' },
      { name: 'Management', value: (annualRental * advancedData.managementFee) / 100, fill: 'hsl(var(--chart-2))' },
      { name: 'Property Tax', value: purchasePrice * 0.015, fill: 'hsl(var(--chart-3))' },
      { name: 'Other Costs', value: annualCosts, fill: 'hsl(var(--chart-4))' }
    ];

    const valueGrowth = Array.from({ length: 6 }, (_, i) => ({
      year: i,
      value: purchasePrice * Math.pow(1 + advancedData.appreciationRate / 100, i)
    }));

    return { incomeVsExpenses, costBreakdown, valueGrowth };
  };

  const chartData = getChartData();
  const currentRegion = regions.find(r => r.value === region);
  const isAboveAverage = results.basicROI > (currentRegion?.averageROI || 0);

  return (
    <TooltipProvider>
      <div className={cn('w-full max-w-7xl mx-auto space-y-8', className)}>
        {/* Header */}
        <AnimatedElement animation="fade-in-up" className="text-center space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Calculator className="w-4 h-4 mr-2" />
            ADVANCED INVESTMENT TOOLS
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold font-display text-foreground">
            {t.title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Language:</span>
              {(['en', 'es', 'nl'] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage(lang)}
                  className="min-w-[50px] text-xs"
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
            
            <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">€ EUR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="GBP">£ GBP</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {r.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </AnimatedElement>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Form */}
          <AnimatedElement animation="fade-in-left" delay={200}>
            <InteractiveCard variant="luxury" hover="lift" className="p-6 space-y-6">
              <CardHeader className="text-center pb-6 px-0">
                <CardTitle className="flex items-center justify-center gap-3 text-xl">
                  <div className="p-3 rounded-full bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  ROI Calculator
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 px-0">
                {/* Basic Inputs */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Home className="w-4 h-4 text-primary" />
                      {t.purchasePrice}
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="500,000"
                        value={basicData.purchasePrice}
                        onChange={(e) => setBasicData(prev => ({ ...prev, purchasePrice: e.target.value.replace(/[^0-9.]/g, '') }))}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-secondary" />
                      {t.annualRental}
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="30,000"
                        value={basicData.annualRental}
                        onChange={(e) => setBasicData(prev => ({ ...prev, annualRental: e.target.value.replace(/[^0-9.]/g, '') }))}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-orange-500" />
                      {t.annualCosts}
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="5,000"
                        value={basicData.annualCosts}
                        onChange={(e) => setBasicData(prev => ({ ...prev, annualCosts: e.target.value.replace(/[^0-9.]/g, '') }))}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {t.advancedOptions}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", showAdvanced && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.downPayment}</label>
                        <Slider
                          value={[advancedData.downPayment]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, downPayment: value }))}
                          max={50}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.downPayment}%</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.interestRate}</label>
                        <Slider
                          value={[advancedData.interestRate]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, interestRate: value }))}
                          max={8}
                          min={1}
                          step={0.1}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.interestRate}%</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.occupancyRate}</label>
                        <Slider
                          value={[advancedData.occupancyRate]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, occupancyRate: value }))}
                          max={100}
                          min={50}
                          step={5}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.occupancyRate}%</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.appreciationRate}</label>
                        <Slider
                          value={[advancedData.appreciationRate]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, appreciationRate: value }))}
                          max={10}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.appreciationRate}%</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button
                  onClick={calculateAdvancedROI}
                  disabled={!basicData.purchasePrice || !basicData.annualRental || isCalculating}
                  className="w-full h-14 text-lg font-semibold"
                  variant="hero"
                >
                  {isCalculating ? (
                    <>
                      <Calculator className="w-5 h-5 mr-2 animate-spin" />
                      {t.calculating}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      {t.calculate}
                    </>
                  )}
                </Button>
              </CardContent>
            </InteractiveCard>
          </AnimatedElement>

          {/* Results */}
          <div className="space-y-6" ref={resultRef}>
            {results.isVisible && (
              <>
                <AnimatedElement animation="fade-in-right" delay={300}>
                  <InteractiveCard variant="luxury" hover="glow" className="p-6 border-primary/20">
                    <CardContent className="space-y-6 px-0">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-4">
                          <TrendingUp className="w-8 h-8 text-primary" />
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">{t.basicROI}</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">{t.basicROITooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="text-6xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                          {animatedROI}
                        </div>

                        {currentRegion && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {t.regionalComparison
                              .replace('{comparison}', isAboveAverage ? t.aboveAverage : t.belowAverage)
                              .replace('{region}', currentRegion.label)}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <div className="text-2xl font-bold text-primary">{results.cashOnCashReturn.toFixed(1)}%</div>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-sm">{t.cashOnCashTooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="text-xs text-muted-foreground">{t.cashOnCash}</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{results.capRate.toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">{t.capRate}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t.netIncome}:</span>
                          <span className="font-semibold">{formatCurrency(results.netIncome)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t.fiveYearEquity}:</span>
                          <span className="font-semibold">{formatCurrency(results.fiveYearEquity)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t.breakEvenYear}:</span>
                          <span className="font-semibold">{results.breakEvenYear.toFixed(1)} years</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          {t.downloadReport}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          {t.shareResults}
                        </Button>
                      </div>
                    </CardContent>
                  </InteractiveCard>
                </AnimatedElement>

                {/* Charts */}
                <AnimatedElement animation="fade-in-up" delay={500}>
                  <InteractiveCard variant="luxury" className="p-6">
                    <Tabs value={activeChart} onValueChange={(value: any) => setActiveChart(value)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="income">{t.chartIncome}</TabsTrigger>
                        <TabsTrigger value="costs">{t.chartCosts}</TabsTrigger>
                        <TabsTrigger value="growth">{t.chartGrowth}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="income" className="mt-6">
                        <ChartContainer config={{ income: { label: "Income", color: "hsl(var(--primary))" } }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData.incomeVsExpenses}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="value" fill="currentColor" />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </TabsContent>

                      <TabsContent value="costs" className="mt-6">
                        <ChartContainer config={{ costs: { label: "Costs", color: "hsl(var(--chart-1))" } }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={chartData.costBreakdown}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                              >
                                {chartData.costBreakdown.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </TabsContent>

                      <TabsContent value="growth" className="mt-6">
                        <ChartContainer config={{ growth: { label: "Growth", color: "hsl(var(--primary))" } }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData.valueGrowth}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </TabsContent>
                    </Tabs>
                  </InteractiveCard>
                </AnimatedElement>

                {/* AI Assistant CTA */}
                {showAIAssistant && (
                  <AnimatedElement animation="scale-in" delay={700}>
                    <InteractiveCard variant="luxury" hover="lift" className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30">
                      <CardContent className="text-center space-y-4 px-0">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10">
                          <Bot className="w-8 h-8 text-primary" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{t.aiPrompt}</h3>
                          <p className="text-sm text-muted-foreground">Get personalized property recommendations and deeper investment analysis</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button size="lg" variant="hero" className="flex-1">
                            <Bot className="w-5 h-5 mr-2" />
                            {t.askAI}
                          </Button>
                          <Button size="lg" variant="outline" className="flex-1">
                            <ArrowRight className="w-5 h-5 mr-2" />
                            {t.scheduleViewing}
                          </Button>
                        </div>
                      </CardContent>
                    </InteractiveCard>
                  </AnimatedElement>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdvancedROICalculator;
