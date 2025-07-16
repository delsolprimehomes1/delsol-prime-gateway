
import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  variant?: 'default' | 'navigation';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'default', 
  className 
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
    { code: 'nl', name: t('languages.nl'), flag: '🇳🇱' },
    { code: 'zh', name: t('languages.zh'), flag: '🇨🇳' },
    { code: 'hi', name: t('languages.hi'), flag: '🇮🇳' },
    { code: 'ar', name: t('languages.ar'), flag: '🇸🇦' },
    { code: 'pt', name: t('languages.pt'), flag: '🇵🇹' },
    { code: 'fr', name: t('languages.fr'), flag: '🇫🇷' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === 'navigation' ? 'ghost' : 'outline'}
          size="sm"
          className={cn(
            "flex items-center gap-2 min-w-[120px]",
            variant === 'navigation' && "text-white hover:bg-white/10",
            className
          )}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">
            {currentLang?.flag} {currentLang?.name}
          </span>
          <span className="sm:hidden">
            {currentLang?.flag}
          </span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-md border border-border/50 min-w-[160px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={cn(
              "flex items-center gap-3 cursor-pointer",
              currentLanguage === language.code && "bg-primary/10 text-primary font-medium"
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
