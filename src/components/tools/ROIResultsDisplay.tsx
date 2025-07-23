
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Info, Target, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ROIResultsDisplayProps {
  results: {
    netIncome: number;
    fiveYearEquity: number;
    totalProfit: number;
    breakEvenYear: number;
    isVisible: boolean;
  };
  formatCurrency: (amount: number) => string;
  translations: any;
}

export const ROIResultsDisplay = ({ results, formatCurrency, translations: t }: ROIResultsDisplayProps) => {
  const monthlyContribution = Math.abs(results.netIncome / 12);
  const totalReturn = (results.totalProfit / Math.abs(results.netIncome * 5)) * 100;
  const annualReturn = Math.pow(1 + totalReturn / 100, 1/5) - 1;
  const isPositiveCashFlow = results.netIncome > 0;

  return (
    <div className="space-y-6">
      {/* Primary Profit Metric */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Investment Return (5 Years)</div>
              <div className="text-5xl font-bold text-primary mb-2">
                {formatCurrency(results.totalProfit)}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <Badge variant={results.totalProfit > 0 ? "default" : "destructive"}>
                  {results.totalProfit > 0 ? "Profitable" : "Loss"}
                </Badge>
                <span className="text-muted-foreground">
                  {(totalReturn).toFixed(1)}% total return
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Analysis */}
      <Card className={cn(
        "border-2",
        isPositiveCashFlow 
          ? "border-green-500/20 bg-green-50/50" 
          : "border-orange-500/20 bg-orange-50/50"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Cash Flow Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold mb-1">
                {formatCurrency(results.netIncome)}
              </div>
              <div className="text-sm text-muted-foreground">Annual Net Income</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold mb-1">
                {isPositiveCashFlow ? "+" : "-"}{formatCurrency(monthlyContribution)}
              </div>
              <div className="text-sm text-muted-foreground">
                Monthly {isPositiveCashFlow ? "Income" : "Contribution"}
              </div>
            </div>
          </div>

          {!isPositiveCashFlow && (
            <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Investment Strategy: Appreciation Focus</p>
                  <p className="text-blue-700">
                    This property requires monthly contributions but builds equity through appreciation. 
                    Common in premium markets like Costa del Sol.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Equity Growth</div>
                <div className="text-xl font-bold">{formatCurrency(results.fiveYearEquity)}</div>
              </div>
              <PiggyBank className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Annual Return</div>
                <div className="text-xl font-bold">{(annualReturn * 100).toFixed(1)}%</div>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Break-even</div>
                <div className="text-xl font-bold">{results.breakEvenYear.toFixed(1)}y</div>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Profit Optimization Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Current scenario</span>
              <span className="font-medium">{formatCurrency(results.totalProfit)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-green-50/50 border border-green-200">
              <span className="text-sm">With 95% occupancy (+10%)</span>
              <span className="font-medium text-green-700">
                {formatCurrency(results.totalProfit + (results.netIncome * 0.1 * 5))}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-green-50/50 border border-green-200">
              <span className="text-sm">With €200/month higher rent</span>
              <span className="font-medium text-green-700">
                {formatCurrency(results.totalProfit + (200 * 12 * 5))}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/50 border border-blue-200">
              <span className="text-sm">Cash purchase (no financing)</span>
              <span className="font-medium text-blue-700">
                {formatCurrency(results.totalProfit + Math.abs(results.netIncome * 5))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Summary */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Investment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-white/50">
                <div className="font-medium">Total Investment Approach</div>
                <div className="text-muted-foreground">
                  {isPositiveCashFlow ? "Cash Flow + Appreciation" : "Appreciation Focused"}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/50">
                <div className="font-medium">Market Context</div>
                <div className="text-muted-foreground">
                  Typical for Costa del Sol premium properties
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
