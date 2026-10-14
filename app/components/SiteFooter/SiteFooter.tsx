import { ReactNode } from 'react';

type SocialLink = { label: string; href: string; icon: ReactNode };

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19uUVt9hNG/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cpc.umsa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/channel/UCi3lobNX_J1cMW6BjFZGTmw',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/ClubProgCompUMSA',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.04 15.6l-.38 5.3c.54 0 .78-.23 1.06-.51l2.55-2.43 5.28 3.86c.97.53 1.65.25 1.91-.89l3.47-16.24c.31-1.43-.52-1.99-1.46-1.64L1.07 9.03c-1.39.54-1.37 1.31-.24 1.66l5.2 1.62 12.08-7.6c.57-.38 1.09-.17.66.21z" />
      </svg>
    ),
  },
  {
    label: 'Correo',
    href: 'mailto:miguelangel@umsa.club',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6.5l9 6.5 9-6.5" />
      </svg>
    ),
  },
];

export const SiteFooter = () => (
  <footer className="site-footer">
    <ul className="site-footer-links">
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            className="site-footer-icon"
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
    <p className="site-footer-copy">Club de Programación Competitiva · UMSA</p>
  </footer>
);
