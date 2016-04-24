import translate from '../../src/parsers/urbandictionary.com';

describe('multitran.ru', function suite() {
  const TEST_WORD = 'fuck';

  pit('#translate() / default fetches and returns array of translated terms', function test() {
    return translate(TEST_WORD)
      .then(results => {
        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(1);
        results.forEach(it => {
          expect(it.type).toBe('definition');
          expect(it.values).toBeDefined();
          expect(Array.isArray(it.values)).toBe(true);
          expect(it.values.length).toBe(8);
          it.values.forEach(value => {
            expect(typeof value).toBe('string');
          });
        });
      });
  });
});
