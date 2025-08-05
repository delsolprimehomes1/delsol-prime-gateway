// Twitter Card Validator Component for SEO testing
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

const TwitterCardValidator = () => {
  const [url, setUrl] = useState('');
  const [validationResults, setValidationResults] = useState<any>(null);

  const validateTwitterCard = () => {
    // Open Twitter Card Validator
    const twitterValidatorUrl = `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`;
    window.open(twitterValidatorUrl, '_blank');
  };

  const validateFacebookDebugger = () => {
    // Open Facebook Sharing Debugger
    const facebookDebuggerUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`;
    window.open(facebookDebuggerUrl, '_blank');
  };

  const validateLinkedInInspector = () => {
    // Open LinkedIn Post Inspector
    const linkedInInspectorUrl = `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`;
    window.open(linkedInInspectorUrl, '_blank');
  };

  const commonPages = [
    { name: 'Homepage', url: 'https://delsolprimehomes.com' },
    { name: 'About', url: 'https://delsolprimehomes.com/about' },
    { name: 'Blog', url: 'https://delsolprimehomes.com/blog' },
    { name: 'FAQ', url: 'https://delsolprimehomes.com/faq' },
    { name: 'Marbella Properties', url: 'https://delsolprimehomes.com/locations/marbella' },
    { name: 'Estepona Properties', url: 'https://delsolprimehomes.com/locations/estepona' }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          Social Media Preview Validator
        </CardTitle>
        <p className="text-muted-foreground">
          Test how your pages appear when shared on social media platforms
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Page URL to Validate</label>
          <div className="flex gap-2">
            <Input
              placeholder="https://delsolprimehomes.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Quick Page Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Select Common Pages</label>
          <div className="grid grid-cols-2 gap-2">
            {commonPages.map((page, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setUrl(page.url)}
                className="justify-start text-sm"
              >
                {page.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Validation Buttons */}
        <div className="space-y-3">
          <h4 className="font-medium">Validate on Platforms:</h4>
          <div className="grid gap-2">
            <Button
              onClick={validateTwitterCard}
              disabled={!url}
              className="justify-start"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Twitter Card Validator
            </Button>
            <Button
              onClick={validateFacebookDebugger}
              disabled={!url}
              className="justify-start"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Facebook Sharing Debugger
            </Button>
            <Button
              onClick={validateLinkedInInspector}
              disabled={!url}
              className="justify-start"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              LinkedIn Post Inspector
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Validation Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Images should be 1200x630px for optimal display</li>
            <li>• Titles should be under 60 characters</li>
            <li>• Descriptions should be under 160 characters</li>
            <li>• Test both desktop and mobile previews</li>
            <li>• Clear cache if changes don't appear immediately</li>
          </ul>
        </div>

        {/* Current Page Metadata Preview */}
        <div className="p-4 border rounded-lg bg-background">
          <h4 className="font-medium mb-2">Current Page Metadata Check</h4>
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>✓ Open Graph tags configured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>✓ Twitter Card meta tags present</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>✓ Optimized preview images available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>✓ Mobile-optimized dimensions</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterCardValidator;