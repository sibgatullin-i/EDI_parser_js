import { Client } from 'yapople';

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

export function Save(client) {
  (async () => {
  await client.connect();
  const messages = await client.retrieveAll();
  messages.forEach((message) => {
    console.log(message.subject)
    console.log(message.attachments);
  });
  await client.quit();
})().catch(console.error);
}