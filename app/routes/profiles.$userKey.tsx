import { PageNotFound, TwoContentLayout, UserViewLayout } from '@juki-team/base-ui';
import { jukiApiManager } from '@juki-team/base-ui/settings';
import type { ContentResponse } from '@juki-team/commons';
import { getParamsOfUserKey } from '@juki-team/commons';
import { type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from '~/components/ClientOnly';
import { contentResponse, oneTab } from '~/helpers';
import { get } from '~/helpers/server';
import { useFetcher } from '~/hooks';
import type { UserProfileResponseDTO } from '~/types';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userKey = decodeURIComponent(params.userKey ?? '');
  const { userNickname, userCompanyKey } = getParamsOfUserKey(userKey);

  const baseUrl = process.env.PUBLIC_JUKI_SERVICE_V2_URL || '';

  const profileResponse = await get<ContentResponse<UserProfileResponseDTO>>(
    `${baseUrl}/user/user-key/${userNickname}|${userCompanyKey}/profile`,
    request,
  );

  if (profileResponse.success) {
    return { profile: profileResponse.content };
  }

  return { profile: null };
}

function ProfileViewPage({ profile: fallbackData }: { profile: UserProfileResponseDTO }) {
  const { data, mutate } = useFetcher<ContentResponse<UserProfileResponseDTO>>(
    jukiApiManager.API_V2.user.getProfile({
      params: {
        nickname: fallbackData.nickname,
        companyKey: fallbackData.company?.key,
      },
    }).url,
    { fallbackData: JSON.stringify(contentResponse('fallback data', fallbackData)) },
  );

  const user = data?.success ? data.content : fallbackData;

  return <UserViewLayout user={user} reloadUser={mutate} />;
}

export default function ProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    return (
      <ClientOnly>
        <TwoContentLayout tabs={oneTab(<PageNotFound />)} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileViewPage profile={profile} />
    </ClientOnly>
  );
}
