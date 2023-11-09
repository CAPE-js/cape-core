import { BasePageObject } from './basePageObject'
import * as fs from 'fs'
import * as path from 'path'
import os from 'os'
import { buildPath } from '../testSiteUrls'

export class DataPageObject extends BasePageObject {
  constructor (page) {
    super(page, buildPath('data'))
    this.copyrightNotice = this.page.locator('#copyright-notice')
    this.creator = this.page.locator('#creator')
    this.attribution = this.page.locator('#attribution')
    this.downloadJsonButton = this.page.locator('#button-download-json')
    this.downloadCsvButton = this.page.locator('#button-download-csv')
    this.schemaTable = this.page.getByRole('table')
  }

  async downloadFile (elementToClick, fileName) {
    const downloadPromise = this.page.waitForEvent('download')
    await elementToClick.click()
    const download = await downloadPromise
    const downloadPath = path.join(os.tmpdir(), fileName)
    await download.saveAs(downloadPath)
    const contents = await fs.promises.readFile(downloadPath, 'utf8')
    return this.trimDownloadContents(contents)
  }

  // Gets the downloaded json data.
  async downloadJson () {
    return await this.downloadFile(this.downloadJsonButton, 'cape-test.json')
  }

  // Gets the downloaded csv data.
  async downloadCsv () {
    return await this.downloadFile(this.downloadCsvButton, 'cape-test.csv')
  }

  // Downloaded files include an initial 'invisible' character, remove this.
  trimDownloadContents (downloadedContents) {
    return downloadedContents.toString().substring(1)
  }

  async getColumnTexts (columnNumber) {
    return await this.schemaTable.locator(`tbody tr td:nth-child(${columnNumber})`).allInnerTexts()
  }
}
