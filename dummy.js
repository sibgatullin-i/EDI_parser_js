import { parseEDIfile } from "./src/parse.js";
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'sample', 'indexgso.htm')

const result = parseEDIfile(filePath)

console.log(result)