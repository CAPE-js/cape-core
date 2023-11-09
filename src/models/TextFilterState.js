import { FilterState } from '@/models/FilterState'

export class TextFilterState extends FilterState {
  default_mode = 'contains'
  default_term = ''
  placeholder = { contains: '' }

  constructor (field) {
    super(field)

    if (field.default_filter_mode !== undefined) {
      this.default_mode = field.default_filter_mode
    }
    if (field.default !== undefined) {
      this.default_term = field.default[0]
    }

    if (field.placeholder && field.placeholder.contains) {
      this.placeholder.contains = field.placeholder.contains
    }

    this.reset()
  }

  reset () {
    this.mode = this.default_mode
    this.term = this.default_term
  }
}
