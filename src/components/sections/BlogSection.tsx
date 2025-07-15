
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";
import costaDelSolMarketImage from "@/assets/blog-costa-del-sol-market.jpg";
import marbellaEsteponaVillasImage from "@/assets/blog-marbella-estepona-villas.jpg";
import buyingGuideSpainImage from "@/assets/blog-buying-guide-spain.jpg";

// Sample blog data - in real app this would come from CMS/API
const featuredPosts = [
  {
    id: 1,
    title: "Costa del Sol Property Market Outlook 2024",
    excerpt: "Discover the latest trends and investment opportunities in Spain's premier coastal real estate market.",
    image: costaDelSolMarketImage,
    category: "Market Analysis",
    author: "Maria Rodriguez",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    slug: "costa-del-sol-market-outlook-2024"
  },
  {
    id: 2,
    title: "Luxury Villa Investment Guide: Marbella vs Estepona",
    excerpt: "Compare investment potential between two of Costa del Sol's most prestigious locations.",
    image: marbellaEsteponaVillasImage,
    category: "Investment",
    author: "James Thompson",
    publishDate: "2024-01-12",
    readTime: "8 min read",
    slug: "luxury-villa-investment-marbella-estepona"
  },
  {
    id: 3,
    title: "Complete Guide to Buying Property in Spain as a Foreigner",
    excerpt: "Everything you need to know about the legal process, taxes, and requirements for international buyers.",
    image: buyingGuideSpainImage,
    category: "Buyer's Guide",
    author: "Ana Fernandez",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    slug: "buying-property-spain-foreigner-guide"
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

export default function BlogSection() {
  return (
    <Section 
      id="blog" 
      padding="xl" 
      background="muted"
      containerSize="xl"
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Latest <span className="text-primary">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with expert analysis, market trends, and insider knowledge 
            from Costa del Sol's premier real estate professionals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All Posts" ? "default" : "outline"}
              size="sm"
              className="rounded-full transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-luxury transition-all duration-500 overflow-hidden border-0 bg-background"
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
              </div>
              
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
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
                
                <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group/link"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" className="rounded-full px-8">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
