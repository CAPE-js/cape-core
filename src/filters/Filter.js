import { CapeTools } from '../utils/CapeTools.js'

/*
 *  Filter
 *  abstract base class, should not be instantiated directly
 */
export class Filter {
  constructor (state) {
    this.state = state
  }

  matchesValuesIs (values) {
    const term = this.state.term.toLowerCase()
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (value.toLowerCase() === term) {
        return true
      }
    }
    return false
  }

  matchesValuesContains (values) {
    // check that all the terms are found in the record

    const terms = this.state.term.toLowerCase().split(/\s+/)

    for (let i = 0; i < terms.length; i++) {
      const term = CapeTools.make_pattern(terms[i])
      let termFound = false
      for (let j = 0; j < values.length; j++) {
        if (values[j].match(term)) {
          termFound = true
          break
        }
      }

      // has to match all terms
      if (!termFound) {
        return false
      }
    }

    return true
  }

  matchesValuesSet (values) {
    for (let j = 0; j < values.length; j++) {
      if (values[j] !== null && values[j] !== '') {
        return true
      }
    }
    return false
  }

  matchesValuesNotSet (values) {
    return !this.matchesValuesSet(values)
  }

  matchesRecord (record) {
    /* Assumes that the filter is set */

    let values = record[this.state.field.id].value
    if (values === null || (this.state.field.multiple && values.length === 0)) {
      // special case for not-set where not matching is a success
      return this.state.mode === 'not-set'
    }

    // to simplify things always work with arrays.
    if (!this.state.field.multiple) {
      values = [values]
    }

    return this.matchesValues(values)
  }

  matchesValues (values) {
    console.log('matchesValues must be overridden!')
    console.log(values)
    return false
  }
}
