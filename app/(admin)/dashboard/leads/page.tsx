"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function LeadsPage() {
  const inquiries = useQuery(api.inquiriesDb.list);
  const markRead = useMutation(api.inquiriesDb.markRead);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (inquiries === undefined) {
    return <p className="text-muted-foreground text-sm">Loading leads…</p>;
  }

  if (inquiries.length === 0) {
    return <p className="text-muted-foreground text-sm">No leads yet.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Project Type</th>
              <th className="px-4 py-3 text-left font-medium">Budget</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {inquiries.map((inquiry) => {
              const isExpanded = expanded === inquiry._id;
              return (
                <>
                  <tr
                    key={inquiry._id}
                    className={cn(
                      "transition-colors hover:bg-muted/50",
                      inquiry.status === "new" && "font-medium"
                    )}
                  >
                    <td className="px-4 py-3">{inquiry.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{inquiry.projectType}</td>
                    <td className="px-4 py-3">{inquiry.budget}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          inquiry.status === "new"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {inquiry.status === "new" ? "New" : "Read"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(inquiry._creationTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={async () => {
                          if (!isExpanded && inquiry.status === "new") {
                            await markRead({ id: inquiry._id as Id<"inquiries"> });
                          }
                          setExpanded(isExpanded ? null : inquiry._id);
                        }}
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${inquiry._id}-detail`} className="bg-muted/30">
                      <td colSpan={7} className="px-4 py-3">
                        <p className="text-sm whitespace-pre-wrap">{inquiry.details}</p>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
