import type { i18n } from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { Language } from '~/types';
import i18nConfig from './i18nConfig';

const localResources = {
  [Language.ES]: { translation: {} },
  [Language.EN]: { translation: {} },
};

export default async function initTranslations(i18nInstance: i18n) {
  i18nInstance.use(ChainedBackend);
  
  await i18nInstance.init({
    // lng: i18nConfig.defaultLocale,
    // fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: i18nConfig.namespaces[0],
    fallbackNS: i18nConfig.namespaces[0],
    ns: i18nConfig.namespaces,
    preload: i18nConfig.locales,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      backends: [
        resourcesToBackend(localResources),
      ],
      backendOptions: [],
    },
  }, (err: Error) => {
    if (err) {
      return console.error('error on initI18next', err);
    }
  });
}
