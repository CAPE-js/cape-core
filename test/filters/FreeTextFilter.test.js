import { FreeTextFilter } from '../../src/filters/FreeTextFilter'
import { describe, expect, test } from 'vitest'

describe('FreeTextFilter', () => {
  describe('matchesRecord()', () => {
    test('when the record matches a term in the state: return true', () => {
      const record = { title: { field: {}, value: 'The quick brown fox' } }
      const freeTextFilter = new FreeTextFilter({ term: 'brown' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when the record does not match a term in the state: return false', () => {
      const record = { title: { field: {}, value: 'The quick brown fox' } }
      const freeTextFilter = new FreeTextFilter({ term: 'black' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(false)
    })

    test('when the record matches a term in the state with different capitalisation: return true', () => {
      const record = { title: { field: {}, value: 'The quick brown fox' } }
      const freeTextFilter = new FreeTextFilter({ term: 'BRowN' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when the record matches an integer value: return true', () => {
      const record = { title: { field: {}, value: 17 } }
      const freeTextFilter = new FreeTextFilter({ term: '17' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when the record does not contain the search terms spread over several fields: return false', () => {
      const record = {
        title: { field: {}, value: 'The quick brown' },
        description: { field: {}, value: 'Jumped over' },
        comment: { field: {}, value: 'The lazy black dog' }
      }
      const freeTextFilter = new FreeTextFilter({ term: 'quick over cat' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(false)
    })

    test('when the record contains the search terms spread over several fields: return true', () => {
      const record = {
        title: { field: {}, value: 'The quick brown' },
        description: { field: {}, value: 'Jumped over' },
        comment: { field: {}, value: 'The lazy black dog' }
      }
      const freeTextFilter = new FreeTextFilter({ term: 'quick over dog' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when all the search terms are present but not in the same field: return true', () => {
      const record = {
        title: { field: { multiple: true }, value: ['fish', 'hatstand', 'The quick brown'] },
        description: { field: { multiple: true }, value: ['Jumped over'] },
        comment: { field: {}, value: 'The lazy black dog' }
      }
      const freeTextFilter = new FreeTextFilter({ term: 'quick over dog' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when the record has properties that are not {field,value} objects: ignore these properties', () => {
      const record = {
        title: { field: {}, value: 'The quick brown' },
        description: { field: {}, value: 'Jumped over' },
        comment: { field: {}, value: 'The lazy black dog' },
        next: undefined,
        prev: 23,
        noField: { value: 'Mystery time' },
        noValue: { field: {} },
        emptyObject: {},
        nullValue: null,
        arrayValue: [1,2,3]
      }
      const freeTextFilter = new FreeTextFilter({ term: 'Mystery' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(false)
    })
  })
})
