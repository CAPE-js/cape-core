import { FilterState } from '@/models/FilterState'

export class EnumFilterState extends FilterState {
  default_term = ''
  default_terms = []
  default_mode = 'one-of'

  constructor (field) {
    super(field)

    if (field.default_filter_mode !== undefined) {
      this.default_mode = this.field.default_filter_mode
    }

    if (field.default !== undefined) {
      this.default_term = field.default[0]
      this.default_terms = []
      field.default.forEach((term) => {
        this.default_terms.push({ name: term })
      })
    }

    // prep options just the way multiselect likes them
    // but ugh, this should not live on the field
    this.field.multiselectOptions = []
    field.options.forEach((option) => {
      this.field.multiselectOptions.push({ name: option })
    })

    this.reset()
  }

  isSet () {
    if (this.mode === 'set' || this.mode === 'not-set') {
      return true
    }
    if (this.mode === 'is') {
      return this.term !== this.default_term
    } else if (this.mode === 'one-of') {
      // this one is the pain. We need to compare the name properties of two unordered object lists
      const currentTermsCode = this.terms.map(item => item.name).sort().join(':')
      const defaultTermsCode = this.default_terms.map(item => item.name).sort().join(':')
      return currentTermsCode !== defaultTermsCode
    }
  }

  isActive () {
    if (this.isSet()) {
      return true
    }
    if (this.mode === 'is') {
      return this.term !== ''
    } else if (this.mode === 'one-of') {
      return this.terms.length > 0
    }
  }

  reset () {
    this.mode = this.default_mode
    this.term = this.default_term
    // need to ensure it's not the same actual list reference
    this.terms = this.default_terms.map(item => item)
  }
}
