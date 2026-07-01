import { supabase } from "@/integrations/supabase/client";

export type AuditAction = "create" | "update" | "delete";

export async function logAudit(params: {
  action: AuditAction;
  table: string;
  recordId?: string | number | null;
  changes?: Record<string, unknown> | null;
}) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;
    await supabase.from("admin_audit_log").insert({
      user_id: user.id,
      user_email: user.email ?? null,
      action: params.action,
      table_name: params.table,
      record_id: params.recordId != null ? String(params.recordId) : null,
      changes: (params.changes ?? null) as never,
    } as never);
  } catch {
    // best-effort logging
  }
}
