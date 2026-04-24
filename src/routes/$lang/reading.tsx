import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, Search, Terminal, X } from "lucide-react";
import { getReadingList, getAllTags } from "@/lib/readingList";
import type { ReadingEntry } from "@/lib/readingList";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/content";

export const Route = createFileRoute("/$lang/reading")({
  component: ReadingPage,
});

type SortKey = "newest" | "oldest" | "az";

function ReadingPage() {
  const { lang } = Route.useParams();
  const { t } = useLanguage();
  const r = t.reading;
  const entries = useMemo(() => getReadingList(), []);
  const allTags = useMemo(() => getAllTags(entries), [entries]);

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = entries;

    if (activeTag) {
      result = result.filter((e) => e.tags.includes(activeTag));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.authors.toLowerCase().includes(q) ||
          e.notes.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return [...result].sort((a, b) => {
      if (sort === "newest") return b.year - a.year;
      if (sort === "oldest") return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }, [entries, activeTag, query, sort]);

  function toggleExpand(url: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setActiveTag(null);
  }

  const hasFilters = query.trim() !== "" || activeTag !== null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/$lang"
            params={{ lang: lang as Language }}
            className="group relative flex items-center gap-2 font-mono text-sm tracking-tight"
          >
            <span
              className="pointer-events-none absolute bottom-[-20px] left-1/2 h-20 w-32 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, oklch(0.696 0.17 162.48 / 0.25) 0%, transparent 70%)",
              }}
            />
            <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald/10 text-emerald">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-silver">
              sunil <span className="text-emerald">pandith</span>
            </span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-silver-dim">
            {r.breadcrumb}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Page title */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{r.sectionLabel}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-silver">
            {r.heading}
          </h1>
          <p className="mt-2 text-sm text-silver-dim">{r.description}</p>
        </div>

        {/* Search + sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-silver-dim" />
            <input
              type="text"
              placeholder={r.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-9 font-mono text-xs text-silver placeholder:text-silver-dim/50 focus:border-emerald/40 focus:outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-dim hover:text-silver"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-silver-dim">{r.sortLabel}</span>
            {(["newest", "oldest", "az"] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`rounded px-2.5 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
                  sort === s
                    ? "bg-emerald/10 text-emerald"
                    : "text-silver-dim hover:text-silver"
                }`}
              >
                {s === "newest" ? r.sortNewest : s === "oldest" ? r.sortOldest : r.sortAz}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tag strip — sits above entries, hidden on lg+ where sidebar takes over */}
        <div className="lg:hidden -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
              activeTag === null
                ? "border-emerald/60 bg-emerald/10 text-emerald"
                : "border-border text-silver-dim"
            }`}
          >
            {r.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
                activeTag === tag
                  ? "border-emerald/60 bg-emerald/10 text-emerald"
                  : "border-border text-silver-dim"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Tag sidebar — desktop only */}
          <aside className="hidden w-44 shrink-0 lg:block">
            <div className="sticky top-24 flex flex-col" style={{ maxHeight: "calc(100vh - 7rem)" }}>
              <p className="mb-3 shrink-0 font-mono text-[10px] uppercase tracking-widest text-silver-dim">
                {r.topics}
              </p>
              <div className="scrollbar-theme flex flex-col gap-0.5 overflow-y-auto pr-1">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`flex items-center justify-between rounded px-2 py-1.5 text-left font-mono text-xs transition-colors ${
                    activeTag === null
                      ? "bg-emerald/10 text-emerald"
                      : "text-silver-dim hover:bg-surface hover:text-silver"
                  }`}
                >
                  <span>{r.all}</span>
                  <span className="tabular-nums">{entries.length}</span>
                </button>
                {allTags.map((tag) => {
                  const count = entries.filter((e) => e.tags.includes(tag)).length;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                      className={`flex items-center justify-between rounded px-2 py-1.5 text-left font-mono text-xs transition-colors ${
                        activeTag === tag
                          ? "bg-emerald/10 text-emerald"
                          : "text-silver-dim hover:bg-surface hover:text-silver"
                      }`}
                    >
                      <span className="truncate">{tag}</span>
                      <span className="ml-2 shrink-0 tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Entry list */}
          <div className="min-w-0 flex-1">
            {/* Count + clear */}
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-silver-dim">
                {filtered.length === entries.length
                  ? r.entriesAll(entries.length)
                  : r.entriesFiltered(filtered.length, entries.length)}
              </span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 font-mono text-xs text-silver-dim hover:text-emerald"
                >
                  <X className="h-3 w-3" />
                  {r.clear}
                </button>
              )}
            </div>

            <div className="divide-y divide-border/50">
              {filtered.map((entry) => (
                <EntryRow
                  key={entry.url}
                  entry={entry}
                  expanded={expanded.has(entry.url)}
                  onToggleExpand={() => toggleExpand(entry.url)}
                  onTagClick={(tag) => setActiveTag(tag === activeTag ? null : tag)}
                  activeTag={activeTag}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-mono text-sm text-silver-dim">{r.noResults}</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 font-mono text-xs text-emerald hover:underline"
                >
                  {r.clearFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EntryRow({
  entry,
  expanded,
  onToggleExpand,
  onTagClick,
  activeTag,
}: {
  entry: ReadingEntry;
  expanded: boolean;
  onToggleExpand: () => void;
  onTagClick: (tag: string) => void;
  activeTag: string | null;
}) {
  const hasNotes = entry.notes.trim().length > 0;

  return (
    <div className="group py-3">
      <div className="flex items-start gap-3">
        {/* Expand toggle (only if there are notes) */}
        <button
          onClick={onToggleExpand}
          disabled={!hasNotes}
          className={`mt-0.5 shrink-0 transition-colors ${hasNotes ? "text-silver-dim hover:text-emerald" : "cursor-default text-transparent"}`}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-silver hover:text-emerald"
              >
                <span className="truncate">{entry.title}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
              </a>
              <p className="mt-0.5 font-mono text-[11px] text-silver-dim">
                {entry.authors} · {entry.year}
              </p>
            </div>
          </div>

          {/* Notes (expandable) */}
          {hasNotes && expanded && (
            <p className="mt-2 text-sm leading-relaxed text-silver-dim">{entry.notes}</p>
          )}

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {entry.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  activeTag === tag
                    ? "bg-emerald/15 text-emerald"
                    : "text-silver-dim hover:text-silver"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
