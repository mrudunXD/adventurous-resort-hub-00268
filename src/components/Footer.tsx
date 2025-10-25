import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast({
        title: t('footer.newsletter.toast.errorTitle'),
        description: t('footer.newsletter.toast.errorDescription'),
        variant: "destructive"
      });
      return;
    }

    // Show success notification
    toast({
      title: t('footer.newsletter.toast.successTitle'),
      description: t('footer.newsletter.toast.successDescription'),
      variant: "default"
    });

    // Reset form and show dialog
    setEmail("");
    setIsSubscribed(true);
  };
  return <>
      <footer className="bg-accent text-accent-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 px-4">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-display font-semibold">{t('footer.resortName')}</h3>
              <p className="text-accent-foreground/80 max-w-xs">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125" aria-label={t('footer.socialAria.instagram')}>
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125" aria-label={t('footer.socialAria.facebook')}>
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125" aria-label={t('footer.socialAria.twitter')}>
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-200">
              <h4 className="text-lg font-display font-semibold">{t('footer.quickLinks.title')}</h4>
              <ul className="space-y-2">
                {[{
                  key: 'about',
                  path: '/about'
                }, {
                  key: 'accommodation',
                  path: '/accommodation'
                }, {
                  key: 'activities',
                  path: '/activities'
                }, {
                  key: 'gallery',
                  path: '/gallery'
                }, {
                  key: 'contact',
                  path: '/contact'
                }].map(link => (
                  <li key={link.key}>
                    <Link to={link.path} className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 inline-block py-1 link-underline">
                      {t(`footer.quickLinks.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-400">
              <h4 className="text-lg font-display font-semibold">{t('footer.contact.title')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <span className="text-accent-foreground/80">
                    {t('footer.contact.address')}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="flex-shrink-0" />
                  <div className="flex flex-col">
                    <a href="https://wa.me/918277385225?text=Hi!%20I'm%20interested%20in%20booking%20an%20adventure%20at%20Dandeli." target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300">
                      {t('footer.contact.primaryPhone')}
                    </a>
                    <a href="tel:+917795601255" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300">
                      {t('footer.contact.secondaryPhone')}
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="flex-shrink-0" />
                  <span className="text-accent-foreground/80 text-base">{t('footer.contact.email')}</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-600">
              <h4 className="text-lg font-display font-semibold">{t('footer.newsletter.title')}</h4>
              <p className="text-accent-foreground/80 mx-0 my-0 px-0 py-0 rounded-lg">
                {t('footer.newsletter.description')}
              </p>
              <form className="mt-4 space-y-3" onSubmit={handleSubscribe}>
                <input type="email" placeholder={t('footer.newsletter.emailPlaceholder')} className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-accent-foreground focus:outline-none focus:ring-2 focus:ring-white/30" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className="w-full px-4 py-2 rounded-md text-accent font-medium transition-all duration-300 hover:scale-105 bg-gray-900 hover:bg-gray-800">
                  {t('footer.newsletter.submit')}
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 py-6 px-4 text-center text-accent-foreground/70">
            <p>{t('footer.copyright', { year: currentYear })}</p>
          </div>
        </div>
      </footer>

      {/* Subscription Success Dialog */}
      <Dialog open={isSubscribed} onOpenChange={setIsSubscribed}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">{t('footer.newsletter.dialog.title')}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scale-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-center mb-2">{t('footer.newsletter.dialog.heading')}</h3>
            <p className="text-center text-muted-foreground">
              {t('footer.newsletter.dialog.body')}
            </p>
            <button onClick={() => setIsSubscribed(false)} className="mt-6 px-6 py-2 rounded-md bg-accent text-accent-foreground font-medium transition-all duration-300 hover:bg-accent/90 hover:scale-105">
              {t('footer.newsletter.dialog.close')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Footer;