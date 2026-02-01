import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut, AlertTriangle, Car, ClipboardList, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminIssuesTab from "@/components/admin/AdminIssuesTab";
import AdminParkingTab from "@/components/admin/AdminParkingTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    openIssues: 0,
    pendingBookings: 0,
    resolvedThisWeek: 0,
    approvedThisWeek: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: isAdmin } = await supabase.rpc("is_admin");
      
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      setUser(session.user);
      await loadStats();
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadStats = async () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get open issues count
    const { count: openIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .in("status", ["reported", "acknowledged", "in_progress"]);

    // Get pending bookings count
    const { count: pendingBookings } = await supabase
      .from("parking_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    // Get resolved issues this week
    const { count: resolvedThisWeek } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .in("status", ["resolved", "closed"])
      .gte("updated_at", weekAgo.toISOString());

    // Get approved bookings this week
    const { count: approvedThisWeek } = await supabase
      .from("parking_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
      .gte("updated_at", weekAgo.toISOString());

    setStats({
      openIssues: openIssues || 0,
      pendingBookings: pendingBookings || 0,
      resolvedThisWeek: resolvedThisWeek || 0,
      approvedThisWeek: approvedThisWeek || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Masshouse RTM Admin</h1>
            <p className="text-sm text-primary-foreground/70">Management Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block">{user?.email}</span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open Issues</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                {stats.openIssues}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Bookings</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Car className="h-6 w-6 text-blue-500" />
                {stats.pendingBookings}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Resolved This Week</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-green-500" />
                {stats.resolvedThisWeek}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved This Week</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-500" />
                {stats.approvedThisWeek}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="issues" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger 
                  value="issues" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Issues
                </TabsTrigger>
                <TabsTrigger 
                  value="parking"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <Car className="h-4 w-4 mr-2" />
                  Parking Bookings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="issues" className="p-6">
                <AdminIssuesTab onUpdate={loadStats} />
              </TabsContent>
              <TabsContent value="parking" className="p-6">
                <AdminParkingTab onUpdate={loadStats} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
