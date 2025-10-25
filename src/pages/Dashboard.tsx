import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Bot, MessageCircle, Sparkles } from 'lucide-react';
import SakhiExperience from '@/components/sakhi/SakhiExperience';
import { 
  Sprout, 
  TrendingUp, 
  Shield, 
  Cloud, 
  Droplets, 
  ThermometerSun,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Leaf
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [sakhiOpen, setSakhiOpen] = useState(false);
  const yieldStatus = { good: 60, moderate: 30, critical: 10 };
  const todayWeather = { temp: 28, rain: 40, condition: t('dashboard.days.mon') };
  const currentPrice = 5200;
  const priceChange = 3.2;
  const hedgeRecommendation = 40;

  const greetingName = useMemo(() => {
    if (!user?.firstName) return '';
    return user.firstName.split(' ')[0];
  }, [user?.firstName]);

  return (
    <div className="space-y-10 animate-fade-in">
      <section className="rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> {t('dashboard.aiBadge')}
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
                {t('dashboard.welcome')}{greetingName ? ` ${greetingName}` : ''}
              </h1>
              <p className="text-muted-foreground text-base">
                {t('dashboard.welcomeDescription')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" onClick={() => setSakhiOpen(true)}>
                <MessageCircle className="h-5 w-5" /> {t('dashboard.openSakhi')}
              </Button>
              <Link to="/market-forecast">
                <Button variant="outline" size="lg" className="gap-2">
                  <TrendingUp className="h-4 w-4" /> {t('dashboard.marketForecastTitle')}
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                {
                  icon: <Shield className="h-4 w-4 text-primary" />,
                  label: t('dashboard.hedgeStatus'),
                  value: `${hedgeRecommendation}%`,
                  note: t('dashboard.recommendedHedge')
                },
                {
                  icon: <TrendingUp className="h-4 w-4 text-success" />,
                  label: t('dashboard.currentPrice'),
                  value: `₹${currentPrice}`,
                  note: `+${priceChange}% ${t('dashboard.priceChange')}`
                },
                {
                  icon: <ThermometerSun className="h-4 w-4 text-accent" />,
                  label: t('dashboard.weather'),
                  value: `${todayWeather.temp}°C`,
                  note: `${todayWeather.rain}% • ${todayWeather.condition}`
                }
              ].map((highlight, index) => (
                <div key={index} className="rounded-2xl border border-border/50 bg-secondary/40 p-4 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {highlight.icon}
                    {highlight.label}
                  </div>
                  <div className="text-2xl font-semibold text-primary">{highlight.value}</div>
                  <p className="text-xs text-muted-foreground">{highlight.note}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="w-full md:w-80 bg-primary/5 border-primary/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-5 w-5 text-primary" />
                {t('dashboard.sakhiAssistantTitle')}
              </CardTitle>
              <CardDescription>{t('dashboard.sakhiAssistantDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('dashboard.sakhiStatusLabel')}</span>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {sakhiOpen ? t('dashboard.sakhiActive') : t('dashboard.sakhiInactive')}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-primary/40 bg-white/40 dark:bg-primary/10 px-3 py-2">
                <div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.toggleSakhi')}</p>
                  <p className="text-sm font-medium">{sakhiOpen ? t('dashboard.sakhiActive') : t('dashboard.sakhiInactive')}</p>
                </div>
                <Switch checked={sakhiOpen} onCheckedChange={setSakhiOpen} aria-label={t('dashboard.toggleSakhi')} />
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span>{t('dashboard.sakhiPanelDescription')}</span>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setSakhiOpen(true)}>
                  {t('dashboard.sakhiPanelTitle')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Sheet open={sakhiOpen} onOpenChange={setSakhiOpen}>
        <SheetContent side="right" className="w-full max-w-3xl p-0 border-l border-border/40 bg-background">
          <div className="flex h-full flex-col">
            <SheetHeader className="px-6 py-4 border-b bg-card/60">
              <SheetTitle className="flex items-center gap-2 text-xl">
                <Bot className="h-5 w-5 text-primary" />
                {t('dashboard.sakhiPanelTitle')}
              </SheetTitle>
              <SheetDescription>{t('dashboard.sakhiPanelDescription')}</SheetDescription>
            </SheetHeader>
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <SakhiExperience embedded />
            </div>
            <SheetFooter className="px-6 py-4 border-t bg-card/60 justify-between">
              <p className="text-xs text-muted-foreground max-w-xs">
                {t('dashboard.sakhiDisclaimer')}
              </p>
              <SheetClose asChild>
                <Button variant="outline">{t('common.close')}</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="soft-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.yieldPotential')}</CardTitle>
            <Sprout className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{t('dashboard.good')}</div>
            <p className="text-xs text-muted-foreground">85% {t('dashboard.yieldTarget')}</p>
          </CardContent>
        </Card>

        <Card className="soft-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.currentPrice')}</CardTitle>
            <TrendingUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{currentPrice}</div>
            <p className="text-xs text-success">+{priceChange}% {t('dashboard.priceChange')}</p>
          </CardContent>
        </Card>

        <Card className="soft-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.weather')}</CardTitle>
            <Cloud className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayWeather.temp}°C</div>
            <p className="text-xs text-muted-foreground">{todayWeather.condition}</p>
          </CardContent>
        </Card>

        <Card className="soft-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.hedgeStatus')}</CardTitle>
            <Shield className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hedgeRecommendation}%</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.recommendedHedge')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="soft-card hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  {t('dashboard.yieldIntelligenceTitle')}
                </CardTitle>
                <CardDescription>{t('dashboard.yieldIntelligenceDesc')}</CardDescription>
              </div>
              <Link to="/yield-intelligence">
                <Button variant="ghost" size="sm">
                  {t('common.viewDetails')} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {t('dashboard.goodPlots')}
                </span>
                <span className="font-medium">{yieldStatus.good}%</span>
              </div>
              <Progress
                value={yieldStatus.good}
                className="h-2 bg-emerald-100 dark:bg-emerald-950/40"
                indicatorClassName="bg-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  {t('dashboard.moderatePlots')}
                </span>
                <span className="font-medium">{yieldStatus.moderate}%</span>
              </div>
              <Progress
                value={yieldStatus.moderate}
                className="h-2 bg-amber-100 dark:bg-amber-950/40"
                indicatorClassName="bg-amber-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  {t('dashboard.criticalPlots')}
                </span>
                <span className="font-medium">{yieldStatus.critical}%</span>
              </div>
              <Progress
                value={yieldStatus.critical}
                className="h-2 bg-rose-100 dark:bg-rose-950/40"
                indicatorClassName="bg-rose-500"
              />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">{t('dashboard.todayAdvisories')}</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm p-2 bg-primary/5 rounded">
                  <Droplets className="w-4 h-4 text-primary mt-0.5" />
                  <span>{t('dashboard.irrigationRecommended')}</span>
                </div>
                <div className="flex items-start gap-2 text-sm p-2 bg-warning/5 rounded">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                  <span>{t('dashboard.pestRiskHigh')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-card hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {t('dashboard.marketForecastTitle')}
                </CardTitle>
                <CardDescription>{t('dashboard.marketForecastDesc')}</CardDescription>
              </div>
              <Link to="/market-forecast">
                <Button variant="ghost" size="sm">
                  {t('common.viewDetails')} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-success/10 to-primary/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('dashboard.currentMandiPrice')}</span>
                <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                  {t('dashboard.trendingUp')}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-primary">₹{currentPrice}/{t('dashboard.quintal')}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {t('dashboard.expectedRange')}: ₹5,100 - ₹5,400 ({t('dashboard.nextDays')})
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">{t('dashboard.aiPriceInsights')}</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm p-2 bg-success/5 rounded">
                  <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                  <span>{t('dashboard.favorableMonsoon')}</span>
                </div>
                <div className="flex items-start gap-2 text-sm p-2 bg-primary/5 rounded">
                  <BarChart3 className="w-4 h-4 text-primary mt-0.5" />
                  <span>{t('dashboard.globalShortage')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="soft-card hover-lift border border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {t('dashboard.smartHedging')}
              </CardTitle>
              <CardDescription>{t('dashboard.smartHedgingDesc')}</CardDescription>
            </div>
            <Link to="/hedging">
              <Button className="bg-primary hover:bg-primary/90">
                {t('dashboard.startHedging')}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-background rounded-xl border border-border/40">
              <div className="text-2xl font-bold text-primary mb-1">{hedgeRecommendation}%</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.recommendedToHedge')}</div>
            </div>
            <div className="text-center p-4 bg-background rounded-xl border border-border/40">
              <div className="text-2xl font-bold text-primary mb-1">₹5,150</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.suggestedLockPrice')}</div>
            </div>
            <div className="text-center p-4 bg-background rounded-xl border border-border/40">
              <div className="text-2xl font-bold text-primary mb-1">60 {t('dashboard.days.mon')}</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.untilHarvest')}</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-background rounded-xl border border-primary/30">
            <p className="text-sm">
              <strong>{t('dashboard.whyHedgeNow')}</strong> {t('dashboard.whyHedgeText')}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="soft-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            {t('dashboard.weatherForecast')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { key: 'mon', label: t('dashboard.days.mon') },
              { key: 'tue', label: t('dashboard.days.tue') },
              { key: 'wed', label: t('dashboard.days.wed') },
              { key: 'thu', label: t('dashboard.days.thu') },
              { key: 'fri', label: t('dashboard.days.fri') },
              { key: 'sat', label: t('dashboard.days.sat') },
              { key: 'sun', label: t('dashboard.days.sun') }
            ].map((day, idx) => (
              <div key={day.key} className="text-center p-3 bg-secondary/40 rounded-xl border border-border/40 transition-colors hover:border-primary/40">
                <div className="text-sm font-medium mb-2">{day.label}</div>
                <Cloud className="w-6 h-6 mx-auto text-accent mb-2" />
                <div className="text-sm font-bold">{28 + idx}°C</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <Droplets className="w-3 h-3" />
                  {40 + idx * 5}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
