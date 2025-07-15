
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/layout/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sample blog post data - in production this would be fetched based on slug
const blogPost = {
  id: 1,
  title: "Costa del Sol Property Market Outlook 2024",
  excerpt: "Discover the latest trends and investment opportunities in Spain's premier coastal real estate market.",
  content: `
    <p>The Costa del Sol continues to be one of Europe's most sought-after real estate destinations, attracting international investors and lifestyle buyers from around the world. As we move through 2024, several key trends are shaping the market landscape.</p>
    
    <h2>Market Performance Overview</h2>
    <p>The Costa del Sol property market has shown remarkable resilience throughout 2023, with luxury segment properties experiencing particularly strong demand. Our analysis indicates that prime coastal properties have appreciated by an average of 8-12% year-over-year.</p>
    
    <h2>Investment Hotspots</h2>
    <p>Several areas stand out as exceptional investment opportunities:</p>
    <ul>
      <li><strong>Marbella Golden Mile:</strong> Ultra-luxury villas and apartments continue to attract premium buyers</li>
      <li><strong>Estepona:</strong> Emerging as a more affordable alternative with excellent growth potential</li>
      <li><strong>Benahavís:</strong> Golf course properties seeing increased international interest</li>
      <li><strong>Torrox Costa:</strong> Best value proposition for first-time buyers</li>
    </ul>
    
    <h2>Key Market Drivers</h2>
    <p>Several factors are contributing to the market's strength:</p>
    <ol>
      <li>Digital nomad visa attracting remote workers</li>
      <li>Brexit driving UK buyers to secure EU residency</li>
      <li>Limited inventory in prime locations</li>
      <li>Infrastructure improvements enhancing accessibility</li>
    </ol>
    
    <h2>Outlook for 2024</h2>
    <p>We anticipate continued growth in the luxury segment, with particular strength in properties offering:</p>
    <ul>
      <li>Sustainable and eco-friendly features</li>
      <li>Sea views and beachfront access</li>
      <li>Modern amenities and smart home technology</li>
      <li>Private pools and outdoor entertainment areas</li>
    </ul>
    
    <p>For investors considering the Costa del Sol market, timing remains favorable, though we recommend acting decisively given the competitive landscape.</p>
  `,
  image: "/placeholder.svg",
  category: "Market Analysis",
  author: "Maria Rodriguez",
  authorBio: "Maria is a senior market analyst with over 15 years of experience in Costa del Sol real estate. She holds an MBA in International Business and specializes in luxury property investments.",
  authorImage: "/placeholder.svg",
  publishDate: "2024-01-15",
  readTime: "5 min read",
  slug: "costa-del-sol-market-outlook-2024",
  tags: ["Market Analysis", "Investment", "Costa del Sol", "Property Trends"],
  tableOfContents: [
    { id: "overview", title: "Market Performance Overview" },
    { id: "hotspots", title: "Investment Hotspots" },
    { id: "drivers", title: "Key Market Drivers" },
    { id: "outlook", title: "Outlook for 2024" }
  ]
};

const relatedPosts = [
  {
    id: 2,
    title: "Luxury Villa Investment Guide: Marbella vs Estepona",
    image: "/placeholder.svg",
    slug: "luxury-villa-investment-marbella-estepona",
    publishDate: "2024-01-12"
  },
  {
    id: 3,
    title: "Complete Guide to Buying Property in Spain as a Foreigner",
    image: "/placeholder.svg", 
    slug: "buying-property-spain-foreigner-guide",
    publishDate: "2024-01-10"
  },
  {
    id: 4,
    title: "The Rise of Sustainable Luxury Homes in Costa del Sol",
    image: "/placeholder.svg",
    slug: "sustainable-luxury-homes-costa-del-sol", 
    publishDate: "2024-01-08"
  }
];

export default function BlogPost() {
  const { slug } = useParams();

  const shareUrl = `${window.location.origin}/blog/${slug}`;
  const shareTitle = blogPost.title;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 flex items-center">
          <Container size="xl" className="text-white">
            <div className="max-w-4xl">
              <div className="mb-4">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {blogPost.category}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {blogPost.title}
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                {blogPost.excerpt}
              </p>
            </div>
          </Container>
        </div>
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
              <BreadcrumbLink asChild>
                <Link to="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{blogPost.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-8">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b pb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <time dateTime={blogPost.publishDate}>
                    {new Date(blogPost.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{blogPost.author}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Share this article:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('facebook')}
                    className="rounded-full"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('twitter')}
                    className="rounded-full"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('linkedin')}
                    className="rounded-full"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('email')}
                    className="rounded-full"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-8 border-t">
                <span className="text-sm font-medium">Tags:</span>
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Bio */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={blogPost.authorImage}
                      alt={blogPost.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{blogPost.author}</h3>
                      <p className="text-muted-foreground">{blogPost.authorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Table of Contents</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {blogPost.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200 text-sm"
                  >
                    {item.title}
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-premium text-white">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">Stay Updated</h3>
                <p className="text-sm opacity-90">
                  Get the latest market insights delivered to your inbox.
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-luxury transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group/link"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            Next Article
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </div>
  );
}
