import { BasePageObject } from "./basePageObject";

export class HomePageObject extends BasePageObject {

    constructor(page) {
        super(page, "http://localhost:8080/#");        
        this.nonProdWarning = this.page.locator("#non-prod-warning");
        this.nonProdWarningCloseButton = this.nonProdWarning.locator(".dismissable");        
    }

    async dismissNonProdWarning() {
        await this.nonProdWarningCloseButton.click();    
    }
}

