import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Calendar, Clock, User, Tag } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { generateArticleSchema, organizationSchema } from "@/utils/seo/structuredData";
import { generateTitle, truncateDescription, formatDateForSchema } from "@/utils/seo/metaUtils";
import costaDelSolMarketImage from "@/assets/blog-costa-del-sol-market.jpg";
import marbellaEsteponaVillasImage from "@/assets/blog-marbella-estepona-villas.jpg";
import buyingGuideSpainImage from "@/assets/blog-buying-guide-spain.jpg";

// Sample blog data - in real app this would come from CMS/API
const blogPosts = [
  {
    id: 1,
    title: "Costa del Sol Property Market Outlook 2024",
    excerpt: "Discover the latest trends and investment opportunities in Spain's premier coastal real estate market.",
    image: costaDelSolMarketImage,
    category: "Market Analysis",
    author: "Maria Rodriguez",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    content: "Detailed analysis of the Costa del Sol property market in 2024...",
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
    content: "Comparison of luxury villa investments in Marbella and Estepona...",
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
    content: "Step-by-step guide for foreigners buying property in Spain...",
    slug: "buying-property-spain-foreigner-guide"
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    image: post.image,
    url: `/blog/${slug}`
  });

  const structuredData = [organizationSchema, articleSchema];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={generateTitle(post.title)}
        description={truncateDescription(post.excerpt)}
        canonical={`/blog/${slug}`}
        ogType="article"
        ogImage={post.image}
        article={{
          publishedTime: formatDateForSchema(post.publishDate),
          author: post.author,
          section: post.category,
          tags: [post.category, "Costa del Sol", "Real Estate"]
        }}
        structuredData={structuredData}
      />
      
      <BreadcrumbNavigation 
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` }
        ]}
        className="container mx-auto px-6 py-4"
      />
      
      <Section className="py-24">
        <Container size="md">
          <article className="space-y-8">
            <header className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                <Tag className="w-4 h-4" />
                {post.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground mt-4">
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
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </header>

            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-2xl aspect-video object-cover"
              />
            </div>

            <div className="prose prose-lg prose-stone dark:prose-invert mx-auto">
              <p>{post.content}</p>
            </div>
          </article>
        </Container>
      </Section>
    </div>
  );
};

export default BlogPost;
