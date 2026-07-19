import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

// Local-disk storage for uploaded files. Swap this implementation for a real
// object storage client (S3, R2, etc.) if the deploy target's filesystem isn't
// persistent — callers only depend on `savePdfFile`'s return shape.
const UPLOADS_DIR = process.env.DIVISION_2_UPLOADS_DIR || path.join(process.cwd(), 'public', 'uploads', 'division-2');
const UPLOADS_PUBLIC_PATH = process.env.DIVISION_2_UPLOADS_PUBLIC_PATH || '/uploads/division-2';

export async function savePdfFile(file: File, subdir: string): Promise<string> {
  const dir = path.join(UPLOADS_DIR, subdir);
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}.pdf`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `${UPLOADS_PUBLIC_PATH}/${subdir}/${filename}`;
}
