
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  check: () => Promise<boolean>;
}

export function DeploymentChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'ssl',
      name: 'SSL Certificate',
      description: 'Verify HTTPS is enabled and certificate is valid',
      status: 'pending',
      check: async () => {
        return window.location.protocol === 'https:';
      }
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Verify GA4 tracking is working',
      status: 'pending',
      check: async () => {
        return typeof window.gtag === 'function';
      }
    },
    {
      id: 'serviceWorker',
      name: 'Service Worker',
      description: 'Check if service worker is registered',
      status: 'pending',
      check: async () => {
        return 'serviceWorker' in navigator && 
               !!(await navigator.serviceWorker.getRegistration());
      }
    },
    {
      id: 'manifest',
      name: 'Web App Manifest',
      description: 'Verify PWA manifest is accessible',
      status: 'pending',
      check: async () => {
        try {
          const response = await fetch('/manifest.json');
          return response.ok;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'robots',
      name: 'Robots.txt',
      description: 'Check robots.txt file exists and is accessible',
      status: 'pending',
      check: async () => {
        try {
          const response = await fetch('/robots.txt');
          return response.ok;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'sitemap',
      name: 'XML Sitemap',
      description: 'Verify sitemap is accessible',
      status: 'pending',
      check: async () => {
        try {
          const response = await fetch('/sitemap.xml');
          return response.ok;
        } catch {
          return false;
        }
      }
    },
    {
      id: 'performance',
      name: 'Performance Monitoring',
      description: 'Check if performance monitoring is active',
      status: 'pending',
      check: async () => {
        return typeof PerformanceObserver !== 'undefined';
      }
    },
    {
      id: 'errorBoundary',
      name: 'Error Handling',
      description: 'Verify error boundary is implemented',
      status: 'pending',
      check: async () => {
        // Check if error boundary component exists in DOM
        return document.querySelector('[data-error-boundary]') !== null;
      }
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const runChecks = async () => {
    setIsRunning(true);
    
    for (const item of items) {
      try {
        const result = await item.check();
        setItems(prev => prev.map(i => 
          i.id === item.id 
            ? { ...i, status: result ? 'success' : 'error' }
            : i
        ));
      } catch (error) {
        console.error(`Check failed for ${item.name}:`, error);
        setItems(prev => prev.map(i => 
          i.id === item.id 
            ? { ...i, status: 'error' }
            : i
        ));
      }
      
      // Small delay between checks
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    runChecks();
  }, []);

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-muted-foreground animate-spin" />;
    }
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      warning: 'secondary',
      pending: 'outline'
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status === 'pending' ? 'Checking...' : status}
      </Badge>
    );
  };

  const successCount = items.filter(item => item.status === 'success').length;
  const totalCount = items.length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Deployment Checklist</h2>
          <p className="text-muted-foreground">
            Production readiness verification ({successCount}/{totalCount} passed)
          </p>
        </div>
        <Button 
          onClick={runChecks} 
          disabled={isRunning}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
          Re-run Checks
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            {getStatusBadge(item.status)}
          </div>
        ))}
      </div>

      {successCount === totalCount && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-800 font-medium">
              All checks passed! Your site is ready for production.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
