import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, Globe, Info, MapPin } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

const MarketForecast = () => {
  const priceData = [
    { month: 'Jan', price: 4800 },
    { month: 'Feb', price: 4950 },
    { month: 'Mar', price: 5100 },
    { month: 'Apr', price: 5200 },
    { month: 'May', price: 5350 },
    { month: 'Jun', price: 5180 },
  ];

  const mandiPrices = [
    { mandi: 'Ahmedabad', price: 5200, change: 3.2, trend: 'up' },
    { mandi: 'Rajkot', price: 5150, change: 2.8, trend: 'up' },
    { mandi: 'Mumbai', price: 5280, change: 4.1, trend: 'up' },
    { mandi: 'Pune', price: 5190, change: 1.9, trend: 'up' },
    { mandi: 'Indore', price: 5120, change: -0.5, trend: 'down' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Market & Price Forecast</h1>
          <p className="text-muted-foreground">Live prices and AI-powered predictions for informed decisions</p>
        </div>

        {/* Current Price Highlight */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center md:text-left">
                <div className="text-sm text-muted-foreground mb-1">Current Mandi Price</div>
                <div className="text-4xl font-bold text-primary mb-2">₹5,200</div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2% this week
                  </Badge>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">30-Day Forecast</div>
                <div className="text-2xl font-bold text-primary mb-1">₹5,100 - ₹5,400</div>
                <div className="text-xs text-muted-foreground">Expected range</div>
              </div>
              
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">90-Day Forecast</div>
                <div className="text-2xl font-bold text-primary mb-1">₹5,300 - ₹5,800</div>
                <div className="text-xs text-muted-foreground">Bullish trend expected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="forecast" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecast">Price Forecast</TabsTrigger>
            <TabsTrigger value="mandis">Mandi Prices</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  6-Month Price Trend
                </CardTitle>
                <CardDescription>Historical and projected prices per quintal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {priceData.map((data, idx) => {
                    const maxPrice = 5500;
                    const height = (data.price / maxPrice) * 100;
                    return (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-primary">₹{data.price}</div>
                        <div
                          className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                            idx < 4 ? 'bg-primary/70' : 'bg-accent/70'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-muted-foreground">{data.month}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary/70" />
                    <span>Historical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-accent/70" />
                    <span>Forecast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">Price Drivers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Good Monsoon</p>
                      <p className="text-xs text-muted-foreground">
                        Above-average rainfall increasing demand for oilseeds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg">
                    <Globe className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Global Supply Shortage</p>
                      <p className="text-xs text-muted-foreground">
                        International soybean shortfall pushing prices up
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Import Competition</p>
                      <p className="text-xs text-muted-foreground">
                        Cheaper palm oil imports may moderate price growth
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">Key Market Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">Global Benchmark</span>
                    <div className="text-right">
                      <div className="font-semibold">$485/MT</div>
                      <div className="text-xs text-success">+2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">Import Duty</span>
                    <div className="text-right">
                      <div className="font-semibold">30%</div>
                      <div className="text-xs text-muted-foreground">Unchanged</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">MSP (2024-25)</span>
                    <div className="text-right">
                      <div className="font-semibold">₹5,800/Q</div>
                      <div className="text-xs text-success">+6.5%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-sm">Stock-to-Use Ratio</span>
                    <div className="text-right">
                      <div className="font-semibold">28%</div>
                      <div className="text-xs text-warning">Below avg</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mandis" className="space-y-4">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Mandi Prices
                </CardTitle>
                <CardDescription>Updated today at 10:00 AM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mandiPrices.map((mandi) => (
                    <div
                      key={mandi.mandi}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{mandi.mandi}</div>
                          <div className="text-xs text-muted-foreground">Agricultural Market</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{mandi.price}</div>
                        <Badge
                          variant="outline"
                          className={mandi.trend === 'up' 
                            ? 'bg-success/20 text-success border-success/30' 
                            : 'bg-destructive/20 text-destructive border-destructive/30'}
                        >
                          {mandi.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(mandi.change)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Price Variation Notice</p>
                    <p className="text-muted-foreground">
                      Prices vary across mandis due to local demand, quality standards, and transportation costs. 
                      Consider nearby mandis with better prices when planning your sale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card className="hover-lift border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  AI Market Analysis
                </CardTitle>
                <CardDescription>Why prices might rise or fall</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Bullish Factors (Supporting Price Rise)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">•</span>
                      <span><strong>Monsoon Performance:</strong> Above-normal rainfall (108% of average) has increased kharif sowing, driving up oilseed demand by 12%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">•</span>
                      <span><strong>Global Supply Crunch:</strong> Argentina's drought reduced soybean output by 18%, tightening global supply and pushing prices up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">•</span>
                      <span><strong>Strong Export Demand:</strong> Indian groundnut exports to China increased 25% YoY, supporting domestic prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-1">•</span>
                      <span><strong>Government Support:</strong> MSP raised by 6.5% and procurement operations active in major states</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-warning/10 rounded-lg border-l-4 border-warning">
                  <h4 className="font-semibold text-warning mb-2 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Bearish Factors (Risks to Consider)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-warning mt-1">•</span>
                      <span><strong>Import Competition:</strong> Palm oil imports at 15-month high, offering cheaper alternative to domestic oilseeds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning mt-1">•</span>
                      <span><strong>Currency Risk:</strong> Rupee appreciation could make imports more attractive, pressuring local prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning mt-1">•</span>
                      <span><strong>Harvest Pressure:</strong> Peak arrivals in 8-10 weeks may temporarily soften prices by 3-5%</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-primary mb-2">AI Recommendation</h4>
                  <p className="text-sm mb-3">
                    Based on current market dynamics, prices are expected to remain in the ₹5,100-5,400 range for the next 30 days, 
                    with a slight upward bias. Consider hedging 40-50% of your expected yield now to lock in favorable prices.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span>Confidence Level: 78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MarketForecast;
