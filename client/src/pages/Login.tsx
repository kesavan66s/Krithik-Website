import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      // Don't redirect here - let the auth state update first
      // The useEffect will handle redirect once isAuthenticated becomes true
      setIsLoading(false);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kdrama-sakura/20 via-kdrama-lavender/20 to-kdrama-sky/20 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-kdrama-sakura/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-kdrama-lavender/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-kdrama-sky/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-kdrama-thread/20 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-12 h-12 text-kdrama-thread fill-kdrama-thread" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-kdrama-thread rounded-full animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="font-myeongjo text-3xl text-kdrama-ink">
            紅線日記
          </CardTitle>
          <CardDescription className="font-noto text-base">
            Red String of Fate Journal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-noto">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
                data-testid="input-username"
                className="font-noto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-noto">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                data-testid="input-password"
                className="font-noto"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-noto"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground font-noto">
            Please login to access the journal. Contact admin for account access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
