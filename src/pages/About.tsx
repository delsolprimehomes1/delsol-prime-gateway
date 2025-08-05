
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { StructuredDataProvider } from "@/components/seo/StructuredDataProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  TrendingUp,
  Shield,
  Globe,
  Calendar,
  CheckCircle
} from "lucide-react";
import { generateTitle, META_DESCRIPTIONS } from "@/utils/seo/metaUtils";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hans van der Berg",
    "jobTitle": "Founder & CEO of DelSolPrimeHomes",
    "description": "International real estate expert with 15+ years experience in Spanish property market",
    "image": "https://delsolprimehomes.com/hans-founder.jpg",
    "url": "https://delsolprimehomes.com/about",
    "sameAs": [
      "https://linkedin.com/in/hansvanderberg-realestate",
      "https://instagram.com/hansdelsolhomes"
    ],
    "knowsAbout": [
      "Spanish Real Estate Law",
      "International Property Investment", 
      "Costa del Sol Market Analysis",
      "Property Development",
      "Investment Advisory"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Real Estate Agent",
      "occupationLocation": {
        "@type": "City",
        "name": "Marbella, Spain"
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Amsterdam",
      "department": "Business Administration"
    },
    "award": [
      "Top Real Estate Professional 2023",
      "International Service Excellence Award 2022"
    ]
  };

  const teamMembers = [
    {
      name: "Hans van der Berg",
      role: "Founder & CEO",
      expertise: ["Market Analysis", "Investment Strategy", "Client Relations"],
      languages: ["English", "Dutch", "Spanish", "German"],
      experience: "15+ years",
      image: "https://delsolprimehomes.com/team-hans.jpg"
    },
    {
      name: "Maria Gonzalez",
      role: "Senior Property Consultant",
      expertise: ["Luxury Properties", "Legal Compliance", "Spanish Market"],
      languages: ["Spanish", "English", "French"],
      experience: "10+ years",
      image: "https://delsolprimehomes.com/team-maria.jpg"
    },
    {
      name: "James Mitchell",
      role: "International Relations Manager", 
      expertise: ["International Clients", "Investment Analysis", "Relocation"],
      languages: ["English", "Spanish", "Italian"],
      experience: "8+ years",
      image: "https://delsolprimehomes.com/team-james.jpg"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      items: [
        "Top Real Estate Agency Costa del Sol 2023",
        "Best International Service Award 2022", 
        "Excellence in Customer Service 2021",
        "AIPP Member of the Year 2020"
      ]
    },
    {
      icon: TrendingUp,
      title: "Market Performance",
      items: [
        "€250M+ in property sales",
        "500+ successful transactions",
        "95% client satisfaction rate",
        "40+ nationalities served"
      ]
    },
    {
      icon: Shield,
      title: "Certifications",
      items: [
        "Spanish Real Estate License",
        "AIPP Certified Professional",
        "CEPI Member",
        "Legal Compliance Certified"
      ]
    }
  ];

  return (
    <StructuredDataProvider
      pageType="about"
      pageData={{
        title: "About DelSolPrimeHomes - Meet Our Expert Team",
        description: "Meet Hans van der Berg and the DelSolPrimeHomes team. 15+ years of expertise in Costa del Sol real estate, helping international clients find their dream properties in Spain.",
        breadcrumbs: [
          { name: "Home", url: "https://delsolprimehomes.com" },
          { name: "About", url: "https://delsolprimehomes.com/about" }
        ]
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <SEOHead
          title={generateTitle("About DelSolPrimeHomes - Meet Our Expert Team")}
          description="Meet Hans van der Berg and the DelSolPrimeHomes team. 15+ years of expertise in Costa del Sol real estate, helping international clients find their dream properties in Spain."
          canonical="/about"
        />
      
      <BreadcrumbNavigation 
        items={[{ name: "About", href: "/about" }]}
        className="container mx-auto px-6 py-4"
      />
      
      <Navigation />

      {/* Hero Section */}
      <Section
        id="about-hero"
        padding="xl"
        background="default"
        containerSize="lg"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">{t('about.stats.yearsExperience')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">{t('about.stats.propertiesSold')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">40+</div>
            <div className="text-sm text-muted-foreground">{t('about.stats.nationalities')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">€250M+</div>
            <div className="text-sm text-muted-foreground">{t('about.stats.salesVolume')}</div>
          </div>
        </div>
      </Section>

      {/* Founder Profile */}
      <Section
        id="founder-profile"
        padding="xl"
        background="muted"
        containerSize="lg"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face"
                alt="Hans van der Berg - Founder of DelSolPrimeHomes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="text-sm text-muted-foreground">127+ Client Reviews</div>
            </div>
          </div>
          
          <div>
            <Badge variant="outline" className="mb-4">Founder & CEO</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Meet Hans van der Berg
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                With over 15 years of experience in international real estate, Hans founded DelSolPrimeHomes 
                with a vision to provide unparalleled service to international property investors seeking 
                their dream homes in Costa del Sol.
              </p>
              <p>
                Originally from Amsterdam, Hans moved to Spain in 2008 and quickly became an expert in the 
                Spanish property market. His deep understanding of both international client needs and local 
                market dynamics has made him one of the most trusted real estate professionals in the region.
              </p>
              <p>
                Hans specializes in helping clients navigate the complexities of international property 
                investment, from legal requirements to financing options, ensuring a smooth and successful 
                property purchase experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Education</h4>
                <p className="text-sm text-muted-foreground">Business Administration</p>
                <p className="text-sm text-muted-foreground">University of Amsterdam</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {["English", "Dutch", "Spanish", "German"].map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Hans
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section
        id="team"
        padding="xl" 
        background="default"
        containerSize="lg"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Expert Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the professionals dedicated to making your Costa del Sol property dreams a reality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Experience</h4>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.languages.map((lang, langIndex) => (
                        <Badge key={langIndex} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Achievements & Certifications */}
      <Section
        id="achievements"
        padding="xl"
        background="muted"
        containerSize="lg"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Excellence & Recognition
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence is recognized by industry peers and valued by our clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">{achievement.title}</h3>
                  <ul className="space-y-3">
                    {achievement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Mission & Values */}
      <Section
        id="mission"
        padding="xl"
        background="default"
        containerSize="lg"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Mission & Values
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide exceptional real estate services that exceed client expectations, 
                  making the dream of owning property in Costa del Sol accessible and enjoyable 
                  for international buyers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Integrity in every transaction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Personalized service approach</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Market expertise and transparency</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Long-term client relationships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
                alt="DelSolPrimeHomes Office in Marbella"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold">Marbella Office</span>
              </div>
              <div className="text-sm text-muted-foreground">Avenida Ricardo Soriano 29</div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        id="about-cta"
        padding="xl"
        background="muted"
        containerSize="lg"
      >
        <div className="text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 p-12 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">
                Ready to Start Your Property Journey?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let our expert team guide you through every step of finding and purchasing 
                your dream property in Costa del Sol. Schedule a consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      </div>
    </StructuredDataProvider>
  );
};

export default About;
