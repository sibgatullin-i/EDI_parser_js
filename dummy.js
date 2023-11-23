import { parseEDIfile } from "./src/parse.js";
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from "fs";
import fetch from 'node-fetch';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'sample', 'fake.htm')

const result = parseEDIfile(filePath)

//console.log(result)


let files = [
  '/home/isayli/src/EDI_parser_js/sample/fake.htm',
  //'/home/isayli/src/EDI_parser_js/sample/prod/eq.htm',
  //'/home/isayli/src/EDI_parser_js/sample/prod/gso.htm',
  //'/home/isayli/src/EDI_parser_js/sample/prod/indexgso.htm'

]
const folderOut = '/home/isayli/src/EDI_parser_js/files/Out';


files = files.map(file => parseEDIfile(file));
console.log(files)
files.forEach(file => {
  const folder = path.join(folderOut, `${file.folder}@${file.date}`)
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true});
  file.data.map(object => {
    object['localFile'] = `${file.folder}_${file.date}-${Date.now()}.html`
    const localFile = path.join(folder, object.localFile);
    fetch(object.URL)
      .then(res => res.text())
      .then(data => {
          fs.writeFile(localFile, data, (err) => {
            if (err) throw err;
            console.log(`Saved: ${localFile}`)
          })
      })
    })  
  })
