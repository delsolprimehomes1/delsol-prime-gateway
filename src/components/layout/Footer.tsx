
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('nav.properties'), href: "/properties" },
    { label: t('nav.locations'), href: "/locations" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.blog'), href: "/blog" },
    { label: t('faq.title'), href: "/faq" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  const services = [
    { label: t('footer.servicesLinks.propertySearch'), href: "/properties" },
    { label: t('footer.servicesLinks.legalServices'), href: "/contact" },
    { label: t('footer.servicesLinks.investmentAdvice'), href: "/contact" },
    { label: t('footer.servicesLinks.propertyManagement'), href: "/contact" },
  ];

  const locations = [
    { label: t('footer.featuredLocationsLinks.marbella'), href: "/locations/marbella" },
    { label: t('footer.featuredLocationsLinks.puertoBAnus'), href: "/locations/puerto-banus" },
    { label: t('footer.featuredLocationsLinks.estepona'), href: "/locations/estepona" },
    { label: t('footer.featuredLocationsLinks.benahavis'), href: "/locations/benahavis" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-display bg-gradient-premium bg-clip-text text-transparent">
              DelSolPrimeHomes
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Costa Del Sol, Spain</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-primary" />
                <span>+34 952 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@delsolprimehomes.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.featuredLocations')}</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.label}>
                  <a
                    href={location.href}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    {location.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">{t('footer.followUs')}</span>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-primary">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-primary">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-primary">
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-sm text-slate-300">{t('footer.newsletter')}</span>
              <Button variant="hero" size="sm">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {currentYear} {t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </a>
              <a href="/cookies" className="hover:text-primary transition-colors">
                {t('footer.cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
