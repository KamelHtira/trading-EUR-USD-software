import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, CircleStop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BotControl = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // ✅ Fetch current bot status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/bot/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (res.ok && json.status === 200) {
          setIsActive(json.data?.isRunning || false); // assumes `isRunning` is in the API response
        } else {
          console.warn("Failed to fetch bot status:", json.message);
        }
      } catch (err) {
        console.error("Error fetching bot status:", err);
      }
    };

    fetchStatus();
  }, []);

  const toggleBot = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Token not found in localStorage",
        variant: "destructive",
      });
      return;
    }

    const action = !isActive ? "start" : "stop";
    const url = `http://localhost:3000/bot/${action}`;

    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (res.ok && json.status === 200) {
        setIsActive(!isActive);
        toast({
          title: action === "start" ? "Bot started" : "Bot stopped",
          description: json.message || `Bot ${action}ed successfully`,
          variant: action === "start" ? "default" : "destructive",
        });
      } else {
        throw new Error(json.message || `Failed to ${action} bot`);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || `Could not ${action} bot`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
              />
            </div>
          </div>

          <Button 
            onClick={toggleBot}
            variant={isActive ? "destructive" : "default"}
            className="w-full"
            disabled={isLoading}
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
