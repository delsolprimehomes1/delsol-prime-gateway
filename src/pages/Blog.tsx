
import { useState } from "react";
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sample blog data - in production this would come from CMS/API
const allPosts = [
  {
    id: 1,
    title: "Costa del Sol Property Market Outlook 2024",
    excerpt: "Discover the latest trends and investment opportunities in Spain's premier coastal real estate market. Our comprehensive analysis covers pricing trends, emerging neighborhoods, and investment hotspots.",
    image: "/placeholder.svg",
    category: "Market Analysis",
    author: "Maria Rodriguez",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    slug: "costa-del-sol-market-outlook-2024",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Villa Investment Guide: Marbella vs Estepona",
    excerpt: "Compare investment potential between two of Costa del Sol's most prestigious locations. We analyze ROI, rental yields, and long-term appreciation prospects.",
    image: "/placeholder.svg",
    category: "Investment",
    author: "James Thompson",
    publishDate: "2024-01-12",
    readTime: "8 min read",
    slug: "luxury-villa-investment-marbella-estepona",
    featured: true
  },
  {
    id: 3,
    title: "Complete Guide to Buying Property in Spain as a Foreigner",
    excerpt: "Everything you need to know about the legal process, taxes, and requirements for international buyers. From NIE numbers to mortgage applications.",
    image: "/placeholder.svg",
    category: "Buyer's Guide",
    author: "Ana Fernandez",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    slug: "buying-property-spain-foreigner-guide",
    featured: true
  },
  {
    id: 4,
    title: "The Rise of Sustainable Luxury Homes in Costa del Sol",
    excerpt: "Eco-friendly features are becoming standard in luxury properties. Explore the latest trends in sustainable architecture and energy-efficient homes.",
    image: "/placeholder.svg",
    category: "Lifestyle",
    author: "Carlos Martinez",
    publishDate: "2024-01-08",
    readTime: "6 min read",
    slug: "sustainable-luxury-homes-costa-del-sol",
    featured: false
  },
  {
    id: 5,
    title: "Spanish Property Tax Guide 2024: What International Buyers Need to Know",
    excerpt: "Navigate the complex world of Spanish property taxes with our comprehensive guide covering IVA, transfer tax, and ongoing property taxes.",
    image: "/placeholder.svg",
    category: "Legal",
    author: "Isabel Rodriguez",
    publishDate: "2024-01-05",
    readTime: "10 min read",
    slug: "spanish-property-tax-guide-2024",
    featured: false
  },
  {
    id: 6,
    title: "Puerto Banús: The Ultimate Luxury Lifestyle Destination",
    excerpt: "Discover why Puerto Banús remains one of Europe's most exclusive marinas, offering unparalleled luxury living and investment opportunities.",
    image: "/placeholder.svg",
    category: "Lifestyle",
    author: "Miguel Santos",
    publishDate: "2024-01-03",
    readTime: "7 min read",
    slug: "puerto-banus-luxury-lifestyle-destination",
    featured: false
  }
];

const categories = [
  "All Posts",
  "Market Analysis", 
  "Investment",
  "Buyer's Guide",
  "Lifestyle",
  "Legal"
];

const recentPosts = allPosts.slice(0, 4);

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <Container size="xl" className="text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            DelSolPrimeHomes <span className="text-primary-glow">Blog</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Expert insights, market analysis, and insider knowledge from Costa del Sol's 
            premier real estate professionals
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={currentLanguage === "EN" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setCurrentLanguage("EN")}
              className="rounded-full"
            >
              EN
            </Button>
            <Button
              variant={currentLanguage === "NL" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setCurrentLanguage("NL")}
              className="rounded-full"
            >
              NL
            </Button>
          </div>
        </Container>
      </div>

      <Container size="xl" padding="lg" className="py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filters */}
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <Grid cols={1} gap="lg" responsive={{ md: 2 }}>
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group hover:shadow-luxury transition-all duration-500 overflow-hidden border-0"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishDate}>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group/link"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Categories</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span className={selectedCategory === category ? "text-primary font-medium" : ""}>
                      {category}
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Recent Posts</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-premium text-white">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">Stay Updated</h3>
                <p className="text-sm opacity-90">
                  Get the latest market insights and exclusive property opportunities delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button variant="secondary" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
