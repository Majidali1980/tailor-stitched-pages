import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HIDDEN_ON_CREATE = new Set(["id", "created_at", "updated_at"]);
const READ_ONLY = new Set(["created_at", "updated_at"]);

type FieldKind = "text" | "textarea" | "number" | "boolean" | "datetime" | "json" | "image";

function inferKind(name: string, value: unknown): FieldKind {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (value && typeof value === "object") return "json";
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return "datetime";
  }
  const n = name.toLowerCase();
  if (n.endsWith("_url") || n === "image" || n.endsWith("_image") || n === "image_url" || n === "video_url" || n === "thumbnail" || n.endsWith("_photo"))
    return "image";
  if (n === "description" || n === "content" || n === "body" || n === "message" || n === "notes" || n.endsWith("_html") || n === "answer")
    return "textarea";
  if (n === "price" || n === "amount" || n.endsWith("_price") || n === "quantity" || n === "stock" || n === "display_order" || n === "order" || n.endsWith("_count"))
    return "number";
  if (n.startsWith("is_") || n.startsWith("has_") || n === "active" || n === "published" || n === "featured")
    return "boolean";
  return "text";
}

export default function ResourceForm({
  table,
  sampleRow,
  initial,
  onSaved,
  onCancel,
}: {
  table: string;
  sampleRow: Record<string, unknown> | null;
  initial?: Record<string, unknown> | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const isEdit = !!initial;
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  // Determine field list from sampleRow or initial
  const source = initial || sampleRow || {};
  const fieldNames = Object.keys(source).filter((n) =>
    isEdit ? true : !HIDDEN_ON_CREATE.has(n),
  );

  useEffect(() => {
    if (initial) setValues({ ...initial });
    else {
      const defaults: Record<string, unknown> = {};
      for (const k of fieldNames) {
        const v = (source as Record<string, unknown>)[k];
        defaults[k] = typeof v === "boolean" ? false : "";
      }
      setValues(defaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const setField = (k: string, v: unknown) => setValues((prev) => ({ ...prev, [k]: v }));

  const uploadImage = async (name: string, file: File) => {
    const path = `${table}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("admin-images").upload(path, file, { upsert: true });
    if (error) {
      toast.error(`Upload failed: ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from("admin-images").getPublicUrl(path);
    setField(name, data.publicUrl);
    toast.success("Uploaded");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Normalize values
    const payload: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(values)) {
      if (READ_ONLY.has(k)) continue;
      if (!isEdit && HIDDEN_ON_CREATE.has(k)) continue;
      if (v === "" || v === undefined) {
        payload[k] = null;
        continue;
      }
      const sample = (source as Record<string, unknown>)[k];
      const kind = inferKind(k, sample);
      if (kind === "number" && typeof v === "string") payload[k] = v === "" ? null : Number(v);
      else if (kind === "json" && typeof v === "string") {
        try {
          payload[k] = JSON.parse(v);
        } catch {
          toast.error(`Invalid JSON in ${k}`);
          setSaving(false);
          return;
        }
      } else payload[k] = v;
    }

    let error;
    if (isEdit && initial?.id) {
      ({ error } = await supabase.from(table as never).update(payload as never).eq("id", initial.id as never));
    } else {
      ({ error } = await supabase.from(table as never).insert(payload as never));
    }
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(isEdit ? "Updated" : "Created");
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {fieldNames.map((name) => {
        const sample = (source as Record<string, unknown>)[name];
        const kind = inferKind(name, sample);
        const value = values[name];
        const readOnly = READ_ONLY.has(name) || (isEdit && name === "id");
        return (
          <div key={name} className="space-y-1.5">
            <Label htmlFor={name} className="text-xs uppercase tracking-wide text-muted-foreground">
              {name}
            </Label>
            {kind === "boolean" ? (
              <div className="flex items-center gap-2">
                <Switch
                  id={name}
                  checked={!!value}
                  onCheckedChange={(v) => setField(name, v)}
                  disabled={readOnly}
                />
                <span className="text-sm">{value ? "Yes" : "No"}</span>
              </div>
            ) : kind === "textarea" ? (
              <Textarea
                id={name}
                value={(value as string) ?? ""}
                onChange={(e) => setField(name, e.target.value)}
                rows={5}
                readOnly={readOnly}
              />
            ) : kind === "json" ? (
              <Textarea
                id={name}
                value={typeof value === "string" ? value : JSON.stringify(value ?? null, null, 2)}
                onChange={(e) => setField(name, e.target.value)}
                rows={6}
                className="font-mono text-xs"
                readOnly={readOnly}
              />
            ) : kind === "image" ? (
              <div className="space-y-2">
                <Input
                  id={name}
                  value={(value as string) ?? ""}
                  onChange={(e) => setField(name, e.target.value)}
                  placeholder="https://..."
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(name, f);
                  }}
                />
                {typeof value === "string" && value && (
                  <img src={value} alt="preview" className="h-20 w-20 object-cover rounded border" />
                )}
              </div>
            ) : (
              <Input
                id={name}
                type={kind === "number" ? "number" : kind === "datetime" ? "datetime-local" : "text"}
                value={
                  kind === "datetime" && typeof value === "string" && value
                    ? value.slice(0, 16)
                    : ((value as string) ?? "")
                }
                onChange={(e) => setField(name, e.target.value)}
                readOnly={readOnly}
              />
            )}
          </div>
        );
      })}
      <div className="flex justify-end gap-2 pt-2 sticky bottom-0 bg-background">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Create"}
        </Button>
      </div>
    </form>
  );
}
