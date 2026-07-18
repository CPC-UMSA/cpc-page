import { getAuthorizedRequest } from '@juki-team/base-ui/helpers';
import type { ContentResponse, ContentsResponse, ErrorResponse } from '@juki-team/commons';
import { cleanRequest, ErrorCode, HEADER_JUKI_FORWARDED_HOST } from '@juki-team/commons';

export const get = async <T extends ContentResponse<unknown> | ContentsResponse<unknown>>(
  url: string,
  request: Request,
): Promise<T | ErrorResponse> => {
  try {
    const host = request.headers.get('host') || '';
    const protocol = request.headers.get('x-forwarded-proto') ?? 'https';
    const origin = `${protocol}://${host}`;
    const cookie = request.headers.get('cookie') || '';
    const customHeaders = {
      origin,
      referer: `${origin}/`,
      [HEADER_JUKI_FORWARDED_HOST]: host,
      Cookie: cookie,
    };
    return cleanRequest<T>(await getAuthorizedRequest(encodeURI(url), { headers: customHeaders }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message,
      errors: [{ code: ErrorCode.INTERNAL_SERVER_ERROR, detail: 'Internal server error', message }],
    };
  }
};