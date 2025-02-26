import type { MetaFunction } from '@remix-run/node';
import { CompetitionResults } from '~/components';
import data2015Div2 from '~/data/2015-1-div2.json';
import data2015Div1 from '~/data/2015-2-div1.json';
import data2015Nacional from '~/data/2015-3-nacional.json';
import data2015Latino from '~/data/2015-4-latino.json';
import dataUsers from '~/data/users.json';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="" style={{ overflow: 'auto', height: '100%' }}>
      <CompetitionResults competition={data2015Div2} users={dataUsers.users} />
      <CompetitionResults competition={data2015Div1} users={dataUsers.users} />
      <CompetitionResults competition={data2015Nacional} users={dataUsers.users} />
      <CompetitionResults competition={data2015Latino} users={dataUsers.users} />
    </div>
  );
}
