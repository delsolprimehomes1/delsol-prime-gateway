import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Euro, Home, BarChart3, ArrowRight, ChevronDown, Download, Share2, Bot, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ROIResultsDisplay } from './ROIResultsDisplay';
import { ROIProfitTimeline } from './ROIProfitTimeline';
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

interface InvestmentResults {
  netIncome: number;
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

  const [results, setResults] = useState<InvestmentResults>({
    netIncome: 0,
    fiveYearEquity: 0,
    totalProfit: 0,
    breakEvenYear: 0,
    isVisible: false
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [activeChart, setActiveChart] = useState<'timeline' | 'costs' | 'scenarios'>('timeline');

  const { elementRef: resultRef, isVisible: resultVisible } = useIntersectionObserver({ threshold: 0.3 });

  const translations = {
    en: {
      title: 'Calculate Your Costa del Sol Investment Returns',
      subtitle: 'Analyze property investment potential with detailed financial projections',
      purchasePrice: 'Purchase Price',
      annualRental: 'Annual Rental Income',
      annualCosts: 'Annual Costs & Expenses',
      calculate: 'Calculate Returns',
      calculating: 'Calculating...',
      advancedOptions: 'Advanced Options',
      downPayment: 'Down Payment %',
      interestRate: 'Interest Rate %',
      loanTerm: 'Loan Term (Years)',
      propertyTax: 'Property Tax Rate %',
      maintenanceReserve: 'Maintenance Reserve %',
      managementFee: 'Property Management Fee %',
      appreciationRate: 'Expected Appreciation Rate %',
      occupancyRate: 'Occupancy Rate %',
      region: 'Region',
      currency: 'Currency',
      downloadReport: 'Download PDF Report',
      shareResults: 'Share Results',
      askAI: 'Ask AI Assistant',
      scheduleViewing: 'Schedule Viewing Trip',
      aiPrompt: 'Need help optimizing your investment strategy?',
      investmentReturns: 'Investment Analysis'
    },
    es: {
      title: 'Calcula los Rendimientos de Tu Inversión en Costa del Sol',
      subtitle: 'Analiza el potencial de inversión inmobiliaria con proyecciones financieras detalladas',
      purchasePrice: 'Precio de Compra',
      annualRental: 'Ingresos Anuales de Alquiler',
      annualCosts: 'Costos y Gastos Anuales',
      calculate: 'Calcular Rendimientos',
      calculating: 'Calculando...',
      advancedOptions: 'Opciones Avanzadas',
      downPayment: 'Pago Inicial %',
      interestRate: 'Tasa de Interés %',
      loanTerm: 'Plazo del Préstamo (Años)',
      propertyTax: 'Tasa de Impuesto sobre Bienes %',
      maintenanceReserve: 'Reserva de Mantenimiento %',
      managementFee: 'Tarifa de Administración %',
      appreciationRate: 'Tasa de Apreciación Esperada %',
      occupancyRate: 'Tasa de Ocupación %',
      region: 'Región',
      currency: 'Moneda',
      downloadReport: 'Descargar Informe PDF',
      shareResults: 'Compartir Resultados',
      askAI: 'Consultar IA',
      scheduleViewing: 'Programar Viaje de Visita',
      aiPrompt: '¿Necesitas ayuda para optimizar tu estrategia de inversión?',
      investmentReturns: 'Análisis de Inversión'
    },
    nl: {
      title: 'Bereken Uw Costa del Sol Investeringsrendementen',
      subtitle: 'Analyseer vastgoedinvestering potentieel met gedetailleerde financiële projecties',
      purchasePrice: 'Aankoopprijs',
      annualRental: 'Jaarlijkse Huurinkomsten',
      annualCosts: 'Jaarlijkse Kosten & Uitgaven',
      calculate: 'Rendement Berekenen',
      calculating: 'Berekenen...',
      advancedOptions: 'Geavanceerde Opties',
      downPayment: 'Aanbetaling %',
      interestRate: 'Rente %',
      loanTerm: 'Looptijd Lening (Jaren)',
      propertyTax: 'Onroerend Goed Belasting %',
      maintenanceReserve: 'Onderhoudsreserve %',
      managementFee: 'Beheerkosten %',
      appreciationRate: 'Verwachte Waardestijging %',
      occupancyRate: 'Bezettingsgraad %',
      region: 'Regio',
      currency: 'Valuta',
      downloadReport: 'PDF Rapport Downloaden',
      shareResults: 'Resultaten Delen',
      askAI: 'AI Assistent Vragen',
      scheduleViewing: 'Bezichtigingsreis Plannen',
      aiPrompt: 'Wilt u hulp bij het optimaliseren van uw investeringsstrategie?',
      investmentReturns: 'Investeringsanalyse'
    }
  };

  const t = translations[language];

  const regions = [
    { value: 'marbella', label: 'Marbella' },
    { value: 'estepona', label: 'Estepona' },
    { value: 'fuengirola', label: 'Fuengirola' },
    { value: 'benalmadena', label: 'Benalmadena' },
    { value: 'mijas', label: 'Mijas' }
  ];

  const calculateInvestmentReturns = () => {
    const purchasePrice = parseFloat(basicData.purchasePrice);
    const annualRental = parseFloat(basicData.annualRental);
    const annualCosts = parseFloat(basicData.annualCosts) || 0;

    console.log('Input values:', { purchasePrice, annualRental, annualCosts });

    if (!purchasePrice || !annualRental || purchasePrice <= 0 || annualRental <= 0) return;

    setIsCalculating(true);

    setTimeout(() => {
      // Calculate financing details
      const downPaymentAmount = (purchasePrice * advancedData.downPayment) / 100;
      const loanAmount = purchasePrice - downPaymentAmount;
      const monthlyInterestRate = advancedData.interestRate / 100 / 12;
      const numberOfPayments = advancedData.loanTerm * 12;
      
      // Calculate monthly mortgage payment using amortization formula
      const monthlyPayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      const annualDebtService = monthlyPayment * 12;

      // Calculate adjusted rental income based on occupancy
      const adjustedRental = (annualRental * advancedData.occupancyRate) / 100;
      
      // Calculate individual cost components
      const propertyTaxRate = parseFloat(advancedData.propertyTax) / 100;
      const propertyTaxAmount = purchasePrice * propertyTaxRate;
      const maintenanceAmount = (purchasePrice * advancedData.maintenanceReserve) / 100;
      const managementAmount = (adjustedRental * advancedData.managementFee) / 100;
      
      console.log('Cost breakdown:', {
        propertyTaxAmount,
        maintenanceAmount,
        managementAmount,
        annualCosts,
        annualDebtService
      });

      // Calculate Net Operating Income (NOI) - before debt service
      const unleveragedNOI = adjustedRental - annualCosts - propertyTaxAmount - maintenanceAmount - managementAmount;
      
      // Calculate leveraged net income (after debt service)
      const leveragedNetIncome = unleveragedNOI - annualDebtService;
      
      console.log('NOI calculations:', {
        adjustedRental,
        unleveragedNOI,
        leveragedNetIncome
      });

      // Calculate 5-year projections
      const fiveYearValue = purchasePrice * Math.pow(1 + advancedData.appreciationRate / 100, 5);
      const fiveYearEquity = fiveYearValue - purchasePrice;
      const totalProfit = (leveragedNetIncome * 5) + fiveYearEquity;
      
      // Break-even calculation
      const breakEvenYear = leveragedNetIncome > 0 ? downPaymentAmount / leveragedNetIncome : 50;

      console.log('Final results:', {
        leveragedNetIncome,
        fiveYearEquity,
        totalProfit,
        breakEvenYear
      });

      setResults({
        netIncome: leveragedNetIncome,
        fiveYearEquity,
        totalProfit,
        breakEvenYear: Math.min(breakEvenYear, 50),
        isVisible: true
      });

      setIsCalculating(false);
      
      if (totalProfit > 0) {
        setTimeout(() => setShowAIAssistant(true), 2000);
      }
    }, 1000);
  };

  const formatCurrency = (amount: number, currencyType: Currency = currency) => {
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

    const propertyTaxRate = parseFloat(advancedData.propertyTax) / 100;
    const propertyTaxAmount = purchasePrice * propertyTaxRate;
    const maintenanceAmount = (purchasePrice * advancedData.maintenanceReserve) / 100;
    const managementAmount = (annualRental * advancedData.managementFee) / 100;

    const costBreakdown = [
      { name: 'Maintenance', value: maintenanceAmount, fill: 'hsl(var(--chart-1))' },
      { name: 'Management', value: managementAmount, fill: 'hsl(var(--chart-2))' },
      { name: 'Property Tax', value: propertyTaxAmount, fill: 'hsl(var(--chart-3))' },
      { name: 'Other Costs', value: annualCosts, fill: 'hsl(var(--chart-4))' }
    ];

    return { costBreakdown };
  };

  const chartData = getChartData();

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
                  Investment Calculator
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
                        <label className="text-sm font-medium">{t.propertyTax}</label>
                        <Slider
                          value={[parseFloat(advancedData.propertyTax)]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, propertyTax: value.toString() }))}
                          max={3}
                          min={0.5}
                          step={0.1}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.propertyTax}%</span>
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

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.managementFee}</label>
                        <Slider
                          value={[advancedData.managementFee]}
                          onValueChange={([value]) => setAdvancedData(prev => ({ ...prev, managementFee: value }))}
                          max={15}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground">{advancedData.managementFee}%</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button
                  onClick={calculateInvestmentReturns}
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
                  <ROIResultsDisplay 
                    results={results}
                    formatCurrency={formatCurrency}
                    translations={t}
                  />
                </AnimatedElement>

                {/* Enhanced Charts */}
                <AnimatedElement animation="fade-in-up" delay={500}>
                  <InteractiveCard variant="luxury" className="p-6">
                    <Tabs value={activeChart} onValueChange={(value: any) => setActiveChart(value)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="timeline">Profit Timeline</TabsTrigger>
                        <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
                        <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                      </TabsList>

                      <TabsContent value="timeline" className="mt-6">
                        <ROIProfitTimeline 
                          results={results}
                          advancedData={advancedData}
                          basicData={basicData}
                          formatCurrency={formatCurrency}
                        />
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

                      <TabsContent value="scenarios" className="mt-6">
                        <div className="text-center text-muted-foreground">
                          Advanced scenario analysis coming soon
                        </div>
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
                          <p className="text-sm text-muted-foreground">Get personalized recommendations to maximize your investment returns</p>
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
