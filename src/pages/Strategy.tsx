
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Strategy = () => {
  const [strategy, setStrategy] = useState("movingAverage");
  const [paperTrading, setPaperTrading] = useState(true);
  const [riskLevel, setRiskLevel] = useState([50]);
  const { toast } = useToast();

  const handleSaveStrategy = () => {
    toast({
      title: "Strategy saved",
      description: "Your trading strategy has been saved successfully",
    });
  };

  const handleBacktest = () => {
    toast({
      title: "Backtesting initiated",
      description: "The strategy backtesting process has started. Results will be available soon.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Strategy Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Configure Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="strategy">Strategy Type</Label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger id="strategy">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movingAverage">Moving Average Crossover</SelectItem>
                      <SelectItem value="rsi">RSI Strategy</SelectItem>
                      <SelectItem value="macd">MACD Strategy</SelectItem>
                      <SelectItem value="bollingerBands">Bollinger Bands</SelectItem>
                      <SelectItem value="customIndicators">Custom Indicators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {strategy === "movingAverage" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fast-ma">Fast MA Period</Label>
                        <Input id="fast-ma" type="number" defaultValue="9" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="slow-ma">Slow MA Period</Label>
                        <Input id="slow-ma" type="number" defaultValue="21" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="ma-type">MA Type</Label>
                        <Select defaultValue="ema">
                          <SelectTrigger id="ma-type">
                            <SelectValue placeholder="Select MA Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sma">Simple</SelectItem>
                            <SelectItem value="ema">Exponential</SelectItem>
                            <SelectItem value="wma">Weighted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="timeframe">Timeframe</Label>
                        <Select defaultValue="4h">
                          <SelectTrigger id="timeframe">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1m">1 minute</SelectItem>
                            <SelectItem value="5m">5 minutes</SelectItem>
                            <SelectItem value="15m">15 minutes</SelectItem>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="4h">4 hours</SelectItem>
                            <SelectItem value="1d">1 day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Risk Management</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                        <Input id="stop-loss" type="number" defaultValue="2.5" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="take-profit">Take Profit (%)</Label>
                        <Input id="take-profit" type="number" defaultValue="5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="risk-level">Risk Level: {riskLevel}%</Label>
                    </div>
                    <Slider
                      id="risk-level"
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      value={riskLevel}
                      onValueChange={setRiskLevel}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBacktest}>Run Backtest</Button>
                  <Button onClick={handleSaveStrategy}>Save Strategy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Trading Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paper Trading</p>
                  <p className="text-sm text-muted-foreground">Trade with simulated money</p>
                </div>
                <Switch
                  checked={paperTrading}
                  onCheckedChange={setPaperTrading}
                />
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm mb-2">Current Mode:</p>
                <div className={`px-3 py-2 rounded-md ${paperTrading ? "bg-accent/20 text-accent" : "bg-profit/20 text-profit"}`}>
                  {paperTrading ? "Paper Trading (Practice)" : "Live Trading (Real Money)"}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Trading Pairs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>BTC/USDT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>ETH/USDT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span className="text-muted-foreground">SOL/USDT (Disabled)</span>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Edit Trading Pairs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
