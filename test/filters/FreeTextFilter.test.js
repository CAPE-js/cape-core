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
        comment: { field: {}, value: 'The lazy black dog' },
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

    test('when the record contains the search terms spread over several multiple fields: return true', () => {
      const record = {
        title: { field: { multiple: true }, value: ['fish', 'hatstand', 'The quick brown'] },
        description: { field: { multiple: true }, value: ['Jumped over'] },
        comment: { field: {}, value: 'The lazy black dog' }
      }
      const freeTextFilter = new FreeTextFilter({ term: 'quick over dog' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })

    test('when the record contains a null value for a field, but otherwise the terms match: return true', () => {
      const record = {
        title: { field: {}, value: 'The quick brown' },
        description: { field: {}, value: 'Jumped over' },
        comment: { field: {}, value: 'The lazy black dog' },
        missing: null
      }
      const freeTextFilter = new FreeTextFilter({ term: 'quick over dog' })

      expect(freeTextFilter.matchesRecord(record)).toEqual(true)
    })
  })
})

/*

export class FreeTextFilter extends Filter {
  matchesRecord (record) {
    // check that all the terms are found in the record
    const terms = this.state.term.toLowerCase().split(/\s+/)

    for (let i = 0; i < terms.length; i++) {
      const term = CapeTools.make_pattern(terms[i])
      let termFound = false
      const fieldNames = Object.keys(record)
      fieldNames.forEach((fieldName) => {
        let values = record[fieldName].value
        if (values === undefined) {
          return
        }
        if (!record[fieldName].field.multiple) {
          values = [values]
        }
        for (let k = 0; k < values.length; k++) {
          const value = '' + values[k] // force it into a string
          if (value.match(term)) {
            termFound = true
            return
          }
        }
      })

      // has to match all terms
      if (!termFound) {
        return false
      }
    }

    return true
  }
}

 */
