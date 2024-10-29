import { count, sum } from 'drizzle-orm'; //counting & summing values in db
import { getTranslations } from 'next-intl/server';  //translations
import { redirect } from 'next/navigation'; //redirecting users

import env from '@/env.mjs'; //load environment variables
import Metric from '@/components/metric'; //showing metrics
import { SignOutButton } from '@/components/sign-out';
import Track from '@/components/track';
import { auth } from '@/lib/auth';  //handling authentication
import { getBlogPosts } from '@/lib/blog'; //retrieve blog posts
import { db } from '@/lib/db';  //database connection
import { guestbook, views } from '@/lib/db/schema'; //database schemas for guestbook entries
import { getTopTracks } from '@/lib/spotify'; //fetch my spotify top tracks

import type { Metadata } from 'next/types';

//define shape of props
interface DashboardProps {
  params: {
    locale: string;
  };
}

//prepare static parameters for different locales

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

//generate metadata
export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard',
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=Dashboard`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=Dashboard`],
    },
  };
}

//fetch views count
const getViewsCount = async () => {
  const data = await db
    .select({
      total: sum(views.count),
    })
    .from(views)
    .execute();

  return data[0]?.total ?? 0;
};

//fetch guestbook entries
const getGuestbookEntriesCount = async () => {
  const data = await db
    .select({
      total: count(guestbook.id),
    })
    .from(guestbook)
    .execute();

  return data[0]?.total ?? 0;
};

//main dashboard component
const DashboardPage = async ({ params: { locale } }: DashboardProps) => {
  const [session, t, viewsCount, guesbookEntriesCount, topTracks] =
    await Promise.all([
      auth(),
      getTranslations({ locale, namespace: 'dashboard' }),
      getViewsCount(),
      getGuestbookEntriesCount(),
      getTopTracks(),
    ]);

  //redirect unauthorised users
  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  //render the dashboard
  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        Dashboard
      </h1>
      <p className="mb-2">
        {t('logged-in')} {session.user?.email} (
        <SignOutButton />)
      </p>
      <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <h2 className="mt-3 text-xl font-bold sm:col-span-2">{t('stats')}</h2>
        <Metric title={t('metrics.blog-views')}>{viewsCount}</Metric>
        <Metric title={t('metrics.posts-count')}>
          {getBlogPosts().filter((x) => x.language === locale)?.length}
        </Metric>
        <Metric title={t('metrics.guestbook-entries')}>
          {guesbookEntriesCount}
        </Metric>
      </div>
      <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
        {t('top-tracks')}
      </h2>
      {topTracks.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </div>
  );
};

export default DashboardPage;
