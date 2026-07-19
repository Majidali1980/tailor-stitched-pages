import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logAudit } from "@/lib/admin/audit";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HIDDEN_FIELDS = new Set(["id", "created_at", "updated_at"]);
const READ_ONLY = new Set<string>();
const REQUIRED_HINT = new Set(["title", "name", "slug", "email"]);

const IMAGE_SIZE_HINTS: Record<string, string> = {
  hero_section: "Recommended: 1920 × 1080 px (16:9), JPG/WebP, under 500KB",
  carousel: "Recommended: 1600 × 900 px (16:9), JPG/WebP, under 400KB",
  homepage_carousel: "Recommended: 1600 × 900 px (16:9), JPG/WebP, under 400KB",
  bulkorder_carousel: "Recommended: 1600 × 900 px (16:9), JPG/WebP, under 400KB",
  hero_section_services: "Recommended: 1600 × 900 px (16:9), JPG/WebP, under 400KB",
  hero_section_little_stitch: "Recommended: 1600 × 900 px (16:9), JPG/WebP, under 400KB",
  promotional_banners: "Recommended: 1200 × 400 px (3:1), JPG/WebP, under 300KB",
  discount_offers: "Recommended: 1200 × 800 px (3:2), JPG/WebP, under 300KB",
  products: "Recommended: 1000 × 1250 px (4:5 portrait), JPG/WebP, under 300KB",
  gallery: "Recommended: 1000 × 1250 px (4:5 portrait), JPG/WebP, under 300KB",
  latest_designs: "Recommended: 1000 × 1250 px (4:5 portrait), JPG/WebP, under 300KB",
  stitched_dress: "Recommended: 1000 × 1250 px (4:5 portrait), JPG/WebP, under 300KB",
  ai_gallery: "Recommended: 1024 × 1024 px (1:1), JPG/WebP, under 300KB",
  blog: "Recommended: 1200 × 630 px (1.91:1 for social sharing), JPG/WebP, under 300KB",
  brands: "Recommended: 400 × 400 px logo (1:1, transparent PNG preferred)",
  videos: "Thumbnail: 1280 × 720 px (16:9), JPG/WebP, under 300KB",
  reviews: "Recommended: 800 × 800 px (1:1), JPG/WebP, under 200KB",
};

type FieldKind = "text" | "textarea" | "number" | "boolean" | "datetime" | "json" | "image" | "email" | "url";

function inferKind(name: string, value: unknown): FieldKind {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (value && typeof value === "object") return "json";
  const n = name.toLowerCase();
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return "datetime";
  if (n.endsWith("_url") || n === "image" || n.endsWith("_image") || n === "image_url" || n === "video_url" || n === "thumbnail" || n.endsWith("_photo"))
    return "image";
  if (n === "email" || n.endsWith("_email")) return "email";
  if (n === "website" || n === "link" || n === "url") return "url";
  if (n === "description" || n === "content" || n === "body" || n === "message" || n === "notes" || n.endsWith("_html") || n === "answer")
    return "textarea";
  if (n === "price" || n === "amount" || n.endsWith("_price") || n === "quantity" || n === "stock" || n === "display_order" || n === "order" || n.endsWith("_count"))
    return "number";
  if (n.startsWith("is_") || n.startsWith("has_") || n === "active" || n === "published" || n === "featured")
    return "boolean";
  return "text";
}

