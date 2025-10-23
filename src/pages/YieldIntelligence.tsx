import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin, 
  Droplets, 
  Bug, 
  Sprout, 
  ThermometerSun,
  Cloud,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Leaf
} from 'lucide-react';

const YieldIntelligence = () => {
  const [irrigationLevel, setIrrigationLevel] = useState([60]);
  const [fertilizerLevel, setFertilizerLevel] = useState([75]);

  const plots = [
    { id: 'A', name: 'North Field', status: 'good', yield: 85, area: 5, soil: 68 },
    { id: 'B', name: 'East Field', status: 'moderate', yield: 72, area: 3, soil: 55 },
    { id: 'C', name: 'South Field', status: 'good', yield: 90, area: 4, soil: 75 },
    { id: 'D', name: 'West Field', status: 'critical', yield: 45, area: 2, soil: 35 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-success/20 text-success border-success/30';
      case 'moderate': return 'bg-warning/20 text-warning border-warning/30';
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">AI Yield Intelligence</h1>
            <p className="text-muted-foreground">Real-time monitoring and personalized advisories</p>
          </div>
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            View Satellite Map
          </Button>
        </div>

        {/* Interactive Map Visualization */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Farm Plot Overview
            </CardTitle>
            <CardDescription>Real-time yield potential across your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {plots.map((plot) => (
                <div
                  key={plot.id}
                  className="p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all"
                  style={{
                    borderColor: plot.status === 'good' ? 'hsl(var(--success))' :
                                plot.status === 'moderate' ? 'hsl(var(--warning))' :
                                'hsl(var(--destructive))'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Plot {plot.id}</h3>
                    <Badge variant="outline" className={getStatusColor(plot.status)}>
                      {getStatusIcon(plot.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{plot.name}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Yield Potential:</span>
                      <span className="font-semibold">{plot.yield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Area:</span>
                      <span className="font-semibold">{plot.area} acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Soil Health:</span>
                      <span className="font-semibold">{plot.soil}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="advisories" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="advisories">Advisories</TabsTrigger>
            <TabsTrigger value="weather">Weather & Soil</TabsTrigger>
            <TabsTrigger value="simulator">Yield Simulator</TabsTrigger>
          </TabsList>

          <TabsContent value="advisories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-primary" />
                    Irrigation Advisory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium mb-2">Immediate Action Required</p>
                    <p className="text-sm text-muted-foreground">
                      Plot D soil moisture at 35%. Irrigate within 24 hours to prevent yield loss.
                    </p>
                  </div>
                  <div className="p-3 bg-success/5 rounded-lg">
                    <p className="text-sm font-medium mb-2">Optimal Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      Plots A, B, C: Next irrigation recommended in 3-4 days based on weather forecast.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bug className="w-5 h-5 text-warning" />
                    Pest Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-warning/5 rounded-lg border-l-4 border-warning">
                    <p className="text-sm font-medium mb-2">High Risk Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Aphid infestation risk high in eastern plots. Apply neem-based spray preventively.
                    </p>
                  </div>
                  <div className="p-3 bg-success/5 rounded-lg">
                    <p className="text-sm font-medium mb-2">Overall Status</p>
                    <p className="text-sm text-muted-foreground">
                      No active infestations detected. Continue monitoring.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-primary" />
                    Crop Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leaf Health Index</span>
                      <span className="font-semibold text-success">Excellent (92%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-semibold text-success">On Track</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nutrient Levels</span>
                      <span className="font-semibold text-warning">Moderate</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2 border-t">
                    Consider foliar spray of micronutrients for optimal growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    Seed Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium mb-2">For Next Season</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on your soil type and climate patterns:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Variety: TMV-7 (drought resistant)</li>
                      <li>Expected yield: 18-22 quintals/acre</li>
                      <li>Maturity: 110-115 days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-primary" />
                    Weather Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <ThermometerSun className="w-6 h-6 mx-auto text-warning mb-2" />
                      <div className="text-2xl font-bold">28°C</div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <Droplets className="w-6 h-6 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold">65%</div>
                      <div className="text-xs text-muted-foreground">Humidity</div>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <Cloud className="w-6 h-6 mx-auto text-accent mb-2" />
                      <div className="text-2xl font-bold">40%</div>
                      <div className="text-xs text-muted-foreground">Rain Chance</div>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm">
                      <strong>7-day outlook:</strong> Moderate temperatures with scattered showers expected. Good conditions for crop growth.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    Soil Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nitrogen (N)</span>
                      <Badge variant="outline" className="bg-success/20 text-success">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phosphorus (P)</span>
                      <Badge variant="outline" className="bg-warning/20 text-warning">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Potassium (K)</span>
                      <Badge variant="outline" className="bg-success/20 text-success">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">pH Level</span>
                      <Badge variant="outline" className="bg-success/20 text-success">6.5 (Optimal)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organic Matter</span>
                      <Badge variant="outline" className="bg-warning/20 text-warning">2.8%</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-warning/5 rounded-lg border-l-4 border-warning mt-3">
                    <p className="text-sm">
                      <strong>Recommendation:</strong> Apply DAP fertilizer to boost phosphorus levels.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Yield Simulation Tool
                </CardTitle>
                <CardDescription>Test "what if" scenarios to optimize your yield</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-medium">Irrigation Frequency</Label>
                      <span className="text-sm text-muted-foreground">{irrigationLevel[0]}%</span>
                    </div>
                    <Slider
                      value={irrigationLevel}
                      onValueChange={setIrrigationLevel}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Current: Every 5 days | Optimal: Every 4 days
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-medium">Fertilizer Application</Label>
                      <span className="text-sm text-muted-foreground">{fertilizerLevel[0]}%</span>
                    </div>
                    <Slider
                      value={fertilizerLevel}
                      onValueChange={setFertilizerLevel}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Current: 150 kg/acre | Recommended: 180 kg/acre
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="p-4 bg-secondary/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Current Projection</div>
                    <div className="text-2xl font-bold text-primary">16 Q/acre</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center border-2 border-primary">
                    <div className="text-sm text-muted-foreground mb-1">Optimized Projection</div>
                    <div className="text-2xl font-bold text-primary">19.5 Q/acre</div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Potential Gain</div>
                    <div className="text-2xl font-bold text-success">+21.8%</div>
                  </div>
                </div>

                <div className="p-4 bg-accent/5 rounded-lg">
                  <p className="text-sm">
                    <strong>AI Insight:</strong> By optimizing irrigation to every 4 days and increasing fertilizer application by 20%, you can potentially increase yield by 3.5 quintals per acre, resulting in ₹18,200 additional revenue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

// Simple Label component
const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <label className={className}>{children}</label>
);

export default YieldIntelligence;
