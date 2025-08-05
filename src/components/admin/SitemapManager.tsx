import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  RefreshCw, 
  CheckCircle, 
  ExternalLink, 
  Download,
  AlertCircle,
  Clock,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { triggerSitemapGeneration } from '@/utils/seo/sitemapService';
import { generateAllSitemaps, generateSitemapXML } from '@/utils/seo/sitemapGenerator';

export function SitemapManager() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastGenerated, setLastGenerated] = React.useState<string | null>(null);

  const handleGenerateSitemaps = async () => {
    setIsGenerating(true);
    
    try {
      await triggerSitemapGeneration();
      setLastGenerated(new Date().toISOString());
      
      toast({
        title: "Sitemaps Generated Successfully",
        description: "All sitemaps have been generated and submitted to search engines.",
      });
    } catch (error) {
      console.error('Sitemap generation failed:', error);
      toast({
        title: "Sitemap Generation Failed",
        description: "There was an error generating or submitting the sitemaps.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSitemap = async () => {
    try {
      const sitemapData = generateAllSitemaps();
      const allEntries = [
        ...sitemapData.staticPages,
        ...sitemapData.blogPosts,
        ...sitemapData.locations,
        ...sitemapData.faqs
      ];
      
      const sitemapXML = generateSitemapXML(allEntries);
      
      const blob = new Blob([sitemapXML], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Sitemap Downloaded",
        description: "The sitemap.xml file has been downloaded to your device.",
      });
    } catch (error) {
      console.error('Sitemap download failed:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the sitemap.",
        variant: "destructive",
      });
    }
  };

  const sitemapUrls = [
    { name: 'Main Sitemap', url: 'https://delsolprimehomes.com/sitemap.xml' },
    { name: 'Blog Sitemap', url: 'https://delsolprimehomes.com/sitemap-blog.xml' },
    { name: 'Locations Sitemap', url: 'https://delsolprimehomes.com/sitemap-locations.xml' },
    { name: 'Sitemap Index', url: 'https://delsolprimehomes.com/sitemap-index.xml' }
  ];

  const searchEngineSubmissionUrls = [
    { 
      name: 'Google Search Console', 
      url: 'https://search.google.com/search-console',
      description: 'Submit and monitor sitemaps in Google Search Console'
    },
    { 
      name: 'Bing Webmaster Tools', 
      url: 'https://www.bing.com/webmasters',
      description: 'Submit and monitor sitemaps in Bing Webmaster Tools'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sitemap Management</h2>
          <p className="text-muted-foreground">
            Generate and manage XML sitemaps with multilingual support and automatic search engine submission
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          8 Languages
        </Badge>
      </div>

      <Separator />

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Sitemap Generation
          </CardTitle>
          <CardDescription>
            Generate XML sitemaps with hreflang attributes for all supported languages and automatically submit to search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleGenerateSitemaps}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Generate & Submit Sitemaps
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDownloadSitemap}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Sitemap
            </Button>
          </div>

          {lastGenerated && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last generated: {new Date(lastGenerated).toLocaleString()}
            </div>
          )}

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Automatic Features:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Multilingual hreflang links for all 8 supported languages</li>
                  <li>• Automatic lastmod timestamps for all URLs</li>
                  <li>• Priority and changefreq optimization per page type</li>
                  <li>• Automatic submission to Google & Bing after generation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sitemap URLs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Generated Sitemaps
          </CardTitle>
          <CardDescription>
            Access and verify your XML sitemaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sitemapUrls.map((sitemap, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{sitemap.name}</p>
                  <p className="text-sm text-muted-foreground">{sitemap.url}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={sitemap.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Engine Submission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Engine Submission
          </CardTitle>
          <CardDescription>
            Monitor and manage sitemap submissions to search engines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {searchEngineSubmissionUrls.map((engine, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{engine.name}</p>
                  <p className="text-sm text-muted-foreground">{engine.description}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={engine.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open
                  </a>
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Automatic Submission Enabled</p>
                <p className="text-green-700 dark:text-green-300">
                  Sitemaps are automatically submitted to Google and Bing whenever you generate new sitemaps. 
                  Manual verification in webmaster tools is recommended for monitoring.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}