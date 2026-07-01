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
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import ResourceForm from "@/components/admin/ResourceForm";

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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);

  const columns = useMemo(() => (rows[0] ? Object.keys(rows[0]) : []), [rows]);
  const displayColumns = useMemo(() => {
    // Prefer common informative fields first, cap at 6
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

  const load = async () => {
    if (!def) return;
    setLoading(true);
    const sort = def.defaultSort ?? { column: "id", ascending: false };
    const q = supabase
      .from(def.table as never)
      .select("*", { count: "exact" })
      .order(sort.column as never, { ascending: sort.ascending })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
    const { data, count, error } = await q;
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    let list = (data as Record<string, unknown>[]) ?? [];
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((r) =>
        Object.values(r).some((v) => v && String(v).toLowerCase().includes(s)),
      );
    }
    setRows(list);
    setTotal(count ?? 0);
  };

  useEffect(() => {
    setPage(0);
    setSearch("");
  }, [resource]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, page]);

  const handleDelete = async () => {
    if (!def || !deleting) return;
    const { error } = await supabase
      .from(def.table as never)
      .delete()
      .eq("id", deleting.id as never);
    if (error) {
      toast.error(error.message);
      return;
    }
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
          <Input
            placeholder="Search on this page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
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
            {rows
              .filter((r) => {
                if (!search) return true;
                const s = search.toLowerCase();
                return Object.values(r).some((v) => v && String(v).toLowerCase().includes(s));
              })
              .map((r) => (
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

      <Dialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this row?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
