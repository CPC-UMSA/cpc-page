import { TextLanguage } from '~/types';

// commons 0.2 fixed TextLanguage to literal lowercase keys; Language.* is now 'ES'/'EN'
export const EMPTY_TEXT_LANGUAGES: TextLanguage = { es: '', en: '' };

export { ALPHANUMERIC_DASH_UNDERSCORE_REGEX, DEFAULT_DATA_VIEWER_PROPS } from '@juki-team/base-ui/constants';
