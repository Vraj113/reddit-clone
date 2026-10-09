"use client";

import { useEffect, useState } from "react";

export default function LinkPreview({ link }) {
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!link) return;
    fetch("/api/preview", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("preview failed");
        return res.json();
      })
      .then(setPreviewData)
      .catch(() => setError("Could not load preview."));
  }, [link]);

  if (error) {
    return (
      <a href={link} className="text-sm text-orange-700 underline" target="_blank" rel="noreferrer">
        {link}
      </a>
    );
  }

  if (!previewData) {
    return <div className="h-24 animate-pulse rounded-lg bg-slate-100" />;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
    >
      {previewData.images?.[0] && (
        <img src={previewData.images[0]} alt="" className="max-h-80 w-full object-cover" />
      )}
      <div className="p-3">
        <p className="text-xs text-slate-500">{link}</p>
        {previewData.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-700">{previewData.description}</p>
        )}
      </div>
    </a>
  );
}
