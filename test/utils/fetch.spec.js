import fetch from '../../src/utils/fetch';

describe('multitran.ru', function suite() {
  const SEARCH_PATTERN = 'https://makeomatic.ru/%s';

  pit('#fetch() returns buffer with a dynamic URL', function test() {
    return fetch(SEARCH_PATTERN, 'blog')
      .then(resp => {
        expect(Buffer.isBuffer(resp)).toBe(true);
      });
  });
});
