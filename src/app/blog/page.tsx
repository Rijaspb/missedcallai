import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Advice for UK Tradespeople | MissedCallAI',
  description: 'Free guides and advice for UK plumbers, electricians and sole traders on running a better trade business.',
  alternates: { canonical: 'https://missedcallai.co.uk/blog' },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text) px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-(--color-accent) text-xs font-medium tracking-widest uppercase mb-3">
          Blog
        </p>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-semibold mb-3">
          Advice for UK Tradespeople
        </h1>
        <p className="text-(--color-muted) text-sm mb-12">
          Free guides on running a better trade business.
        </p>

        {posts.length === 0 && (
          <p className="text-(--color-muted) text-sm">Posts coming soon.</p>
        )}

        <div className="space-y-8">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="border-l-2 border-(--color-border) group-hover:border-(--color-accent) pl-5 transition-colors">
                <p className="text-xs text-(--color-muted) mb-1">{post.date}</p>
                <h2 className="font-['Barlow_Condensed'] text-2xl font-semibold group-hover:text-(--color-accent) transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-(--color-muted)">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}