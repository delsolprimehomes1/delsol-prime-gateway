import { useState } from 'react';
import { TrendingUp, Building, Home, CheckCircle, XCircle } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ComparisonFeature {
  feature: string;
  fixFlip: string;
  buyHold: string;
  fixFlipScore: number;
  buyHoldScore: number;
  description: string;
}

interface StrategyComparisonProps {
  className?: string;
}

const StrategyComparison = ({ className }: StrategyComparisonProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<'fix-flip' | 'buy-hold' | null>(null);

  const features: ComparisonFeature[] = [
    {
      feature: "Investment Timeline",
      fixFlip: "6-18 months",
      buyHold: "5-20+ years",
      fixFlipScore: 8,
      buyHoldScore: 6,
      description: "Time from initial investment to profit realization"
    },
    {
      feature: "Initial Capital",
      fixFlip: "€100k - €500k+",
      buyHold: "€50k - €200k",
      fixFlipScore: 4,
      buyHoldScore: 8,
      description: "Typical capital required to start investing"
    },
    {
      feature: "Active Management",
      fixFlip: "High involvement",
      buyHold: "Low to moderate",
      fixFlipScore: 3,
      buyHoldScore: 9,
      description: "Level of ongoing involvement required"
    },
    {
      feature: "Profit Potential",
      fixFlip: "€50k - €200k per project",
      buyHold: "€5k - €15k annually",
      fixFlipScore: 9,
      buyHoldScore: 6,
      description: "Typical profit amounts and frequency"
    },
    {
      feature: "Risk Level",
      fixFlip: "High",
      buyHold: "Moderate",
      fixFlipScore: 4,
      buyHoldScore: 7,
      description: "Overall investment risk assessment"
    },
    {
      feature: "Market Sensitivity",
      fixFlip: "Very high",
      buyHold: "Moderate",
      fixFlipScore: 3,
      buyHoldScore: 7,
      description: "Dependence on market timing and conditions"
    },
    {
      feature: "Tax Efficiency",
      fixFlip: "Business expenses",
      buyHold: "Depreciation + deductions",
      fixFlipScore: 6,
      buyHoldScore: 8,
      description: "Available tax benefits and optimization"
    },
    {
      feature: "Cash Flow",
      fixFlip: "None during project",
      buyHold: "Monthly income",
      fixFlipScore: 1,
      buyHoldScore: 10,
      description: "Ongoing income generation potential"
    }
  ];

  const getWinner = (feature: ComparisonFeature) => {
    if (feature.fixFlipScore > feature.buyHoldScore) return 'fix-flip';
    if (feature.buyHoldScore > feature.fixFlipScore) return 'buy-hold';
    return 'tie';
  };

  const getWinnerBadge = (winner: string) => {
    switch (winner) {
      case 'fix-flip':
        return <Badge variant="outline" className="border-primary text-primary bg-primary/10">Fix & Flip</Badge>;
      case 'buy-hold':
        return <Badge variant="outline" className="border-secondary text-secondary bg-secondary/10">Buy & Hold</Badge>;
      default:
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Tie</Badge>;
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Strategy Selector */}
      <AnimatedElement animation="fade-in-up" className="text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={selectedStrategy === 'fix-flip' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setSelectedStrategy(selectedStrategy === 'fix-flip' ? null : 'fix-flip')}
            className="flex items-center gap-2"
          >
            <Building className="w-5 h-5" />
            Focus on Fix & Flip
          </Button>
          <Button
            variant={selectedStrategy === 'buy-hold' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setSelectedStrategy(selectedStrategy === 'buy-hold' ? null : 'buy-hold')}
            className="flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Focus on Buy & Hold
          </Button>
        </div>
      </AnimatedElement>

      {/* Comparison Table */}
      <AnimatedElement animation="fade-in-up" delay={200}>
        <InteractiveCard variant="luxury" hover="lift" className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <TrendingUp className="w-6 h-6 text-primary" />
              Strategy Comparison Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Feature</th>
                    <th className={cn(
                      "text-center py-4 px-6 font-semibold transition-all duration-300",
                      selectedStrategy === 'fix-flip' ? 'bg-primary/20 text-primary' : 'text-primary'
                    )}>
                      Fix & Flip
                    </th>
                    <th className={cn(
                      "text-center py-4 px-6 font-semibold transition-all duration-300",
                      selectedStrategy === 'buy-hold' ? 'bg-secondary/20 text-secondary' : 'text-secondary'
                    )}>
                      Buy & Hold
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => {
                    const winner = getWinner(feature);
                    const isHighlighted = selectedStrategy && 
                      ((selectedStrategy === 'fix-flip' && winner === 'fix-flip') ||
                       (selectedStrategy === 'buy-hold' && winner === 'buy-hold'));
                    
                    return (
                      <tr 
                        key={index} 
                        className={cn(
                          "border-b border-border transition-all duration-300",
                          "hover:bg-muted/30",
                          isHighlighted && "bg-gradient-to-r from-primary/10 to-secondary/10"
                        )}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium">{feature.feature}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {feature.description}
                            </div>
                          </div>
                        </td>
                        <td className={cn(
                          "py-4 px-6 text-center text-sm transition-all duration-300",
                          selectedStrategy === 'fix-flip' && "font-semibold"
                        )}>
                          <div className="flex items-center justify-center gap-2">
                            {winner === 'fix-flip' && <CheckCircle className="w-4 h-4 text-green-600" />}
                            <span>{feature.fixFlip}</span>
                          </div>
                        </td>
                        <td className={cn(
                          "py-4 px-6 text-center text-sm transition-all duration-300",
                          selectedStrategy === 'buy-hold' && "font-semibold"
                        )}>
                          <div className="flex items-center justify-center gap-2">
                            {winner === 'buy-hold' && <CheckCircle className="w-4 h-4 text-green-600" />}
                            <span>{feature.buyHold}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {getWinnerBadge(winner)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </InteractiveCard>
      </AnimatedElement>

      {/* Summary Cards */}
      {selectedStrategy && (
        <AnimatedElement animation="fade-in-up" delay={400}>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InteractiveCard 
              variant={selectedStrategy === 'fix-flip' ? 'luxury' : 'minimal'} 
              hover="lift" 
              className="p-6"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  Fix & Flip Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features
                  .filter(f => getWinner(f) === 'fix-flip')
                  .map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{feature.feature}:</span>
                        <span className="text-muted-foreground ml-1">{feature.fixFlip}</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </InteractiveCard>

            <InteractiveCard 
              variant={selectedStrategy === 'buy-hold' ? 'luxury' : 'minimal'} 
              hover="lift" 
              className="p-6"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <Home className="w-5 h-5 text-secondary" />
                  </div>
                  Buy & Hold Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features
                  .filter(f => getWinner(f) === 'buy-hold')
                  .map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{feature.feature}:</span>
                        <span className="text-muted-foreground ml-1">{feature.buyHold}</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </InteractiveCard>
          </div>
        </AnimatedElement>
      )}
    </div>
  );
};

export default StrategyComparison;