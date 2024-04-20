import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export function hashFile(filePath: string): string {
  const fileBuffer = readFileSync(filePath);
  const hashSum = createHash('sha256');
  hashSum.update(fileBuffer);
  
  return hashSum.digest('hex');
}

export async function hashBlob(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); 
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
  return hashHex;
}