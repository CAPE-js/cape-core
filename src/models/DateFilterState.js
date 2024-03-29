import { FilterState } from '@/models/FilterState'

export class DateFilterState extends FilterState {
  default_term = ''
  default_term2 = ''
  default_mode = 'between'
  placeholder = { is: '', between: ['', ''] }

  constructor (field) {
    super(field)

    if (field.default !== undefined) {
      this.default_term = field.default[0]
      if (field.default.length >= 2) {
        this.default_term2 = field.default[1]
      }
    }

    if (field.placeholder && field.placeholder.between && field.placeholder.between[0] && field.placeholder.between[1]) {
      this.placeholder.between = field.placeholder.between
    }

    this.reset()
  }

  isSet () {
    if (this.mode === 'set' || this.mode === 'not-set') {
      return true
    }
    return (this.term !== this.default_term || (this.mode === 'between' && this.term2 !== this.default_term2))
  }

  isActive () {
    if (this.isSet()) {
      return true
    }
    return (this.term !== '' || (this.mode === 'between' && this.term2 !== ''))
  }

  reset () {
    this.mode = this.default_mode
    this.term = this.default_term
    this.term2 = this.default_term2
  }
}
