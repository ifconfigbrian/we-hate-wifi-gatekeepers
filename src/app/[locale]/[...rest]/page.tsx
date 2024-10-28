import { notFound } from 'next/navigation';

// This page is necessary for the not found page to work
// redirects users to the 404 page
export default function CatchAllPage() {
  notFound();
}
