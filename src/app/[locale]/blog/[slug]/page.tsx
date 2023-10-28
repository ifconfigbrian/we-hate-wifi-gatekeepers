import Link from 'next/link';
import { notFound } from 'next/navigation';

import Balancer from 'react-wrap-balancer';
import { allBlogs } from 'contentlayer/generated';
import clsx from 'clsx';

import ViewCounter from '@/components/blog/views-counter';
import { Mdx } from '@/components/blog/mdx';
import env from '@/env.js';

import type { Metadata } from 'next/types';
import { getFormatter, getNow } from 'next-intl/server';

export function generateStaticParams() {
  return allBlogs.map((post) => ({
    locale: post.language,
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata | undefined {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return undefined;
  }

  const {
    title,
    publishedAt: publishedTime,
    readingTime,
    summary: description,
    slug,
    language,
    tags,
  } = post;

  const formattedDate = new Date(publishedTime).toLocaleDateString(
    language === 'de' ? 'de-DE' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  );

  const ogImage = `${
    env.NEXT_PUBLIC_WEBSITE_URL
  }/api/og?title=${title}&header=${formattedDate + ' • ' + readingTime}`;

  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${env.NEXT_PUBLIC_WEBSITE_URL}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const now = await getNow(params.locale);
  const formatter = await getFormatter(params.locale);
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto mb-16 flex w-full max-w-4xl flex-col items-start justify-center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}></script>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="mt-2 flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center">
          <p className="ml-2 text-sm text-gray-700 dark:text-[#c2c2c2]">
            {formatter.dateTime(new Date(post.publishedAt), {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}{' '}
            ({formatter.relativeTime(new Date(post.publishedAt), now)})
          </p>
        </div>
        <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-[#c2c2c2] md:mt-0">
          {post.readingTime}
          {` • `}
          <ViewCounter slug={post.slug} trackView={true} />
        </p>
      </div>
      <div className="mt-2 flex w-full text-xs">
        {post.tags.map((tag) => (
          <Link
            href={`/blog?filter=tag&search=${tag}`}
            key={tag}
            className={clsx(
              'mx-2 mt-1 rounded border border-indigo-500 px-3 py-1 text-indigo-500',
              'hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400',
            )}>
            {tag}
          </Link>
        ))}
      </div>
      <div className="prose prose-neutral mt-4 w-full max-w-none dark:prose-invert">
        <Mdx code={post.body.code} />
      </div>
    </section>
  );
}
