import { FilterState } from '@/models/FilterState'

export class FreeTextFilterState extends FilterState {
  default_term = ''
  default_mode = 'contains'

  constructor (field) {
    super(field)

    if (field.default_filter_mode !== undefined) {
      this.default_mode = field.default_filter_mode
    }

    if (field.default !== undefined) {
      this.default_term = field.default[0]
    }

    this.reset()
  }

  reset () {
    this.mode = this.default_mode
    this.term = this.default_term
  }
}
