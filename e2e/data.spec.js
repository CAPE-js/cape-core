import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync'

test.describe("The data page", () => {

  test.beforeEach(async( {page} ) => {
    await page.goto('http://localhost:8080/#/data');    
  });

  test('includes a copyright notice', async ({ page }) => {
    const locator = page.locator("#copyright-notice");
    await expect(locator).toHaveText("This data is copyright University of Southampton and may be reused under the Creative Commons Attribution 3.0 Unported (CC BY 3.0) license.");
  });

  test('includes the creator details', async ({ page }) => {
    const locator = page.locator("#creator");
    await expect(locator).toHaveText("This dataset was created by Marvin Fenderson.");
  });

  test('includes an attribution', async ( { page }) => {
    const locator = page.locator("#attribution");
    await expect(locator).toHaveText("If using this data, please attribute it as \"TotL Project\" with a link to http://example.org/totl/.");
  });

  test('allows you to download the data as json', async ( { page }) => {        
    // download the json file
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.locator("#button-download-json").click()
    ]);

    const path = await download.path();
    const contents = await fs.promises.readFile(path, "utf8");    

    // validate downloaded data
    const data = JSON.parse(trimDownloadContents(contents));    
    expect(data.length).toEqual(4);
    expect(data[0].size).toBe("Small");
  });
  
  test('allows you to download the data as csv', async ( { page }) => {

    // download the json file
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.locator("#button-download-csv").click()
    ]);

    const path = await download.path();
    const contents = await fs.promises.readFile(path, "utf8");    
    
    // validate downloaded data
    const data = parse(trimDownloadContents(contents), { columns: true, skip_empty_lines: true});    
    expect(data.length).toEqual(4);
    expect(data[0].size).toBe("Small");    
  });

  test('lists the field ID values in the schema', async ({ page }) => {    
    
    const expectedTexts = ["record_number", "auto", "date", "title", "size", "colour", "weight", "likes", "foods", "drinks", "colour3"];
    await validateExpectedSchemaColumnTexts(page, 1, expectedTexts);
  });

  test('lists the field name values in the schema', async ({ page }) => {
    const expectedTexts = ["Record number label", "Auto label", "Date label", "Title label", "Size label", "Colour label", "Weight label", "Likes label", "Foods label", "Drinks label", "3 char Colour label"];
    await validateExpectedSchemaColumnTexts(page, 2, expectedTexts);
  });

  test('lists the field type values in the schema', async ({ page }) => {
    const expectedTexts = ["integer", "integer", "date", "text", "enum", "enum list", "integer", "enum list", "enum list", "enum list", "enum list" ];
    await validateExpectedSchemaColumnTexts(page, 3, expectedTexts);
  });

  test('lists the field description values in the schema', async ({ page }) => {
    const expectedTexts = ["Record number description", "Auto description", "Date description", "Title description", "Size description", "Colour description", "Weight description", "Likes description", "Foods description", "Drinks description", "Colour trimmed to 3 characters"];
    await validateExpectedSchemaColumnTexts(page, 4, expectedTexts);
  });

});

// Helper functions
// ================

// Downloaded files include an initial 'invisible' character, remove this.
function trimDownloadContents(downloadedContents) {
  return downloadedContents.toString().substring(1);
}

// Ensures that the text in a column of the schema table matches the expected values.
async function validateExpectedSchemaColumnTexts(page, columnNumber, expectedTexts) {
  const locator = page.getByRole("table").locator(`tbody tr td:nth-child(${columnNumber})`);
  const columnTexts = await locator.allInnerTexts();
  for (let row = 0; row < columnTexts.length; row++) {
    expect(columnTexts[row]).toBe(expectedTexts[row]);
  }
}