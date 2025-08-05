import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Calendar, Clock, User, Tag } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { StructuredDataProvider } from "@/components/seo/StructuredDataProvider";
import { ShortAnswerSection } from "@/components/content/ShortAnswerSection";
import { generateTitle, truncateDescription, formatDateForSchema } from "@/utils/seo/metaUtils";
import voiceOptimizedBlogData from "@/data/voiceOptimizedBlogData.json";
import costaDelSolMarketImage from "@/assets/blog-costa-del-sol-market.jpg";
import marbellaEsteponaVillasImage from "@/assets/blog-marbella-estepona-villas.jpg";
import buyingGuideSpainImage from "@/assets/blog-buying-guide-spain.jpg";

// Voice-optimized blog data with short answers
const blogPosts = voiceOptimizedBlogData.blogPosts.map(post => ({
  ...post,
  image: post.id === 1 ? costaDelSolMarketImage : 
         post.id === 2 ? marbellaEsteponaVillasImage : 
         buyingGuideSpainImage
}));

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <StructuredDataProvider
      pageType="article"
      pageData={{
        title: post.seoMetadata?.metaTitle || post.title,
        description: post.seoMetadata?.metaDescription || post.excerpt,
        author: post.author,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        image: post.image,
        breadcrumbs: [
          { name: "Home", url: "https://delsolprimehomes.com" },
          { name: "Blog", url: "https://delsolprimehomes.com/blog" },
          { name: post.title, url: `https://delsolprimehomes.com/blog/${slug}` }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        <SEOHead
          title={generateTitle(post.seoMetadata?.metaTitle || post.title)}
          description={truncateDescription(post.seoMetadata?.metaDescription || post.excerpt)}
          canonical={post.seoMetadata?.canonicalUrl || `/blog/${slug}`}
          ogType="article"
          ogImage={post.image}
          article={{
            publishedTime: formatDateForSchema(post.publishDate),
            author: post.author,
            section: post.category,
            tags: [post.category, "Costa del Sol", "Real Estate"]
          }}
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

            {/* Short Answer Section for Voice Search */}
            {post.shortAnswer && (
              <ShortAnswerSection
                shortAnswer={post.shortAnswer}
                voiceSearchReady={post.voiceSearchReady}
                lastUpdated={post.lastModified}
                variant="featured"
              />
            )}

            <div className="prose prose-lg prose-stone dark:prose-invert mx-auto">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
            </div>
          </article>
        </Container>
      </Section>
    </div>
    </StructuredDataProvider>
  );
};

export default BlogPost;
