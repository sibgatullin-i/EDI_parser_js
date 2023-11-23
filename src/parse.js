import fs from 'fs';
import path from 'path'
import * as cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';

export function parseEDIfile (filePath) {
  const rawHTML = fs.readFileSync(filePath, 'utf8');
  const HTML = cheerio.load(rawHTML);
  const HTMLHeader = HTML('body > table > tbody > tr > td > p').contents()[1].data
  const HTMLDate = HTMLHeader.substring(HTMLHeader.length - 10);
  
  cheerioTableparser(HTML);
  const dataRaw = HTML('body > table > tbody > tr > td> table > tbody').parsetable(false, false, false);
  const data = [];
  for (let i = 1; i < dataRaw[0].length; i++) {
    data.push({
      EventId : dataRaw[0][i].split('>')[1].replace('</a',''),
      URL : dataRaw[0][i].split('"')[1],
      //[dataRaw[0][0]]: dataRaw[0][i],
      [dataRaw[1][0].replace('<b>','').replace('</b>','')] : dataRaw[1][i],
      [dataRaw[2][0].replace('<b>','').replace('</b>','')] : dataRaw[2][i],
      [dataRaw[3][0].replace('<b>','').replace('</b>','')] : dataRaw[3][i],
      [dataRaw[4][0].replace('<b>','').replace('</b>','')] : dataRaw[4][i],
      [dataRaw[5][0].replace('<b>','').replace('</b>','')] : dataRaw[5][i],
      [dataRaw[6][0].replace('<b>','').replace('</b>','')] : dataRaw[6][i],
      [dataRaw[7][0].replace('<b>','').replace('</b>','')] : dataRaw[7][i],
      [dataRaw[8][0].replace('<b>','').replace('</b>','')] : dataRaw[8][i],
    })
  }
  return {
    filename: path.parse(filePath).base,
    filePath,
    folder: HTMLHeader.split('-')[1].trim(),
    header: HTMLHeader,
    date: HTMLDate,
    data,
  }
}

