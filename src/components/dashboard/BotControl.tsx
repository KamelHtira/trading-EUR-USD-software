
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, CircleStop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BotControl = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const toggleBot = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    toast({
      title: newState ? "Bot started" : "Bot stopped",
      description: newState ? "Trading bot is now active" : "Trading bot has been deactivated",
      variant: newState ? "default" : "destructive",
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Trading Bot Control</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Status</div>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isActive ? "bg-profit animate-pulse-glow" : "bg-loss"}`}></div>
                <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="bot-active" className="text-sm">Activate Bot</Label>
              <Switch
                id="bot-active"
                checked={isActive}
                onCheckedChange={toggleBot}
              />
            </div>
          </div>

          <Button 
            onClick={toggleBot}
            variant={isActive ? "destructive" : "default"}
            className="w-full"
          >
            {isActive ? (
              <><CircleStop size={18} className="mr-2" /> Stop Bot</>
            ) : (
              <><Play size={18} className="mr-2" /> Start Bot</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotControl;
