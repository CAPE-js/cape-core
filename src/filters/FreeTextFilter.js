import { CapeTools } from '../utils/CapeTools.js'
import { Filter } from './Filter.js'

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
