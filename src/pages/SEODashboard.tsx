import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  // Real data state
  const [overviewStats, setOverviewStats] = useState({
    totalKeywords: 0,
    avgPosition: 0,
    totalClicks: 0,
    totalImpressions: 0,
    ctr: 0,
    organicTraffic: 0
  });

  const [topKeywords, setTopKeywords] = useState<any[]>([]);
  const [backlinksData, setBacklinksData] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [seoTasks, setSeoTasks] = useState<any[]>([]);

  // Fetch data from database
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch search console data
      const { data: searchData, error: searchError } = await supabase
        .from('search_console_data')
        .select('*')
        .order('date', { ascending: false });

      if (searchError) throw searchError;

      // Fetch keywords data
      const { data: keywordsData, error: keywordsError } = await supabase
        .from('seo_keywords')
        .select('*')
        .order('current_position', { ascending: true });

      if (keywordsError) throw keywordsError;

      // Fetch backlinks data
      const { data: backlinksData, error: backlinksError } = await supabase
        .from('backlinks')
        .select('*')
        .order('created_at', { ascending: false });

      if (backlinksError) throw backlinksError;

      // Fetch analytics data
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics_data')
        .select('*')
        .order('date', { ascending: false });

      if (analyticsError) throw analyticsError;

      // Fetch SEO tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('seo_tasks')
        .select('*')
        .order('priority', { ascending: true });

      if (tasksError) throw tasksError;

      // Process data for overview stats
      const totalClicks = searchData?.reduce((sum, item) => sum + (item.clicks || 0), 0) || 0;
      const totalImpressions = searchData?.reduce((sum, item) => sum + (item.impressions || 0), 0) || 0;
      const avgPosition = searchData?.length > 0 
        ? searchData.reduce((sum, item) => sum + (item.position || 0), 0) / searchData.length
        : 0;

      setOverviewStats({
        totalKeywords: keywordsData?.length || 0,
        avgPosition: Math.round(avgPosition * 10) / 10,
        totalClicks,
        totalImpressions,
        ctr: totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 1000) / 10 : 0,
        organicTraffic: analyticsData?.reduce((sum, item) => sum + (item.page_views || 0), 0) || 0
      });

      // Process keywords data
      const processedKeywords = keywordsData?.slice(0, 5).map(keyword => ({
        keyword: keyword.keyword,
        position: keyword.current_position || 0,
        volume: keyword.search_volume || 0,
        change: (keyword.best_position && keyword.current_position) 
          ? keyword.best_position - keyword.current_position
          : 0
      })) || [];

      setTopKeywords(processedKeywords);
      setBacklinksData(backlinksData || []);
      setAnalyticsData(analyticsData || []);
      setSeoTasks(tasksData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch fresh data from APIs
  const fetchFreshData = async () => {
    setRefreshing(true);
    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Fetch keywords data
      const { data: keywordsResult, error: keywordsError } = await supabase.functions.invoke('fetch-seo-data', {
        body: { 
          dataType: 'keywords', 
          domain: 'delsolprimehomes.com',
          keywords: ['Costa Del Sol properties', 'marbella apartments']
        },
        headers: { authorization: `Bearer ${session.access_token}` }
      });

      if (keywordsError) throw keywordsError;

      // Fetch backlinks data
      const { data: backlinksResult, error: backlinksError } = await supabase.functions.invoke('fetch-seo-data', {
        body: { 
          dataType: 'backlinks', 
          domain: 'delsolprimehomes.com'
        },
        headers: { authorization: `Bearer ${session.access_token}` }
      });

      if (backlinksError) throw backlinksError;

      // Fetch analytics data
      const { data: analyticsResult, error: analyticsError } = await supabase.functions.invoke('fetch-seo-data', {
        body: { 
          dataType: 'analytics', 
          domain: 'delsolprimehomes.com'
        },
        headers: { authorization: `Bearer ${session.access_token}` }
      });

      if (analyticsError) throw analyticsError;

      toast({
        title: "Success",
        description: "Fresh SEO data has been fetched and stored successfully!"
      });

      // Refresh dashboard data
      await fetchDashboardData();

    } catch (error) {
      console.error('Error fetching fresh data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fresh data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

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
            <Button size="sm" onClick={fetchFreshData} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
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
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : topKeywords.length > 0 ? (
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
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No keyword data available</p>
                    <p>Click "Refresh Data" to fetch fresh keyword rankings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Data</CardTitle>
                <CardDescription>Website traffic and user behavior insights</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : analyticsData.length > 0 ? (
                  <div className="space-y-4">
                    {analyticsData.slice(0, 10).map((item, index) => (
                      <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Page</div>
                          <div className="font-medium">{item.page_path}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Page Views</div>
                          <div className="font-medium">{(item.page_views || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Unique Visitors</div>
                          <div className="font-medium">{(item.unique_visitors || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Bounce Rate</div>
                          <div className="font-medium">{((item.bounce_rate || 0) * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No analytics data available</p>
                    <p>Click "Refresh Data" to fetch fresh analytics data</p>
                  </div>
                )}
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
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : backlinksData.length > 0 ? (
                  <div className="space-y-4">
                    {backlinksData.slice(0, 10).map((backlink, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{backlink.source_url}</div>
                          <div className="text-sm text-muted-foreground">
                            {backlink.anchor_text && `Anchor: ${backlink.anchor_text}`}
                            {backlink.anchor_text && backlink.link_type && ' • '}
                            {backlink.link_type && `Type: ${backlink.link_type}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{backlink.domain_authority || 'N/A'}</div>
                            <div className="text-xs text-muted-foreground">DA</div>
                          </div>
                          <Badge variant={backlink.is_active ? 'default' : 'secondary'}>
                            {backlink.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Link className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No backlink data available</p>
                    <p>Click "Refresh Data" to fetch fresh backlink data</p>
                  </div>
                )}
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