"use client";

import { useState, useTransition } from "react";
import { Trash2, Mail, Phone } from "lucide-react";
import { updateLeadStatus, deleteLead } from "./actions";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  source: string | null;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  createdAt: Date;
};

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-indigo-soft text-indigo",
  contacted: "bg-amber/15 text-amber",
  qualified: "bg-cyan/15 text-cyan",
  won: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  lost: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [pending, startTransition] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (leads.length === 0) {
    return <p className="p-8 text-center text-sm text-ink-soft">No leads yet. They&apos;ll appear here as soon as someone submits the contact form.</p>;
  }

  return (
    <div className="divide-y divide-line">
      {leads.map((lead) => (
        <div key={lead.id} className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <button onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)} className="text-left cursor-pointer">
              <p className="text-sm font-medium text-ink">{lead.name}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                <span className="flex items-center gap-1">
                  <Mail className="size-3" /> {lead.email}
                </span>
                {lead.phone ? (
                  <span className="flex items-center gap-1">
                    <Phone className="size-3" /> {lead.phone}
                  </span>
                ) : null}
                {lead.service ? <span>· {lead.service}</span> : null}
                {lead.source ? <span>· {lead.source}</span> : null}
              </p>
            </button>
            <div className="flex items-center gap-2">
              <select
                value={lead.status}
                disabled={pending}
                onChange={(e) => startTransition(() => updateLeadStatus(lead.id, e.target.value as Lead["status"]))}
                className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none ${STATUS_STYLES[lead.status]}`}
              >
                {(["new", "contacted", "qualified", "won", "lost"] as const).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (confirm(`Delete the lead from ${lead.name}? This can't be undone.`)) {
                    startTransition(() => deleteLead(lead.id));
                  }
                }}
                disabled={pending}
                aria-label="Delete lead"
                className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
          {expandedId === lead.id ? (
            <p className="mt-3 rounded-lg bg-paper-raised p-3 text-sm leading-6 text-ink-soft">{lead.message}</p>
          ) : null}
          <p className="mt-2 text-[11px] text-ink-soft">
            {new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      ))}
    </div>
  );
}
