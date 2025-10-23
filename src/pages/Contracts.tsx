import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

const Contracts: React.FC = () => {
  const contracts = [
    {
      id: "HC-2024-001",
      crop: "Mustard",
      quantity: "2.5 tons",
      lockedPrice: "₹6,500/quintal",
      currentPrice: "₹6,200/quintal",
      status: "active",
      deliveryDate: "2024-03-15",
      buyer: "Sunrise Oils FPO",
      savings: "₹7,500"
    },
    {
      id: "HC-2024-002",
      crop: "Sunflower",
      quantity: "1.8 tons",
      lockedPrice: "₹5,800/quintal",
      currentPrice: "₹6,100/quintal",
      status: "completed",
      deliveryDate: "2024-02-20",
      buyer: "GreenFields Cooperative",
      savings: "-₹5,400"
    },
    {
      id: "HC-2024-003",
      crop: "Soybean",
      quantity: "3.0 tons",
      lockedPrice: "₹4,200/quintal",
      currentPrice: "₹4,000/quintal",
      status: "pending",
      deliveryDate: "2024-04-10",
      buyer: "AgriTrade Solutions",
      savings: "₹6,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Contracts</h1>
          <p className="text-muted-foreground mt-1">Track your hedging contracts and settlements</p>
        </div>
        <Button className="bg-primary">
          <FileText className="w-4 h-4 mr-2" />
          New Contract
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-xs text-muted-foreground">Successfully settled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹45,200</div>
            <p className="text-xs text-muted-foreground">From hedging</p>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{contract.crop}</CardTitle>
                    <Badge className={`${getStatusColor(contract.status)} text-white`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(contract.status)}
                        {contract.status}
                      </span>
                    </Badge>
                  </div>
                  <CardDescription>Contract ID: {contract.id}</CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${parseFloat(contract.savings.replace(/[₹,]/g, '')) > 0 ? 'text-success' : 'text-destructive'}`}>
                    {contract.savings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {parseFloat(contract.savings.replace(/[₹,]/g, '')) > 0 ? 'Saved' : 'Loss'}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Quantity</div>
                  <div className="font-semibold">{contract.quantity}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Locked Price</div>
                  <div className="font-semibold text-primary">{contract.lockedPrice}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                  <div className="font-semibold">{contract.currentPrice}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Delivery Date</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(contract.deliveryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Buyer: <span className="font-medium text-foreground">{contract.buyer}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contracts;
