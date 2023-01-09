export const rootUrl = "http://localhost:8080/#/"

export function buildPath(segments) {
    return rootUrl + segments;
}

export function buildRecordUrl(recordNumber) {
    return rootUrl + `record/${recordNumber}`;
}