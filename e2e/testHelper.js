// utility functions
const typeInDebounceTextBox = async function typeInDebounceTextBox (locator, text) {
  await locator.type(text)
  // hack: sleeping in this way is strongly disapproved of in playwright but the
  // debounce has a sleep and no events that I can attach to to indicate it is finished.
  await sleep(200)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const ModeOption = Object.freeze({
  IS: 'is',
  BETWEEN: 'between',
  IS_PRESENT: 'set',
  IS_NOT_PRESENT: 'not-set',
  CONTAINS: 'contains',
  ONE_OF: 'one-of'
})

const pickMultiSelectOption = async function (multiSelectLocator, indexOfOptionToSelect) {
  await multiSelectLocator.click()
  await multiSelectLocator.getByRole('option').nth(indexOfOptionToSelect).click()
}

export { typeInDebounceTextBox, sleep, ModeOption, pickMultiSelectOption }
