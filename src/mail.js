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

