import { Language } from '~/types';

const i18nConfig = {
  locales: [ Language.EN, Language.ES ],
  defaultLocale: Language.EN,
  namespaces: [ 'translation' ],
};

export default i18nConfig;
