/* Replace diacritics (accented characters) with non-accented versions */
export function flattenDiacritics(input) {
    return input.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}