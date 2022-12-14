import { BasePageObject } from "./basePageObject";
import * as fs from 'fs';

export class DataPageObject extends BasePageObject {

    constructor(page) {
        super(page, "http://localhost:8080/#/data");
        this.copyrightNotice = this.page.locator("#copyright-notice");
        this.creator = this.page.locator("#creator");
        this.attribution = this.page.locator("#attribution");
        this.downloadJsonButton = this.page.locator("#button-download-json");
        this.downloadCsvButton = this.page.locator("#button-download-csv");        
        this.schemaTable = this.page.getByRole("table");
    }

    // Gets the downloaded json data.
    async downloadJson() {
        // download the json file and return its contents
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadJsonButton.click()
        ]);
    
        const path = await download.path();
        const contents = await fs.promises.readFile(path, "utf8");    
        return this.trimDownloadContents(contents);      
    }

    // Gets the downloaded csv data.
    async downloadCsv() {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadCsvButton.click()
          ]);
      
          const path = await download.path();
          const contents = await fs.promises.readFile(path, "utf8");    
          return this.trimDownloadContents(contents);
    }

    // Downloaded files include an initial 'invisible' character, remove this.
    trimDownloadContents(downloadedContents) {
        return downloadedContents.toString().substring(1);
    }

    async getColumnTexts(columnNumber) {
        return await this.schemaTable.locator(`tbody tr td:nth-child(${columnNumber})`).allInnerTexts();        
    }
}