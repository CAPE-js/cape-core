import { FilterStateBuilder } from '@/builders/FilterStateBuilder'
import { FilterFormState } from '@/models/FilterFormState'

export class FilterFormStateBuilder {
  static build (dataset) {
    const filterFormState = new FilterFormState()
    const freetextFilter = FilterStateBuilder.build({
      label: 'Search',
      quick_search: true,
      type: 'freetext',
      id: 'freetext',
      description: 'Search for terms anywhere in the record'
    })
    filterFormState.filters.push(freetextFilter)
    const field_ids = Object.keys(dataset.fields_by_id)
    // make default options implicit
    field_ids.forEach((fieldId) => {
      const field = dataset.fields_by_id[fieldId]
      if (field.filter === undefined) {
        field.filter = true
      }
    })

    // iterate over fields and make filter per field - add to filterState
    field_ids.forEach((fieldId) => {
      const field = dataset.fields_by_id[fieldId]
      // don't include filter if it is set to false (undefined equates to true)
      // refactor?

      if (!field.filter) {
        return
      }
      const filter = FilterStateBuilder.build(field)
      if (!filter) {
        return
      }
      filterFormState.filters_by_id[field.id] = filter
      filterFormState.filters.push(filter)
    })

    // expand sort field names into actual field objects for MVC
    dataset.config.sort.forEach((fieldName) => {
      const field = dataset.fields_by_id[fieldName]
      filterFormState.sort_fields.push(field)
    })
    filterFormState.sort_field = filterFormState.sort_fields[0].id
    return filterFormState
  }
}
