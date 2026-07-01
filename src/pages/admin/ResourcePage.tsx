import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { findResource } from "@/lib/admin/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import ResourceForm from "@/components/admin/ResourceForm";
import { logAudit } from "@/lib/admin/audit";

const PAGE_SIZE = 25;

function formatCell(v: unknown): React.ReactNode {
  if (v === null || v === undefined) return <span className="text-muted-foreground">—</span>;
  if (typeof v === "boolean") return v ? "✓" : "✗";
  if (typeof v === "object") return <code className="text-xs">{JSON.stringify(v).slice(0, 60)}</code>;
  const s = String(v);
  if (/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif|avif)/i.test(s))
    return <img src={s} alt="" className="h-10 w-10 rounded object-cover" />;
  if (/^https?:\/\//.test(s))
    return (
      <a href={s} target="_blank" rel="noreferrer" className="text-primary underline truncate max-w-[240px] inline-block">
        {s}
      </a>
    );
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return new Date(s).toLocaleString();
  return <span className="truncate max-w-[280px] inline-block align-middle">{s}</span>;
}

export default function ResourcePage() {
  const { resource } = useParams<{ resource: string }>();
  const def = resource ? findResource(resource) : undefined;

  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
  const [textColumns, setTextColumns] = useState<string[]>([]);

  const columns = useMemo(() => (rows[0] ? Object.keys(rows[0]) : []), [rows]);
  const displayColumns = useMemo(() => {
    const preferred = ["title", "name", "email", "slug", "status", "price", "created_at"];
    const set = new Set<string>();
    for (const p of preferred) if (columns.includes(p)) set.add(p);
    for (const c of columns) {
      if (set.size >= 6) break;
      if (c === "id") continue;
      set.add(c);
    }
    return Array.from(set);
  }, [columns]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const detectTextColumns = async () => {
    if (!def) return [] as string[];
    const { data } = await supabase.from(def.table as never).select("*").limit(1);
    const row = (data as Record<string, unknown>[] | null)?.[0];
    if (!row) return [];
    return Object.entries(row)
      .filter(([, v]) => typeof v === "string" && !/^https?:\/\//.test(v as string))
      .map(([k]) => k);
  };

  const load = async () => {
    if (!def) return;
    setLoading(true);
    const sort = def.defaultSort ?? { column: "id", ascending: false };
    let cols = textColumns;
    if (search && cols.length === 0) {
      cols = await detectTextColumns();
      setTextColumns(cols);
    }
    let q = supabase
      .from(def.table as never)
      .select("*", { count: "exact" })
      .order(sort.column as never, { ascending: sort.ascending })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (search && cols.length > 0) {
      const orExpr = cols.map((c) => `${c}.ilike.%${search.replace(/[%,]/g, "")}%`).join(",");
      q = q.or(orExpr) as typeof q;
    }

    const { data, count, error } = await q;
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((data as Record<string, unknown>[]) ?? []);
    setTotal(count ?? 0);
  };

  useEffect(() => {
    setPage(0);
    setSearchInput("");
    setSearch("");
    setTextColumns([]);
  }, [resource]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, page, search]);

  const handleDelete = async () => {
    if (!def || !deleting) return;
    const recordId = deleting.id;
    const { error } = await supabase
      .from(def.table as never)
      .delete()
      .eq("id", recordId as never);
    if (error) {
      toast.error(error.message);
      return;
    }
    await logAudit({
      action: "delete",
      table: def.table,
      recordId: recordId as string | number | null,
      changes: deleting,
    });
    toast.success("Deleted");
    setDeleting(null);
    load();
  };

  if (!def) return <div className="p-6">Unknown resource.</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{def.label}</h1>
          <p className="text-sm text-muted-foreground">
            {total} row{total === 1 ? "" : "s"} · table <code>{def.table}</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all text fields..."
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setPage(0); }}
              className="w-64 pl-8"
            />
          </div>
          <Button onClick={() => load()} variant="outline">Refresh</Button>
          <Button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {displayColumns.map((c) => (
                <TableHead key={c}>{c}</TableHead>
              ))}
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={displayColumns.length + 1} className="text-center py-8 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={displayColumns.length + 1} className="text-center py-8 text-muted-foreground">
                  No rows
                </TableCell>
              </TableRow>
            )}
            {rows.map((r) => (
              <TableRow key={String(r.id ?? Math.random())}>
                {displayColumns.map((c) => (
                  <TableCell key={c}>{formatCell(r[c])}</TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditing(r);
                        setOpenForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleting(r)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={(page + 1) * PAGE_SIZE >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "New"} · {def.label}</DialogTitle>
          </DialogHeader>
          <ResourceForm
            table={def.table}
            sampleRow={rows[0] ?? null}
            initial={editing}
            onSaved={() => {
              setOpenForm(false);
              load();
            }}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this row?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the record from <code>{def.table}</code>.
              This action cannot be undone and will be recorded in the audit log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
