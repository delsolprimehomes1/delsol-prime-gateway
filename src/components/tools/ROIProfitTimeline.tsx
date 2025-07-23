
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ROIProfitTimelineProps {
  results: {
    netIncome: number;
    fiveYearEquity: number;
    totalProfit: number;
    breakEvenYear: number;
  };
  advancedData: {
    appreciationRate: number;
  };
  basicData: {
    purchasePrice: string;
  };
  formatCurrency: (amount: number) => string;
}

export const ROIProfitTimeline = ({ results, advancedData, basicData, formatCurrency }: ROIProfitTimelineProps) => {
  const purchasePrice = parseFloat(basicData.purchasePrice) || 0;
  
  // Generate year-by-year data
  const timelineData = Array.from({ length: 6 }, (_, i) => {
    const year = i;
    const cumulativeCashFlow = results.netIncome * year;
    const propertyValue = purchasePrice * Math.pow(1 + advancedData.appreciationRate / 100, year);
    const equityGrowth = propertyValue - purchasePrice;
    const totalReturn = cumulativeCashFlow + equityGrowth;
    
    return {
      year,
      cumulativeCashFlow,
      equityGrowth,
      totalReturn,
      propertyValue
    };
  });

  // Break-even analysis data
  const breakEvenData = timelineData.map(item => ({
    year: item.year,
    value: item.totalReturn,
    isPositive: item.totalReturn > 0
  }));

  return (
    <div className="space-y-6">
      {/* Profit Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Profit Timeline (5 Years)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ profit: { label: "Total Return", color: "hsl(var(--primary))" } }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  tickFormatter={(value) => `Year ${value}`}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [formatCurrency(value), "Total Return"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalReturn" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="equityGrowth" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-primary"></div>
              <span>Total Return</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-secondary border-dashed"></div>
              <span>Equity Growth</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Break-even Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Break-even Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ breakeven: { label: "Return", color: "hsl(var(--chart-1))" } }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={breakEvenData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  tickFormatter={(value) => `Year ${value}`}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [formatCurrency(value), "Net Position"]}
                />
                <Bar 
                  dataKey="value" 
                  fill={(entry: any) => entry.isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))"}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <div className="text-sm text-center">
              <span className="font-medium">Break-even Point: </span>
              <span className="text-primary font-semibold">
                Year {results.breakEvenYear.toFixed(1)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
