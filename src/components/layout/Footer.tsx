
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const services = [
    { label: "Property Search", href: "/properties" },
    { label: "Legal Services", href: "/contact" },
    { label: "Investment Advice", href: "/contact" },
    { label: "Property Management", href: "/contact" },
  ];

  const locations = [
    { label: "Marbella", href: "/locations/marbella" },
    { label: "Puerto Banús", href: "/locations/puerto-banus" },
    { label: "Estepona", href: "/locations/estepona" },
    { label: "Benahavís", href: "/locations/benahavis" },
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
              Your trusted partner for luxury real estate in Costa del Sol. 
              Specializing in premium properties across Marbella, Puerto Banús, 
              and the most sought-after locations.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Costa del Sol, Spain</span>
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
            <h3 className="text-lg font-semibold">Quick Links</h3>
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
            <h3 className="text-lg font-semibold">Services</h3>
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
            <h3 className="text-lg font-semibold">Featured Locations</h3>
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
              <span className="text-sm text-slate-300">Follow us:</span>
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
              <span className="text-sm text-slate-300">Stay updated with our newsletter</span>
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {currentYear} DelSolPrimeHomes. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
