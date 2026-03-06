import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { CompetitionResults } from '~/components';
import type { Competition } from '~/types';

export const meta: MetaFunction = () => [{ title: 'Contests' }];

const modules = import.meta.glob('../data/**/*.ts') as Record<string, () => Promise<{ default: Competition }>>;

function getAvailableYears(): number[] {
  const years = new Set<number>();
  for (const filePath of Object.keys(modules)) {
    const match = filePath.match(/\/(\d{4})\//);
    if (match) years.add(Number(match[1]));
  }
  return [...years].sort((a, b) => b - a);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const years = getAvailableYears();
  const url = new URL(request.url);
  const selectedYear = Number(url.searchParams.get('year')) || years[0];

  const yearEntries = Object.entries(modules)
    .filter(([p]) => p.includes(`/${selectedYear}/`))
    .sort(([a], [b]) => a.localeCompare(b));

  const competitions = await Promise.all(yearEntries.map(([, load]) => load().then((m) => m.default)));

  return { years, selectedYear, competitions };
}

export default function Contests() {
  const { years, selectedYear, competitions } = useLoaderData<typeof loader>();

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <div className="year-selector">
        {years.map((year) => (
          <Link key={year} to={`?year=${year}`} className={`year-btn${year === selectedYear ? ' active' : ''}`}>
            {year}
          </Link>
        ))}
      </div>
      {competitions.map((competition, i) => (
        <CompetitionResults key={i} competition={competition} />
      ))}
    </div>
  );
}