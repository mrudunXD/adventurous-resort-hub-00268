import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Shield, TrendingUp, Users, Target, Award, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AgriShield</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/">
              <Button variant="outline" size="sm">Home</Button>
            </Link>
            <Link to="/onboarding">
              <Button className="bg-primary hover:bg-primary/90" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About AgriShield
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering India's oilseed farmers with AI-driven intelligence and financial protection
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To transform the lives of India's oilseed farmers by providing cutting-edge AI technology 
                    that optimizes crop yields and protects their income through smart price hedging strategies.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Farmer-First Approach</h3>
                      <p className="text-sm text-muted-foreground">
                        Every feature designed with farmer needs at the core
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Data-Driven Decisions</h3>
                      <p className="text-sm text-muted-foreground">
                        Leveraging satellite, weather, and market data for accurate predictions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 mb-4">
                  <Sprout className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Yield Intelligence</h3>
                <p className="text-muted-foreground mb-4">
                  Predict yield potential with precision using advanced AI models trained on weather patterns, 
                  soil health data, and satellite imagery.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Real-time crop health monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Personalized farm advisories
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                    Weather and pest alerts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Forecasting</h3>
                <p className="text-muted-foreground mb-4">
                  Stay ahead with 30 and 90-day price predictions powered by AI analysis of global 
                  and local market trends.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Live mandi price updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Predictive price charts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Market insights explained
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10 mb-4">
                  <Shield className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Hedging</h3>
                <p className="text-muted-foreground mb-4">
                  Protect your income with virtual forward contracts that lock in favorable prices 
                  before harvest.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                    Virtual contract simulation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                    Risk protection tools
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                    FPO partnership support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-primary text-white">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                  <div className="text-white/80">Farmers Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                  <div className="text-white/80">FPOs Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">₹50Cr+</div>
                  <div className="text-white/80">Income Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">25%</div>
                  <div className="text-white/80">Avg. Yield Increase</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using AgriShield to grow smarter and sell safer.
              </p>
              <Link to="/onboarding">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Get Started Today <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;
