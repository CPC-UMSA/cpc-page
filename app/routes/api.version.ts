import { json, type LoaderFunction } from '@remix-run/node';
import packageJson from '~/../package.json';

export const loader: LoaderFunction = async () => {
  const version = packageJson.version;
  
  return json({ status: 'ok', data: { version } });
};
