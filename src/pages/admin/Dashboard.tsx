import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RESOURCES } from "@/lib/admin/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    (async () => {
      const results = await Promise.all(
        RESOURCES.map(async (r) => {
          const { count } = await supabase
            .from(r.table as never)
            .select("*", { count: "exact", head: true });
          return [r.key, count ?? null] as const;
        }),
      );
      setCounts(Object.fromEntries(results));
    })();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Row counts across all tables.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {RESOURCES.map((r) => (
          <Link key={r.key} to={`/admin/${r.key}`}>
            <Card className="hover:border-primary transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium">
                  {r.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {counts[r.key] ?? "—"}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
