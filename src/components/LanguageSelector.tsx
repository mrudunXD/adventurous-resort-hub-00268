import { useEffect } from "react";
import { Languages } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

const LanguageSelector = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  
  const selectedLanguage = user?.preferredLanguage || i18n.language || "en";
  const currentLanguage = languages.find((l) => l.code === selectedLanguage);

  useEffect(() => {
    if (user?.preferredLanguage && i18n.language !== user.preferredLanguage) {
      i18n.changeLanguage(user.preferredLanguage);
    }
  }, [user?.preferredLanguage, i18n]);

  const mutation = useMutation({
    mutationFn: async (language: string) => {
      return apiRequest("/api/user/language", {
        method: "POST",
        body: JSON.stringify({ language }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: t('language.languageUpdated'),
        description: t('language.languageSaved'),
      });
    },
    onError: (error) => {
      toast({
        title: t('language.error'),
        description: t('language.errorUpdating'),
        variant: "destructive",
      });
      console.error("Error updating language:", error);
    },
  });

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    mutation.mutate(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          data-testid="button-language-selector"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden md:inline text-sm">
            {currentLanguage?.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t('language.selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <DropdownMenuRadioItem
              key={language.code}
              value={language.code}
              data-testid={`language-option-${language.code}`}
            >
              <span className="flex items-center gap-2">
                <span>{language.nativeName}</span>
                {language.code !== "en" && (
                  <span className="text-xs text-muted-foreground">
                    ({language.name})
                  </span>
                )}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
