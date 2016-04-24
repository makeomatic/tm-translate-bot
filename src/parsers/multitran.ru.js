import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import request from '../utils/fetch';

export const SEARCH_PATTERN = 'http://www.multitran.ru/c/m.exe?l1=1&s=%s';

export function parse(body) {
  const $ = cheerio.load(iconv.decode(body, 'win1251'));
  const results = $('#translation ~ table:nth-of-type(2) tr:nth-child(n+2)');
  return results
    .filter((idx, el) => {
      return $(el).find('td[colspan=2]').length === 0;
    })
    .map((idx, el) => {
      const $el = $(el);
      const type = $el.find('td:first-child').text().trim().replace(/[\r\n]/g, '');
      const values = $el.find('td:last-child a').map((i, val) => $(val).text()).get();
      return { type, values };
    })
    .get();
}

// export base function
export default function translate(word) {
  return request(SEARCH_PATTERN, word).then(parse);
}
