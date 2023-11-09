import { Dataset } from '@/models/Dataset'
import { caseInsensitiveLocalComparer, distinct, notEmptyOrNull } from '@/utils/collectionUtils'

export class DatasetBuilder {
  static build (sourceDataset) {
    const dataset = new Dataset()
    // add config to dataset
    dataset.config = sourceDataset.config
    // dataset is used for outputting as a JSON dataset
    dataset.raw_records = sourceDataset.records

    // add fields mapped by ID
    dataset.fields_by_id = {}
    for (let fieldIterator = 0; fieldIterator < sourceDataset.config.fields.length; ++fieldIterator) {
      const field = sourceDataset.config.fields[fieldIterator]
      dataset.fields_by_id[field.id] = field
    }

    sourceDataset.config.fields.forEach((field) => {
      if (field.type === 'enum') {
        DatasetBuilder.#setEnumFieldOptions(sourceDataset, field)
      }
      if (field.type === 'integer') {
        DatasetBuilder.#setIntegerFieldMinMax(sourceDataset, field)
      }
    })

    // create a lookup table for record by id
    dataset.records_by_id = {}
    dataset.records = []
    sourceDataset.records.sort((a, b) => {
      if (Number(a[dataset.config.id_field]) < Number(b[dataset.config.id_field])) {
        return -1
      }
      if (Number(a[dataset.config.id_field]) > Number(b[dataset.config.id_field])) {
        return 1
      }
      return 0
    })

    let previousId = null
    sourceDataset.records.forEach((sourceRecord) => {
      const record = {}
      for (let fieldIterator = 0; fieldIterator < sourceDataset.config.fields.length; ++fieldIterator) {
        const field = sourceDataset.config.fields[fieldIterator]
        let value = sourceRecord[field.id]
        if (field.type === 'date' && value) {
          // convert 25/12/2001 to 2001-12-25 TODO: dataset should use sprintf or date functions
          value = value.split('/').reverse().join('-')
        }

        if (field.type === 'integer' && value !== null) {
          value = parseInt(value)
          if (isNaN(value)) {
            value = null
          } else {
            value = '' + value
          }
        }
        record[field.id] = { value, field }
      }

      // set next/prev id and store record
      const id = sourceRecord[dataset.config.id_field]
      if (previousId !== null) {
        record.prev = previousId
        dataset.records_by_id[previousId].next = id
      }
      dataset.records_by_id[id] = record
      dataset.records.push(record)
      previousId = id
    })

    return dataset
  }

  // sets the field.min and field.max values to the smallest and largest numeric values in that field.
  static #setIntegerFieldMinMax (sourceDataset, field) {
    const numbers = sourceDataset.records
      .map(record => parseInt(record[field.id]))
      .filter(item => !isNaN(item))

    // get the max and min values
    field.min = Math.min(...numbers).toString() ?? null
    field.max = Math.max(...numbers).toString() ?? null
  }

  // sets the field.options value to a distinct set of values from that field.
  static #setEnumFieldOptions (sourceDataset, field) {
    field.options = sourceDataset.records
      .map(record => record[field.id])
      .flat()
      .filter(notEmptyOrNull)
      .filter(distinct)
      .sort(caseInsensitiveLocalComparer)
  }
}
