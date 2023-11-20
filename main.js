// https://www.npmjs.com/package/yapople
// https://www.npmjs.com/package/ssh2-sftp-client
// https://www.npmjs.com/package/node-html-parser


import _ from 'lodash';
import path from 'path';
import { readSettingsFromFile, prepareFolders } from './src/settings.js';
import { prepareMailClient } from './src/mail.js';
import fs from 'fs';

const settings = readSettingsFromFile('./settings.json');

prepareFolders(settings);

const client = prepareMailClient(settings);

// main async routine
(async (settings) => {
  await client.connect();
  const files = [];

  const messages = await client.retrieveAll();
  messages
    .filter((message) => {
      return _.includes(settings.mailFilterFrom, message.from[0].address) && Array.isArray(message.attachments)
    })
    .forEach((message) => {
      message.attachments.forEach((att) => {
        const uid = Math.floor(new Date() / 1000);
        const filePath = path.join(settings.folderIn, `${uid}_${att.fileName}`);
        fs.writeFileSync(filePath, att.content);
        console.log(`File ${filePath} saved`)
      })
    })
  // await client.deleteAll()
  await client.quit()
  
  // parse
  // download
  // index.html + style.css
  // upload

})(settings);