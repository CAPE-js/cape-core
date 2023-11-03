import { flattenDiacritics } from '../../src/utils/flattenDiacritics';
import { expect, test } from 'vitest'

describe('flattenDiacritics', () => {

    test('removes diacritics', () => {
        const input = "Who doesn't like crème brûlée?";
        const result = flattenDiacritics(input);
        expect(result).toBe("Who doesn't like creme brulee?");
    });

    test('does not affect normal characters', () => {
        const input = "I am the Walrus";
        const result = flattenDiacritics(input);
        expect(result).toBe(input);
    });

});

