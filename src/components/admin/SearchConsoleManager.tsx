import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Monitor,
  Clock,
  TrendingUp,
  FileText,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SearchConsoleManager() {
  const { toast } = useToast();

  const verificationSteps = [
    {
      id: 1,
      title: "Google Search Console Verification",
      description: "Add your site and verify ownership",
      status: "pending",
      actions: [
        { label: "Open Google Search Console", url: "https://search.google.com/search-console" },
        { label: "Add Property (delsolprimehomes.com)", url: "https://search.google.com/search-console/welcome" }
      ]
    },
    {
      id: 2,
      title: "Submit Sitemaps to Google",
      description: "Submit all sitemap files for indexing",
      status: "pending",
      sitemaps: [
        "https://delsolprimehomes.com/sitemap-index.xml",
        "https://delsolprimehomes.com/sitemap.xml",
        "https://delsolprimehomes.com/sitemap-blog.xml",
        "https://delsolprimehomes.com/sitemap-locations.xml"
      ]
    },
    {
      id: 3,
      title: "Bing Webmaster Tools Setup", 
      description: "Verify site and submit sitemaps to Bing",
      status: "pending",
      actions: [
        { label: "Open Bing Webmaster Tools", url: "https://www.bing.com/webmasters" },
        { label: "Add Site", url: "https://www.bing.com/webmasters/home/addsite" }
      ]
    }
  ];

  const monitoringAreas = [
    {
      title: "Index Coverage",
      description: "Monitor which pages are indexed",
      frequency: "Weekly",
      path: "Coverage",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Mobile Usability",
      description: "Check mobile-friendly pages",
      frequency: "Weekly", 
      path: "Mobile Usability",
      icon: <Monitor className="w-5 h-5" />
    },
    {
      title: "Core Web Vitals",
      description: "Performance metrics monitoring",
      frequency: "Weekly",
      path: "Core Web Vitals",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "FAQ Structured Data",
      description: "Validate FAQ schema markup",
      frequency: "Monthly",
      path: "Enhancements > FAQ",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Article Structured Data", 
      description: "Validate blog article schemas",
      frequency: "Monthly",
      path: "Enhancements > Article",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const handleCopyVerificationTag = () => {
    const verificationTag = `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />`;
    navigator.clipboard.writeText(verificationTag);
    toast({
      title: "Verification Tag Copied",
      description: "Paste this into your HTML head section for verification.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Search Console Management</h2>
          <p className="text-muted-foreground">
            Verify ownership and monitor your site's search performance
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          SEO Monitoring
        </Badge>
      </div>

      <Separator />

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Verification Setup
          </CardTitle>
          <CardDescription>
            Complete these steps to verify your site with search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {verificationSteps.map((step) => (
            <div key={step.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {step.status === 'completed' ? 'Completed' : 'Pending'}
                </Badge>
              </div>

              {step.actions && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {step.actions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm" asChild>
                      <a href={action.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {action.label}
                      </a>
                    </Button>
                  ))}
                </div>
              )}

              {step.sitemaps && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sitemaps to submit:</p>
                  <div className="grid gap-2">
                    {step.sitemaps.map((sitemap, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                        <code className="text-xs">{sitemap}</code>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={sitemap} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monitoring Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Monitoring Schedule
          </CardTitle>
          <CardDescription>
            Regular checks to maintain optimal search performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {monitoringAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {area.icon}
                  <div>
                    <p className="font-medium">{area.title}</p>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{area.frequency}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{area.path}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Email Alert Setup</p>
                <p className="text-amber-700 dark:text-amber-300">
                  Enable email notifications in Google Search Console and Bing Webmaster Tools 
                  for crawl errors, index coverage issues, and manual actions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Quick Access
          </CardTitle>
          <CardDescription>
            Direct links to important sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <a href="https://search.google.com/search-console/sitemaps" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <p className="font-medium">Google Sitemap Status</p>
                  <p className="text-sm text-muted-foreground">Check submission status</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <a href="https://www.bing.com/webmasters/home/mysites" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <p className="font-medium">Bing Site Dashboard</p>
                  <p className="text-sm text-muted-foreground">Monitor Bing indexing</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <a href="https://search.google.com/test/mobile-friendly" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <p className="font-medium">Mobile-Friendly Test</p>
                  <p className="text-sm text-muted-foreground">Test individual pages</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
                <div className="text-left">
                  <p className="font-medium">Rich Results Test</p>
                  <p className="text-sm text-muted-foreground">Validate structured data</p>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}