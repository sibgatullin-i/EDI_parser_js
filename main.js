// https://www.npmjs.com/package/yapople
// https://www.npmjs.com/package/ssh2-sftp-client
// https://www.npmjs.com/package/node-html-parser


import _ from 'lodash';
import path from 'path';
import { readSettingsFromFile, prepareFolders } from './src/settings.js';
import { prepareMailClient, saveAttachments } from './src/mail.js';
import fs from 'fs';
import async from 'async'

const settings = readSettingsFromFile('./settings.json');

prepareFolders(settings);

const client = prepareMailClient(settings);

// main async routine
(async (settings) => {
  await client.connect();

  const messages = await client.retrieveAll();
  const files = saveAttachments(messages, settings);
  // await client.deleteAll()
  await client.quit()
  
  // parse
  // download
  // index.html + style.css
  // upload

})(settings);