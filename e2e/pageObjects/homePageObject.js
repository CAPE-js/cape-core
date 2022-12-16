import { BasePageObject } from "./basePageObject";
import { rootUrl } from "../testSiteUrls"

export class HomePageObject extends BasePageObject {

    constructor(page) {
        super(page, rootUrl);        

        // expose locators

        // warning
        this.nonProdWarning = this.page.locator("#non-prod-warning");
        this.nonProdWarningCloseButton = this.nonProdWarning.locator(".dismissable");        
        
        // general form controls
        this.newSearchButtonTop = this.page.locator("#new-search-top");
        this.newSearchButtonBottom = this.page.locator("#new-search-bottom");
        this.advancedSearchTop = this.page.locator("#show-all-filters-top");
        this.advancedSearchBottom = this.page.locator("#show-all-filters-bottom");
        
        // freetext search
        this.freeTextSearchTextBox = this.page.locator("#filter-freetext");
        
        // record number
        this.recordNumberMode = this.page.locator("#filter-mode-record_number");
        this.recordNumberTextBox = this.page.locator("#filter-record_number");
        this.recordNumberMinTextBox = this.page.locator("#filter-min-record_number");
        this.recordNumberMaxTextBox = this.page.locator("#filter-max-record_number");

        // auto
        this.autoMode = this.page.locator("#filter-mode-auto");
        this.autoTextBox = this.page.locator("#filter-auto");
        this.autoMinTextBox = this.page.locator("#filter-min-auto");
        this.autoMaxTextBox = this.page.locator("#filter-max-auto");

        // date
        this.dateSearchMode = this.page.locator("#filter-mode-date");
        this.dateSearchTextBox = this.page.locator("#filter-date");
        this.dateBetweenFirstTextBox = this.page.locator("#filter-to-date");
        this.dateBetweenLastTextBox = this.page.locator("#filter-from-date");

        // title
        this.titleSearchMode = this.page.locator("#filter-text-mode-title");
        this.titleSearchTextBox = this.page.locator("#filter-title");
        
        // size
        this.sizeMode = this.page.locator("#filter-mode-size");
        this.sizeDropDownList = this.page.locator("filter-size");
        this.sizeLargeCheckBox = this.page.locator("#filter-size-Large");
        this.sizeMediumCheckBox = this.page.locator("#filter-size-Medium");
        this.sizeSmallCheckBox = this.page.locator("#filter-size-Small");

        // colour
        this.colourMode = this.page.locator("#filter-mode-colour");
        this.colourDropDownList = this.page.locator("#filter-colour");
        this.colourMultiSelectWrapper = this.page.locator("#filter-multiselect-wrapper-colour");

        // likes
        this.likesMode = this.page.locator("#filter-mode-likes");
        this.likesDropDownList = this.page.locator("#filter-likes");
        this.likesMultiSelectWrapper = this.page.locator("#filter-multiselect-wrapper-likes");

        // food
        this.foodMultiSelectWrapper = this.page.locator("#filter-multiselect-wrapper-foods");
        
        // drinks
        this.drinksMode = this.page.locator("#filter-mode-drinks");
        this.drinksDropDownList = this.page.locator("#filter-drinks");
        this.drinksMultiSelectWrapper =this.page.locator("#filter-multiselect-wrapper-drinks");

        // 3 char colour
        this.threeCharColourMode = this.page.locator("#filter-mode-colour3");
        this.threeCharColourDropDownList = this.page.locator("#filter-colour3");
        this.threeCharColourMultiSelectWrapper = this.page.locator("#filter-multiselect-wrapper-colour3");

        // order
        this.orderKey = this.page.locator("#order-key");
        this.orderDirection = this.page.locator("#order-direction");

        // search results
        this.recordCountTexts = this.page.locator('.record-count');
        this.results = this.page.locator('#results');
    }

    async dismissNonProdWarning() {
        await this.nonProdWarningCloseButton.click();    
    }

    // advanced search
    async setAdvancedSearch(checked) {
        await this.advancedSearchTop.setChecked(checked);
    }

    async getAdvancedSearch() {
        const checked = await this.advancedSearchTop.isChecked();
        return checked;
    }

    // search results
    async getSummaryCardCount() {
        const count = await this.results.locator(".summary-card").count();
        return count;
    }

    async getFirstSummaryCardText() {
        const text = await this.results.locator(".summary-card:nth-child(1)").allInnerTexts();
        return text.join();
    }
}

