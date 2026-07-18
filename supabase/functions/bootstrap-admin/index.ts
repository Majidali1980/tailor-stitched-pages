// One-time admin bootstrap. Delete after use.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const { email, password, secret } = await req.json();
  if (secret !== "matailor-bootstrap-2026") return new Response("Forbidden", { status: 403 });

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Try create; if exists, look up.
  let userId: string | null = null;
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.data.user) {
    userId = created.data.user.id;
  } else {
    // find existing
    const list = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const found = list.data.users.find((u) => u.email === email);
    if (!found) return new Response(JSON.stringify({ error: created.error?.message }), { status: 400 });
    userId = found.id;
    await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
  }

  const { error: roleErr } = await admin
    .from("user_roles")
    .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

  return new Response(
    JSON.stringify({ userId, roleError: roleErr?.message ?? null }),
    { headers: { "Content-Type": "application/json" } },
  );
});
