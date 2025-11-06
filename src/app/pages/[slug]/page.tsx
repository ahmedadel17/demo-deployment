import axios from 'axios';
import PageBuilder from '../Pagebuilder';
import {getLocale} from 'next-intl/server';
import { notFound } from 'next/navigation';

async function getPageData(slug: string) {
  try {
    const locale = await getLocale();
    console.log('locale', locale);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/core/pages/key/${slug}`, {
      headers: {
        'Accept-Language': locale
      }
    });
    console.log('response', res);
    return res;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

export default async function HomePage({ params }: { params: { slug: string } }) {
  const response = await getPageData(params.slug);
  
  // Handle case where API call failed or returned no data
  if (!response || !response.data || !response.data.data) {
    notFound();
  }

  const { html, css, scripts } = response.data.data;

  // Handle case where required data is missing
  if (!html) {
    notFound();
  }

  return (
    <main>
      <PageBuilder html={html} css={css || ''} scripts={scripts || []} />
    </main>
  );
}