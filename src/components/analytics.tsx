'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const AnalyticsWrapper = () => {
  // Only render analytics in production environment
  if (process.env.NODE_ENV !== 'production') {
    return <></>;
  }

  return (
    <>
      {/* Load the analytics script asynchronously */}
      <Script
        async
        defer
        data-website-id=""
        src=""
      />
      {/* Render the analytics and speed insights components */}
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default AnalyticsWrapper;
