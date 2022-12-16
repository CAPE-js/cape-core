// utility functions
const typeInDebounceTextBox = async function typeInDebounceTextBox(locator, text) {
    await locator.type(text);
    // hack: sleeping in this way is strongly disapproved of in playwright but the
    // debounce has a sleep and no events that I can attach to to indicate it is finished.
    await sleep(150); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { typeInDebounceTextBox, sleep }
