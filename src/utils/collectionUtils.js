// returns only unique values from the items collection.
export function distinct (value, index, array) {
  return array.indexOf(value) === index
}

// returns only values that aren't null or empty strings
export function notEmptyOrNull (value) {
  return value !== null && value !== ''
}

// returns value indicating whether a is greater, less or equal to b when compared in a case insenstive way.
export function caseInsensitiveLocalComparer (a, b) {
  const AValue = a.toLowerCase()
  const BValue = b.toLowerCase()
  return AValue.localeCompare(BValue)
}
