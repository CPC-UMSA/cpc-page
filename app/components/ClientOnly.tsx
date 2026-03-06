import { ReactNode, useEffect, useState } from 'react';

export function ClientOnly({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (hydrated) {
    return <>{children}</>;
  }
}
