import fs from 'fs';
import { parse } from 'node-html-parser';

export function parseEDIfile (filePath) {
  const rawHTML = fs.readFileSync(filePath, 'utf8');
  const HTML = parse(rawHTML);
  


}