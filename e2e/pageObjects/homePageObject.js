import { BasePageObject } from "./basePageObject";
import { rootUrl } from "../testSiteUrls"

export class HomePageObject extends BasePageObject {

    constructor(page) {
        super(page, rootUrl);        
        this.nonProdWarning = this.page.locator("#non-prod-warning");
        this.nonProdWarningCloseButton = this.nonProdWarning.locator(".dismissable");        
    }

    async dismissNonProdWarning() {
        await this.nonProdWarningCloseButton.click();    
    }
}

