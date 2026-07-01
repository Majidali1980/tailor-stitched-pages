import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "ok" | "unauthorized";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        if (active) setState("unauthorized");
        return;
      }
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin" as never,
      });
      if (!active) return;
      if (error || !data) setState("unauthorized");
      else setState("ok");
    };

    check();

    // Re-verify on auth changes (sign out, token refresh, role revoked)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        if (active) setState("unauthorized");
      } else {
        check();
      }
    });

    // Periodic re-check every 5 minutes to catch role revocations
    const interval = setInterval(check, 5 * 60 * 1000);

    return () => {
      active = false;
      sub.subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }
  if (state === "unauthorized") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
