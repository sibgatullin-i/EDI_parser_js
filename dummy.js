import { readSettingsFromFile, prepareFolders } from "./src/settings.js";
import { prepareMailClient } from "./src/mail.js";

const settings = readSettingsFromFile('./settings.json');
const client = prepareMailClient(settings);


console.log(prepareFolders(settings))