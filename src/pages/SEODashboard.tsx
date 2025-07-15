import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Eye, 
  MousePointer, 
  Users,
  Globe,
  Link,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

const SEODashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - will be replaced with real Supabase data
  const overviewStats = {
    totalKeywords: 245,
    avgPosition: 8.3,
    totalClicks: 12847,
    totalImpressions: 89234,
    ctr: 14.4,
    organicTraffic: 15623
  };

  const topKeywords = [
    { keyword: "Costa del Sol properties", position: 3, volume: 2400, change: 2 },
    { keyword: "Marbella apartments", position: 5, volume: 1900, change: -1 },
    { keyword: "Luxury villas Spain", position: 7, volume: 1200, change: 3 },
    { keyword: "Property investment Spain", position: 12, volume: 890, change: 0 },
    { keyword: "Real estate Malaga", position: 8, volume: 760, change: 1 }
  ];

  const seoTasks = [
    { id: 1, title: "Optimize homepage meta description", priority: "high", status: "pending" },
    { id: 2, title: "Add schema markup to property pages", priority: "medium", status: "in-progress" },
    { id: 3, title: "Build backlinks from local directories", priority: "low", status: "completed" },
    { id: 4, title: "Fix broken internal links", priority: "high", status: "pending" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress": return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SEO Dashboard - DelSol Prime Homes</title>
        <meta name="description" content="Monitor and optimize your website's SEO performance with comprehensive analytics and insights." />
      </Helmet>

      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">SEO Dashboard</h1>
            <p className="text-muted-foreground">Monitor and optimize your website's search performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalKeywords}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Position</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.avgPosition}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">-0.8</span> positions improved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalClicks.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+23%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.totalImpressions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.ctr}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewStats.organicTraffic.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+15%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Keywords</CardTitle>
                <CardDescription>Your best ranking keywords and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{keyword.keyword}</div>
                        <div className="text-sm text-muted-foreground">
                          Volume: {keyword.volume.toLocaleString()} searches/month
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">#{keyword.position}</div>
                          <div className="text-xs text-muted-foreground">Position</div>
                        </div>
                        <div className="flex items-center">
                          {keyword.change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : keyword.change < 0 ? (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          ) : null}
                          <span className={`text-sm ml-1 ${
                            keyword.change > 0 ? 'text-green-500' : 
                            keyword.change < 0 ? 'text-destructive' : 'text-muted-foreground'
                          }`}>
                            {keyword.change > 0 ? '+' : ''}{keyword.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Keyword Tracking</CardTitle>
                  <CardDescription>Monitor your keyword rankings and performance</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Keywords
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No keyword data available</p>
                  <p>Connect your Google Search Console to start tracking keywords</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Integration</CardTitle>
                <CardDescription>Connect your Google Analytics for traffic insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Analytics Not Connected</p>
                  <p className="mb-4">Connect Google Analytics to view traffic data and user behavior</p>
                  <Button>Connect Google Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backlinks Tab */}
          <TabsContent value="backlinks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backlink Profile</CardTitle>
                <CardDescription>Monitor your website's backlink portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Link className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Backlink Tracking Coming Soon</p>
                  <p>We're working on integrating backlink monitoring tools</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>SEO Tasks</CardTitle>
                  <CardDescription>Manage your SEO optimization tasks</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground capitalize">{task.status.replace('-', ' ')}</div>
                        </div>
                      </div>
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboard;