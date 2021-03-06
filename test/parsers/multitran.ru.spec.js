import translate from '../../src/parsers/multitran.ru';

describe('multitran.ru', function suite() {
  const TEST_WORD = 'yoga';

  pit('#translate() / default fetches and returns array of translated terms', function test() {
    return translate(TEST_WORD)
      .then(results => {
        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(6);
        results.forEach(it => {
          expect(it.type).toBeDefined();
          expect(it.values).toBeDefined();
          expect(Array.isArray(it.values)).toBe(true);
          it.values.forEach(value => {
            expect(typeof value).toBe('string');
          });
        });
      });
  });
});
