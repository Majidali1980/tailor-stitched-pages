import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RequireAdmin from "@/components/admin/RequireAdmin";
import AdminDashboard from "./admin/Dashboard";
import ResourcePage from "./admin/ResourcePage";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

function AdminShell() {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };
  return (
    <SidebarProvider>
      <div className="admin-scope min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 border-b flex items-center justify-between px-2">
            <SidebarTrigger />
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </header>
          <div className="flex-1 min-w-0">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path=":resource" element={<ResourcePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function Admin() {
  return (
    <RequireAdmin>
      <AdminShell />
    </RequireAdmin>
  );
}
