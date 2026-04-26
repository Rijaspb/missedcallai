import { getPost, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getPost(slug)
  return {
    title: `${meta.title} | MissedCallAI`,
    description: meta.description,
    alternates: { canonical: `https://missedcallai.co.uk/blog/${slug}` },
  }
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  let post
  try {
    post = getPost(slug)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text) px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs text-(--color-muted) mb-2">{post.meta.date}</p>
        <h1 className="font-['Barlow_Condensed'] text-4xl font-semibold mb-4">
          {post.meta.title}
        </h1>
        <p className="text-(--color-muted) text-sm mb-10 pb-10 border-b border-(--color-border)">
          {post.meta.description}
        </p>
        <article className="prose prose-invert prose-orange max-w-none text-sm leading-relaxed">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </main>
  )
}