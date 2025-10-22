import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, MapPin, Wheat, User } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    fpoCode: '',
    name: '',
    cropType: '',
    acreage: '',
    soilType: '',
    location: '',
    district: '',
    state: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      toast({
        title: "Welcome to AgriShield! 🌾",
        description: "Your profile has been created successfully.",
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Sprout className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Welcome to AgriShield</CardTitle>
          <CardDescription className="text-lg">
            {step === 1 ? "Let's get started with your details" : "Tell us about your farm"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="fpoCode">FPO Code (Optional)</Label>
                  <Input
                    id="fpoCode"
                    placeholder="Enter your FPO registration code"
                    value={formData.fpoCode}
                    onChange={(e) => setFormData({ ...formData, fpoCode: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    If you're part of a Farmer Producer Organization
                  </p>
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropType" className="flex items-center gap-2">
                      <Wheat className="w-4 h-4" />
                      Crop Type
                    </Label>
                    <Select 
                      value={formData.cropType}
                      onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groundnut">Groundnut</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="mustard">Mustard</SelectItem>
                        <SelectItem value="sunflower">Sunflower</SelectItem>
                        <SelectItem value="safflower">Safflower</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="acreage">Farm Acreage</Label>
                    <Input
                      id="acreage"
                      type="number"
                      placeholder="Area in acres"
                      value={formData.acreage}
                      onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select 
                    value={formData.soilType}
                    onValueChange={(value) => setFormData({ ...formData, soilType: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alluvial">Alluvial</SelectItem>
                      <SelectItem value="black">Black Soil</SelectItem>
                      <SelectItem value="red">Red Soil</SelectItem>
                      <SelectItem value="laterite">Laterite</SelectItem>
                      <SelectItem value="desert">Desert Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Village/Town
                  </Label>
                  <Input
                    id="location"
                    placeholder="Your location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="District"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                {step === 1 ? 'Continue' : 'Complete Setup'}
              </Button>
            </div>
          </form>

          <div className="flex justify-center gap-2 mt-6">
            <div className={`h-2 w-2 rounded-full transition-colors ${step === 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-2 rounded-full transition-colors ${step === 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