function buildSchema(fields: { name: string; kind: FieldKind }[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const { name, kind } of fields) {
    const isRequired = REQUIRED_HINT.has(name.toLowerCase());
    let s: z.ZodTypeAny;
    switch (kind) {
      case "email":
        s = z.string().trim().email("Invalid email").max(255);
        break;
      case "url":
      case "image":
        s = z.string().trim().url("Must be a valid URL").max(2048);
        break;
      case "number":
        s = z.preprocess(
          (v) => (v === "" || v == null ? undefined : Number(v)),
          z.number({ invalid_type_error: "Must be a number" }).finite(),
        );
        break;
      case "boolean":
        s = z.boolean();
        break;
      case "datetime":
        s = z.string().min(1, "Required");
        break;
      case "json":
        s = z.any();
        break;
      case "textarea":
        s = z.string().max(20000, "Too long");
        break;
      default:
        s = z.string().trim().max(1000, "Too long");
    }
    if (!isRequired && kind !== "boolean") s = s.optional().nullable();
    shape[name] = s;
  }
  return z.object(shape);
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [galleryCategories, setGalleryCategories] = useState<{ slug: string; label: string }[]>([]);

  useEffect(() => {
    if (table !== "gallery") return;
    supabase
      .from("gallery_categories")
      .select("slug,label,is_active,display_order")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setGalleryCategories(
          (data ?? [])
            .filter((c: any) => c.is_active !== false)
            .map((c: any) => ({ slug: c.slug, label: c.label })),
        );
      });
  }, [table]);

  const source = initial || sampleRow || {};
  const fieldNames = Object.keys(source).filter((n) => !HIDDEN_FIELDS.has(n));

  const fieldMeta = useMemo(
    () => fieldNames.map((n) => ({ name: n, kind: inferKind(n, (source as Record<string, unknown>)[n]) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fieldNames.join(",")],
  );
  const schema = useMemo(() => buildSchema(fieldMeta.filter((f) => !READ_ONLY.has(f.name) && f.name !== "id")), [fieldMeta]);

  useEffect(() => {
    if (initial) setValues({ ...initial });
    else {
      const defaults: Record<string, unknown> = {};
      for (const { name, kind } of fieldMeta) {
        defaults[name] = kind === "boolean" ? false : "";
      }
      setValues(defaults);
    }
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const setField = (k: string, v: unknown) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const uploadImage = async (name: string, file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
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

    // Normalize + validate
    const payload: Record<string, unknown> = {};
    for (const { name, kind } of fieldMeta) {
      if (READ_ONLY.has(name) || (isEdit && name === "id")) continue;
      if (HIDDEN_FIELDS.has(name)) continue;
      const v = values[name];
      if ((v === "" || v === undefined || v === null) && kind !== "boolean") {
        payload[name] = null;
        continue;
      }
      if (kind === "number") payload[name] = typeof v === "string" ? Number(v) : v;
      else if (kind === "json") {
        if (typeof v === "string") {
          try { payload[name] = JSON.parse(v); }
          catch { setErrors((p) => ({ ...p, [name]: "Invalid JSON" })); setSaving(false); return; }
        } else payload[name] = v;
      } else payload[name] = v;
    }

    const parsed = schema.safeParse({ ...values, ...payload });
    if (!parsed.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !newErrors[key]) newErrors[key] = issue.message;
      }
      setErrors(newErrors);
      setSaving(false);
      toast.error("Please fix the highlighted fields");
      return;
    }

    let error;
    let recordId: unknown = initial?.id;
    if (isEdit && initial?.id) {
      ({ error } = await supabase.from(table as never).update(payload as never).eq("id", initial.id as never));
    } else {
      const res = await supabase.from(table as never).insert(payload as never).select().single();
      error = res.error;
      recordId = (res.data as { id?: unknown } | null)?.id ?? null;
    }
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await logAudit({
      action: isEdit ? "update" : "create",
      table,
      recordId: recordId as string | number | null,
      changes: payload,
    });
    toast.success(isEdit ? "Updated" : "Created");
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {fieldMeta.map(({ name, kind }) => {
        const value = values[name];
        const readOnly = READ_ONLY.has(name) || (isEdit && name === "id");
        const err = errors[name];
        const isRequired = REQUIRED_HINT.has(name.toLowerCase());
        return (
          <div key={name} className="space-y-1.5">
            <Label htmlFor={name} className="text-xs uppercase tracking-wide text-muted-foreground">
              {name}{isRequired && <span className="text-destructive ml-0.5">*</span>}
            </Label>
            {kind === "boolean" ? (
              <div className="flex items-center gap-2">
                <Switch id={name} checked={!!value} onCheckedChange={(v) => setField(name, v)} disabled={readOnly} />
                <span className="text-sm">{value ? "Yes" : "No"}</span>
              </div>
            ) : kind === "textarea" ? (
              <Textarea id={name} value={(value as string) ?? ""} onChange={(e) => setField(name, e.target.value)} rows={5} readOnly={readOnly} aria-invalid={!!err} />
            ) : kind === "json" ? (
              <Textarea id={name} value={typeof value === "string" ? value : JSON.stringify(value ?? null, null, 2)} onChange={(e) => setField(name, e.target.value)} rows={6} className="font-mono text-xs" readOnly={readOnly} aria-invalid={!!err} />
            ) : kind === "image" ? (
              <div className="space-y-2">
                <Input id={name} value={(value as string) ?? ""} onChange={(e) => setField(name, e.target.value)} placeholder="https://..." aria-invalid={!!err} />
                <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(name, f); }} />
                {IMAGE_SIZE_HINTS[table] && (
                  <p className="text-xs text-muted-foreground">💡 {IMAGE_SIZE_HINTS[table]}</p>
                )}
                {typeof value === "string" && value && (
                  <img src={value} alt="preview" className="h-20 w-20 object-cover rounded border" />
                )}
              </div>
            ) : (
              <Input
                id={name}
                type={kind === "number" ? "number" : kind === "datetime" ? "datetime-local" : kind === "email" ? "email" : kind === "url" ? "url" : "text"}
                value={kind === "datetime" && typeof value === "string" && value ? value.slice(0, 16) : ((value as string) ?? "")}
                onChange={(e) => setField(name, e.target.value)}
                readOnly={readOnly}
                aria-invalid={!!err}
              />
            )}
            {err && <p className="text-xs text-destructive">{err}</p>}
          </div>
        );
      })}
      <div className="flex justify-end gap-2 pt-2 sticky bottom-0 bg-background">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : isEdit ? "Save changes" : "Create"}</Button>
      </div>
    </form>
  );
}
