import { getAuthorizedRequest } from '@juki-team/base-ui/helpers';
import { cleanRequest, ErrorCode, HEADER_JUKI_FORWARDED_HOST } from '@juki-team/commons';

export const get = async <T>(url: string, request: Request): Promise<T> => {
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
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      errors: [{ code: ErrorCode.ERR500, detail: 'Internal server error' }],
    } as T;
  }
};