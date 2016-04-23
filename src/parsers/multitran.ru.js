import cheerio from 'cheerio';
import request from 'request-promise';
import { format as fmt } from 'util';
import iconv from 'iconv-lite';

export const SEARCH_PATTERN = 'http://www.multitran.ru/c/m.exe?l1=1&s=%s';
export const FETCH_ATTEMPTS = 3;
export const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36';

// fetches HTML page
export function fetch(word, attempt = 0) {
  const uri = fmt(SEARCH_PATTERN, encodeURIComponent(word));
  return request
    .get({
      uri,
      encoding: null,
      headers: {
        'user-agent': userAgent,
      },
    })
    .then(buffer => iconv.decode(buffer, 'win1251'))
    .catch(e => {
      if (attempt < FETCH_ATTEMPTS) {
        return fetch(word, attempt + 1);
      }

      throw e;
    });
}

export function parse(body) {
  const $ = cheerio.load(body);
  const results = $('#translation ~ table:nth-of-type(2) tr:nth-child(n+2)');
  return results
    .filter((idx, el) => {
      return $(el).find('td[colspan=2]').length === 0;
    })
    .map((idx, el) => {
      const type = $(el).find('td:first-child').text().trim().replace(/\s/g, '');
      const values = $(el).find('td:last-child a').map((i, val) => $(val).text()).get();
      return { type, values };
    })
    .get();
}

// export base function
export default function translate(word) {
  return fetch(word).then(parse);
}
