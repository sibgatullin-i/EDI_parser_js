import { readSettingsFromFile, prepareFolders } from './src/settings.js';
import MailClient from './src/MailClient.js';

const settings = readSettingsFromFile('./settings.json');

prepareFolders(settings);

// const client = prepareMailClient(settings);

const Mail = new MailClient(settings);

Mail.retrieve();
