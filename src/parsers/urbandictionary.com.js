import cheerio from 'cheerio';
import request from '../utils/fetch';

export const SEARCH_PATTERN = 'http://www.urbandictionary.com/define.php?term=%s';

export function parse(body) {
  const $ = cheerio.load(body);
  const definitions = $('#content .def-panel:first-child .meaning').html();
  const values = definitions
    .split('<br>')
    .map(val => val.trim().replace(/(?:[\r\n]|^\d+\.\s?)/g, '').trim());
  return [{ type: 'definition', values }];
}

// export base function
export default function translate(word) {
  return request(SEARCH_PATTERN, word).then(parse);
}
