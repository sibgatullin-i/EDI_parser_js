import { Client } from 'yapople';
import _ from 'lodash';

export function prepareMailClient(settings) {
  return new Client({
    host: settings.mailHost,
    port: settings.mailPort,
    tls: true,
    mailparser: true,
    username: settings.mailUsername,
    password: settings.mailPassword,
  })
}

export function saveAttachments(messages, settings) {
  const files = [];
  messages
    .filter((message) => {
      return _.includes(settings.mailFilterFrom, message.from[0].address) && Array.isArray(message.attachments)
    })
    .forEach((message) => {
      message.attachments.forEach((att) => {
        const uid = Math.floor(new Date() / 1000);
        const filePath = path.join(settings.folderIn, `${uid}_${att.fileName}`);
        fs.writeFileSync(filePath, att.content);
        //fs.writeFile(filePath, att.content, (err) => {
        //  if (err) throw new Error(err);
        //  console.log(`File ${filePath} saved`);
        //  files.push(filePath)
        //});
        console.log(`File ${filePath} saved`);
        files.push(filePath);
      })
    })
  return files;
}