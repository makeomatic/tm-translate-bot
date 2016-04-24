import request from 'request-promise';
import { format as fmt } from 'util';

export const FETCH_ATTEMPTS = 3;
export const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36';

// fetches HTML page
export default function fetch(pattern, word, encoding, attempt = 0) {
  const uri = fmt(pattern, encodeURIComponent(word));
  return request
    .get({
      uri,
      encoding: null,
      headers: {
        'user-agent': userAgent,
      },
    })
    .catch(e => {
      if (attempt < FETCH_ATTEMPTS) {
        return fetch(pattern, word, encoding, attempt + 1);
      }

      throw e;
    });
}
