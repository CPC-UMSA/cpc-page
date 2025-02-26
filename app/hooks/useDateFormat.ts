import { useJukiUserSettings } from '@juki-team/base-ui';
import { useCallback } from 'react';

export const useDateFormat = () => {
  
  const { preferredLanguage } = useJukiUserSettings();
  
  const dtf = useCallback((date: Date | number) => {
    const dtf = new Intl.DateTimeFormat(preferredLanguage?.toLowerCase(), { dateStyle: 'long', timeStyle: 'medium' });
    return dtf.format(date);
  }, [ preferredLanguage ]);
  
  const rlt = useCallback((date: number, unit: Intl.RelativeTimeFormatUnit) => {
    const rtf = new Intl.RelativeTimeFormat(preferredLanguage?.toLowerCase());
    return rtf.format(date, unit);
  }, [ preferredLanguage ]);
  
  return { dtf, rlt };
};
