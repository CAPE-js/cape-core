import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync'
import { DataPageObject } from './pageObjects/dataPageObject';

test.describe("The data page", () => {

  test('includes a copyright notice', async ({ page }) => {
    const dataPage = new DataPageObject(page);
    await dataPage.goto();

    await expect(dataPage.copyrightNotice).toHaveText("This data is copyright University of Southampton and may be reused under the Creative Commons Attribution 3.0 Unported (CC BY 3.0) license.");
  });

  test('includes the creator details', async ({ page }) => {
    const dataPage = new DataPageObject(page);
    await dataPage.goto();

    await expect(dataPage.creator).toHaveText("This dataset was created by Marvin Fenderson.");
  });

  test('includes an attribution', async ({ page }) => {
    const dataPage = new DataPageObject(page);
    await dataPage.goto();

    await expect(dataPage.attribution).toHaveText("If using this data, please attribute it as \"TotL Project\" with a link to http://example.org/totl/.");
  });

  test('allows you to download the data as json', async ({ page }) => {
    const dataPage = new DataPageObject(page);
    await dataPage.goto();
    const jsonContents = await dataPage.downloadJson();

    // validate downloaded data
    const jsonData = JSON.parse(jsonContents);
    expect(jsonData.length).toEqual(4);
    expect(jsonData[0].size).toBe("Small");
  });

  test('allows you to download the data as csv', async ({ page }) => {
    const dataPage = new DataPageObject(page);
    await dataPage.goto();
    const csvContents = await dataPage.downloadCsv();

    // validate downloaded data
    const data = parse(csvContents, { columns: true, skip_empty_lines: true });
    expect(data.length).toEqual(4);
    expect(data[0].size).toBe("Small");
  });

  test('lists the field ID values in the schema.', async ({ page }) => {
    const expectedTexts = ["record_number", "auto", "date", "title", "size", "colour", "weight", "likes", "foods", "drinks", "colour3"];
    await validateExpectedSchemaColumnData(page, expectedTexts, 1);    
  });

  test('lists the field name values in the schema', async ({ page }) => {
    const expectedTexts = ["Record number label", "Auto label", "Date label", "Title label", "Size label", "Colour label", "Weight label", "Likes label", "Foods label", "Drinks label", "3 char Colour label"];
    await validateExpectedSchemaColumnData(page, expectedTexts, 2);    
  });

  test('lists the field type values in the schema', async ({ page }) => {    
    const expectedTexts = ["integer", "integer", "date", "text", "enum", "enum list", "integer", "enum list", "enum list", "enum list", "enum list"];
    await validateExpectedSchemaColumnData(page, expectedTexts, 3);    
  });

  test('lists the field description values in the schema', async ({ page }) => {
    const expectedTexts = ["Record number description", "Auto description", "Date description", "Title description", "Size description", "Colour description", "Weight description", "Likes description", "Foods description", "Drinks description", "Colour trimmed to 3 characters"];
    await validateExpectedSchemaColumnData(page, expectedTexts, 4);    
  });

});

// Helper functions
// ================
async function validateExpectedSchemaColumnData(page, expectedTexts, columnNumber) {
  const dataPage = new DataPageObject(page);
  await dataPage.goto();
  const actualTexts = await dataPage.getColumnTexts(columnNumber);
  expect(actualTexts).toEqual(expectedTexts);
}