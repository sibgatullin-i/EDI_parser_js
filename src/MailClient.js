import _ from 'lodash';
import path from 'path';
import { writeFileSync } from 'fs';

import { Client } from 'yapople';

export default class MailClient {
  constructor(settings) {
    this.settings = settings;

    this.client = new Client({
      host: this.settings.mailHost,
      port: this.settings.mailPort,
      tls: true,
      mailparser: true,
      username: this.settings.mailUsername,
      password: this.settings.mailPassword,
    });
  }

  async retrieve() {
    await this.client.connect();

    const messages = await this.client.retrieveAll();
    messages
      .filter((message) => _.includes(this.settings.mailFilterFrom, message.from[0].address))
      .forEach((message) => {
        if (message.attachments) {
          message.attachments.forEach((att) => {
            const uid = Math.floor(new Date() / 1000);
            const newName = `${uid}_${att.fileName}`;
            const filePath = path.join(this.settings.folderIn, newName);
            writeFileSync(filePath, att.content);
          });
        }
      });
    // await this.client.deleteAll();
    await this.client.quit();
  }
}
