import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Shield, TrendingUp, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { toast } from "@/hooks/use-toast";

const Hedging = () => {
  const [hedgePercentage, setHedgePercentage] = useState([40]);
  const [quantity, setQuantity] = useState('');
  const [lockPrice, setLockPrice] = useState('5150');

  const expectedYield = 80; // quintals
  const currentPrice = 5200;
  const recommendedHedge = 40;

  const handleCreateHedge = () => {
    toast({
      title: "Hedge Contract Created! 🛡️",
      description: `${hedgePercentage[0]}% of your yield locked at ₹${lockPrice}/quintal`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Smart Hedging Hub</h1>
          <p className="text-muted-foreground">Protect your income with virtual forward contracts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Create Virtual Contract
              </CardTitle>
              <CardDescription>Lock in today's favorable prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Hedge Percentage: {hedgePercentage[0]}%</Label>
                <Slider value={hedgePercentage} onValueChange={setHedgePercentage} max={100} step={5} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Hedging {hedgePercentage[0]}% = {(expectedYield * hedgePercentage[0] / 100).toFixed(1)} quintals
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lock Price (₹/quintal)</Label>
                  <Input value={lockPrice} onChange={(e) => setLockPrice(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label>Delivery Window</Label>
                  <Input value="60 days" disabled className="mt-1" />
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-2">Hedge Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-semibold">{(expectedYield * hedgePercentage[0] / 100).toFixed(1)} Q</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Locked Revenue:</span>
                    <span className="font-semibold">₹{((expectedYield * hedgePercentage[0] / 100) * parseInt(lockPrice)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protection Level:</span>
                    <Badge variant="outline" className="bg-success/20 text-success">Strong</Badge>
                  </div>
                </div>
              </div>

              <Button onClick={handleCreateHedge} className="w-full bg-primary hover:bg-primary/90">
                <Shield className="w-4 h-4 mr-2" />
                Create Hedge Contract
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="hover-lift border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">AI Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-primary mb-2">{recommendedHedge}%</div>
                  <p className="text-sm text-muted-foreground">Optimal hedge percentage</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span>Prices near seasonal high</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span>Good demand outlook</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                    <span>Moderate price volatility expected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Risk vs Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Price Risk</span>
                      <span className="font-medium">{100 - hedgePercentage[0]}%</span>
                    </div>
                    <div className="h-2 bg-destructive/20 rounded-full overflow-hidden">
                      <div className="h-full bg-destructive" style={{ width: `${100 - hedgePercentage[0]}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Income Stability</span>
                      <span className="font-medium">{hedgePercentage[0]}%</span>
                    </div>
                    <div className="h-2 bg-success/20 rounded-full overflow-hidden">
                      <div className="h-full bg-success" style={{ width: `${hedgePercentage[0]}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Hedging;
