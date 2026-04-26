'use client'
import { useState } from 'react'

export default function SummaryCell({ summary }: { summary: string | null }) {
  const [open, setOpen] = useState(false)
  const text = summary ?? 'No summary recorded'

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left line-clamp-2 text-(--color-muted) hover:text-white transition-colors cursor-pointer"
      >
        {text}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-(--color-bg) border border-white/10 rounded-2xl p-6 w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-black uppercase text-lg mb-4">
              Call <span className="text-(--color-accent)">Summary</span>
            </h3>
            <p className="text-(--color-muted) text-sm leading-relaxed whitespace-pre-wrap">
              {text}
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-3 text-sm border border-white/10 rounded-lg hover:border-white/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}