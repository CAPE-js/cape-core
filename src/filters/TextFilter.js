import { Filter } from './Filter.js'

export class TextFilter extends Filter {
  matchesValues (values) {
    switch (this.state.mode) {
      case 'is':
        return this.matchesValuesIs(values)
      case 'contains':
        return this.matchesValuesContains(values)
      case 'set':
        return this.matchesValuesSet(values)
      case 'not-set':
        return this.matchesValuesNotSet(values)
    }
    console.log('Unknown search mode ' + this.state.mode + ' on ', this)
    return false
  }
}
