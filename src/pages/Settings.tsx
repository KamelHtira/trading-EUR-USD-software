
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoStart, setAutoStart] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your trading bot preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="default-pair">Default Trading Pair</Label>
                  <Select defaultValue="btc-usdt">
                    <SelectTrigger id="default-pair">
                      <SelectValue placeholder="Select trading pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                      <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                      <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="default-timeframe">Default Timeframe</Label>
                  <Select defaultValue="4h">
                    <SelectTrigger id="default-timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5m">5 minutes</SelectItem>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="1d">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autostart">Auto-start on Boot</Label>
                  <p className="text-sm text-muted-foreground">Automatically start the trading bot when the application loads</p>
                </div>
                <Switch 
                  id="autostart" 
                  checked={autoStart}
                  onCheckedChange={setAutoStart}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="max-trades">Maximum Concurrent Trades</Label>
                <Input id="max-trades" type="number" defaultValue="5" />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Configure exchange API keys for trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exchange" className="mb-2">Exchange</Label>
                  <Select defaultValue="binance">
                    <SelectTrigger id="exchange">
                      <SelectValue placeholder="Select exchange" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binance">Binance</SelectItem>
                      <SelectItem value="coinbase">Coinbase</SelectItem>
                      <SelectItem value="kucoin">KuCoin</SelectItem>
                      <SelectItem value="ftx">FTX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter your API key" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" type="password" placeholder="Enter your API secret" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Trading</Label>
                    <p className="text-sm text-muted-foreground">Allow the bot to execute real trades</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive trade alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about important bot activities</p>
                </div>
                <Switch 
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              {notificationsEnabled && (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Trade Executed</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Error Alerts</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Signal Alerts</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Performance Reports</Label>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Browser Notifications</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Telegram Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts via Telegram</p>
                        </div>
                        <Switch 
                          checked={telegramEnabled}
                          onCheckedChange={setTelegramEnabled}
                        />
                      </div>
                      
                      {telegramEnabled && (
                        <div className="grid gap-2 pl-6 border-l-2 border-primary">
                          <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                          <Input id="telegram-token" placeholder="Enter your bot token" />
                          
                          <Label htmlFor="telegram-chat" className="mt-2">Chat ID</Label>
                          <Input id="telegram-chat" placeholder="Enter your chat ID" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your trading interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col gap-2 bg-sidebar border-primary">
                    <span>Dark</span>
                    <div className="w-full h-2 bg-primary rounded"></div>
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex flex-col gap-2 bg-white text-black border-muted">
                    <span className="text-black">Light</span>
                    <div className="w-full h-2 bg-accent rounded"></div>
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex flex-col gap-2 bg-gradient-to-b from-sidebar to-background">
                    <span>System</span>
                    <div className="w-full h-2 bg-muted rounded"></div>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="chart-style">Chart Style</Label>
                    <Select defaultValue="candles">
                      <SelectTrigger id="chart-style">
                        <SelectValue placeholder="Select chart style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candles">Candlestick</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                        <SelectItem value="bars">OHLC Bars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
