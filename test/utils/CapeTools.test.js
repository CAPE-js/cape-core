import { CapeTools } from '../../src/utils/CapeTools';
import { expect, test } from 'vitest'

describe('CapeTools', () => {

    describe('make_pattern', () => {
        
        test('returns a regular expression which matches when strings differ only by diacritics', () => {
            const input = "Who doesn't like crème brûlée?";
            const inputWithoutAccents = "Who doesn't like creme brulee?";            

            const regex = CapeTools.make_pattern(inputWithoutAccents);

            const result = input.match(regex);

            expect(result).not.toBeNull();
        });

        test('returns a regular expression which matches when strings differ only by case', () => {
            const input = "I am the Walrus";        
            const lowercaseInput = input.toLocaleLowerCase();

            const regex = CapeTools.make_pattern(lowercaseInput);

            const result = input.match(regex);

            expect(result).not.toBeNull();
        });
    
        test('returns a regular expression which matches when strings are the same', () => {
            const input = "I am the Walrus";        
            
            const regex = CapeTools.make_pattern(input);

            const result = input.match(regex);
            
            expect(result).not.toBeNull();
        });

        test('returns a regular expression which does not matche when strings are not the same', () => {
            const input = "Crème brûlée is not a Walrus";        
            const differingText = "This is some differing text";

            const regex = CapeTools.make_pattern(differingText);
            
            const result = input.match(regex);
            
            expect(result).toBeNull();
        });

    });   
});

