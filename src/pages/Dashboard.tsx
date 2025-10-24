import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

const Dashboard = () => {
  const { t } = useTranslation();
  const yieldStatus = { good: 60, moderate: 30, critical: 10 };
  const todayWeather = { temp: 28, rain: 40, condition: t('dashboard.days.mon') };
  const currentPrice = 5200;
  const priceChange = 3.2;
  const hedgeRecommendation = 40;

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-2">{t('dashboard.welcome')} 🌾</h1>
          <p className="text-muted-foreground">{t('dashboard.welcomeDescription')}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.yieldPotential')}</CardTitle>
              <Sprout className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{t('dashboard.good')}</div>
              <p className="text-xs text-muted-foreground">85% {t('dashboard.yieldTarget')}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.currentPrice')}</CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentPrice}</div>
              <p className="text-xs text-success">+{priceChange}% {t('dashboard.priceChange')}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.weather')}</CardTitle>
              <Cloud className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayWeather.temp}°C</div>
              <p className="text-xs text-muted-foreground">{todayWeather.condition}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.hedgeStatus')}</CardTitle>
              <Shield className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hedgeRecommendation}%</div>
              <p className="text-xs text-muted-foreground">{t('dashboard.recommendedHedge')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yield Intelligence Card */}
          <Card className="hover-lift">
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
                <Progress value={yieldStatus.good} className="h-2 bg-success/20" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    {t('dashboard.moderatePlots')}
                  </span>
                  <span className="font-medium">{yieldStatus.moderate}%</span>
                </div>
                <Progress value={yieldStatus.moderate} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    {t('dashboard.criticalPlots')}
                  </span>
                  <span className="font-medium">{yieldStatus.critical}%</span>
                </div>
                <Progress value={yieldStatus.critical} className="h-2 bg-destructive/20" />
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

          {/* Price Forecast Card */}
          <Card className="hover-lift">
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

        {/* Hedging Recommendation */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 hover-lift">
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
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{hedgeRecommendation}%</div>
                <div className="text-sm text-muted-foreground">{t('dashboard.recommendedToHedge')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">₹5,150</div>
                <div className="text-sm text-muted-foreground">{t('dashboard.suggestedLockPrice')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">60 {t('dashboard.days.mon')}</div>
                <div className="text-sm text-muted-foreground">{t('dashboard.untilHarvest')}</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded border-l-4 border-primary">
              <p className="text-sm">
                <strong>{t('dashboard.whyHedgeNow')}</strong> {t('dashboard.whyHedgeText')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weather Forecast */}
        <Card className="hover-lift">
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
                <div key={day.key} className="text-center p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
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
