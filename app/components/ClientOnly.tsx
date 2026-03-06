import { ReactNode, useEffect, useState } from 'react';

export function ClientOnly({ children }: { children: ReactNode }) {
  const [ hydrated, setHydrated ] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  console.log({ hydrated });
  if (hydrated) {
    return <>{children}</>;
  }
}
