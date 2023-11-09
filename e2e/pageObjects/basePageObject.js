export class BasePageObject {
  constructor (page, url) {
    this.page = page
    this.url = url
  }

  async goto () {
    await this.page.goto(this.url)
  }
}
