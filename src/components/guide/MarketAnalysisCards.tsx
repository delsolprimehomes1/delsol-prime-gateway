import { MapPin, TrendingUp, Euro, Users, Calendar } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { StaggeredContainer } from '@/components/ui/StaggeredContainer';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MarketData {
  location: string;
  fixFlipROI: string;
  buyHoldYield: string;
  avgPrice: string;
  bestStrategy: 'fix-flip' | 'buy-hold' | 'both';
  highlights: string[];
  demographics: {
    primaryBuyers: string;
    rentalDemand: string;
    seasonality: string;
  };
  marketTrends: {
    priceGrowth: string;
    inventory: string;
    outlook: string;
  };
}

interface MarketAnalysisCardsProps {
  className?: string;
}

const MarketAnalysisCards = ({ className }: MarketAnalysisCardsProps) => {
  const marketData: MarketData[] = [
    {
      location: "Marbella",
      fixFlipROI: "25-40%",
      buyHoldYield: "4-5%",
      avgPrice: "€650k",
      bestStrategy: "fix-flip",
      highlights: [
        "Golden Mile premium market",
        "High-end international buyers", 
        "Year-round luxury rental demand",
        "Established renovation infrastructure"
      ],
      demographics: {
        primaryBuyers: "UHNW individuals, celebrities",
        rentalDemand: "Luxury vacation & corporate",
        seasonality: "Peak: Apr-Oct, Strong winter"
      },
      marketTrends: {
        priceGrowth: "+8-12% annually",
        inventory: "Limited premium stock",
        outlook: "Strong long-term growth"
      }
    },
    {
      location: "Estepona",
      fixFlipROI: "20-35%",
      buyHoldYield: "5-6%",
      avgPrice: "€380k",
      bestStrategy: "both",
      highlights: [
        "Growing expat community",
        "New Marina development",
        "Strong appreciation potential",
        "Balanced investment opportunities"
      ],
      demographics: {
        primaryBuyers: "International families, retirees",
        rentalDemand: "Mixed vacation & long-term",
        seasonality: "Peak: May-Sep, Growing winter"
      },
      marketTrends: {
        priceGrowth: "+6-10% annually",
        inventory: "Good selection available",
        outlook: "Emerging hotspot"
      }
    },
    {
      location: "Fuengirola",
      fixFlipROI: "15-30%",
      buyHoldYield: "6-7%",
      avgPrice: "€280k",
      bestStrategy: "buy-hold",
      highlights: [
        "Excellent transport links",
        "Established rental market",
        "Good value for money",
        "Strong local amenities"
      ],
      demographics: {
        primaryBuyers: "Young families, first-time buyers",
        rentalDemand: "Year-round rentals",
        seasonality: "Stable throughout year"
      },
      marketTrends: {
        priceGrowth: "+4-7% annually",
        inventory: "Abundant supply",
        outlook: "Steady appreciation"
      }
    },
    {
      location: "Benalmádena",
      fixFlipROI: "18-32%",
      buyHoldYield: "5.5-6.5%",
      avgPrice: "€320k",
      bestStrategy: "both",
      highlights: [
        "Marina and casino attractions",
        "Family-friendly beaches",
        "Growing tourism sector",
        "Diverse property types"
      ],
      demographics: {
        primaryBuyers: "International mix, investors",
        rentalDemand: "Tourist & residential mix",
        seasonality: "Peak: Jun-Sep, Moderate winter"
      },
      marketTrends: {
        priceGrowth: "+5-8% annually",
        inventory: "Moderate availability",
        outlook: "Positive momentum"
      }
    },
    {
      location: "Mijas",
      fixFlipROI: "22-38%",
      buyHoldYield: "4.5-5.5%",
      avgPrice: "€420k",
      bestStrategy: "fix-flip",
      highlights: [
        "Traditional Spanish charm",
        "Golf course communities",
        "Panoramic views",
        "Premium positioning"
      ],
      demographics: {
        primaryBuyers: "Affluent retirees, golf enthusiasts",
        rentalDemand: "Luxury vacation rentals",
        seasonality: "Peak: Mar-Oct, Quiet winter"
      },
      marketTrends: {
        priceGrowth: "+7-11% annually",
        inventory: "Limited quality stock",
        outlook: "Strong fundamentals"
      }
    }
  ];

  const getStrategyBadge = (strategy: string) => {
    switch (strategy) {
      case 'fix-flip':
        return <Badge variant="outline" className="border-primary text-primary bg-primary/10">Best for Fix & Flip</Badge>;
      case 'buy-hold':
        return <Badge variant="outline" className="border-secondary text-secondary bg-secondary/10">Best for Buy & Hold</Badge>;
      case 'both':
        return <Badge variant="outline" className="border-accent-foreground text-accent-foreground bg-accent">Both Strategies</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-8', className)}>
      <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((area, index) => (
          <InteractiveCard key={index} variant="luxury" hover="lift" className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {area.location}
                </div>
                {getStrategyBadge(area.bestStrategy)}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/10 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Fix & Flip ROI</p>
                  <p className="font-bold text-primary text-sm">{area.fixFlipROI}</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Buy & Hold Yield</p>
                  <p className="font-bold text-secondary text-sm">{area.buyHoldYield}</p>
                </div>
              </div>
              
              {/* Average Price */}
              <div className="text-center bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Average Price</p>
                <p className="text-lg font-bold flex items-center justify-center gap-1">
                  <Euro className="w-4 h-4" />
                  {area.avgPrice}
                </p>
              </div>

              {/* Market Highlights */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Highlights
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {area.highlights.map((highlight, i) => (
                    <li key={i}>• {highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Demographics */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Market Demographics
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium">Buyers:</span>
                    <span className="text-muted-foreground ml-1">{area.demographics.primaryBuyers}</span>
                  </div>
                  <div>
                    <span className="font-medium">Rental Demand:</span>
                    <span className="text-muted-foreground ml-1">{area.demographics.rentalDemand}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <Calendar className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{area.demographics.seasonality}</span>
                  </div>
                </div>
              </div>

              {/* Market Trends */}
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-sm mb-2">Market Outlook</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Growth:</span>
                    <span className="font-medium text-green-600">{area.marketTrends.priceGrowth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inventory:</span>
                    <span className="font-medium">{area.marketTrends.inventory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outlook:</span>
                    <span className="font-medium text-primary">{area.marketTrends.outlook}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>
        ))}
      </StaggeredContainer>
    </div>
  );
};

export default MarketAnalysisCards;