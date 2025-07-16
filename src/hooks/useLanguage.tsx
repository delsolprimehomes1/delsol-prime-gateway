
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  languages: Language[];
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

// Basic translations for key elements
const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.locations': 'Locations',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Find Your Dream Home on the Costa del Sol',
    'hero.subtitle': 'Discover luxury properties in the most prestigious locations of southern Spain',
    'hero.cta': 'Schedule Private Viewing',
    'contact.us': 'Contact Us',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.properties': 'Propiedades',
    'nav.locations': 'Ubicaciones',
    'nav.about': 'Acerca de',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'hero.title': 'Encuentra la Casa de tus Sueños en la Costa del Sol',
    'hero.subtitle': 'Descubre propiedades de lujo en las ubicaciones más prestigiosas del sur de España',
    'hero.cta': 'Programar Visita Privada',
    'contact.us': 'Contáctanos',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.properties': 'Propriétés',
    'nav.locations': 'Emplacements',
    'nav.about': 'À propos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Trouvez la Maison de vos Rêves sur la Costa del Sol',
    'hero.subtitle': 'Découvrez des propriétés de luxe dans les emplacements les plus prestigieux du sud de l\'Espagne',
    'hero.cta': 'Programmer une Visite Privée',
    'contact.us': 'Nous Contacter',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.properties': 'Immobilien',
    'nav.locations': 'Standorte',
    'nav.about': 'Über uns',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'hero.title': 'Finden Sie Ihr Traumhaus an der Costa del Sol',
    'hero.subtitle': 'Entdecken Sie Luxusimmobilien in den prestigeträchtigsten Lagen Südspaniens',
    'hero.cta': 'Private Besichtigung Planen',
    'contact.us': 'Kontakt',
  },
  pt: {
    'nav.home': 'Início',
    'nav.properties': 'Propriedades',
    'nav.locations': 'Localizações',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'hero.title': 'Encontre a Casa dos seus Sonhos na Costa del Sol',
    'hero.subtitle': 'Descubra propriedades de luxo nas localizações mais prestigiosas do sul da Espanha',
    'hero.cta': 'Agendar Visita Privada',
    'contact.us': 'Entre em Contato',
  },
  it: {
    'nav.home': 'Home',
    'nav.properties': 'Proprietà',
    'nav.locations': 'Posizioni',
    'nav.about': 'Chi Siamo',
    'nav.blog': 'Blog',
    'nav.contact': 'Contatto',
    'hero.title': 'Trova la Casa dei tuoi Sogni sulla Costa del Sol',
    'hero.subtitle': 'Scopri proprietà di lusso nelle posizioni più prestigiose del sud della Spagna',
    'hero.cta': 'Programma Visita Privata',
    'contact.us': 'Contattaci',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('preferred-language', code);
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
