import { PageNotFound, TwoContentLayout, UserViewLayout } from '@juki-team/base-ui';
import { jukiApiManager } from '@juki-team/base-ui/settings';
import { getParamsOfUserKey } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from '~/components/ClientOnly';
import { contentResponse, oneTab } from '~/helpers';
import { get } from '~/helpers/server';
import { useFetcher } from '~/hooks';
import type { UserProfileResponseDto } from '~/types';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userKey = decodeURIComponent(params.userKey ?? '');
  const { userNickname, userOrganizationKey } = getParamsOfUserKey(userKey);

  const baseUrl = process.env.PUBLIC_JUKI_SERVICE_V2_URL || '';

  const profileResponse = await get<ContentResponse<UserProfileResponseDto>>(
    `${baseUrl}/user/user-key/${userNickname}|${userOrganizationKey}/profile`,
    request,
  );

  if (profileResponse.success) {
    return { profile: profileResponse.content };
  }

  return { profile: null };
}

function ProfileViewPage({ profile: fallbackData }: { profile: UserProfileResponseDto }) {
  const { data, mutate } = useFetcher<ContentResponse<UserProfileResponseDto>>(
    jukiApiManager.apiV2.user.getProfile({
      params: {
        nickname: fallbackData.nickname,
        organizationKey: fallbackData.organization?.key,
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
