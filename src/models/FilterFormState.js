export class FilterFormState {
  filters_by_id = {} // filter objects by ID
  filters = [] // filter objects in order
  show_all_filters = false // are advanced search fields being used
  sort_dir = 'asc' // or desc. sort direction.
  sort_fields = [] // fields that may be used for sorting
  sort_field = '' // id of current sort fields
}
