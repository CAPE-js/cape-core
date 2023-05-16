import { BasePageObject } from "./basePageObject";
import { rootUrl } from "../testSiteUrls"
import { pickMultiSelectOption } from '../testHelper'

export class HomePageObject extends BasePageObject {

    constructor(page) {
        super(page, rootUrl);        

        // expose locators

        // warning
        this.nonProdWarning = this.page.locator("#non-prod-warning");
        this.nonProdWarningCloseButton = this.nonProdWarning.locator(".cape-dismissable");

        // intro
        this.introText = page.getByTestId('intro-text');

        // general form controls
        this.newSearchButtonTop = this.page.locator("#new-search-top");
        this.newSearchButtonBottom = this.page.locator("#new-search-bottom");
        this.advancedSearchTop = this.page.getByText("Advanced search");        
        
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
        this.dateBetweenFirstTextBox = this.page.locator("#filter-from-date");
        this.dateBetweenLastTextBox = this.page.locator("#filter-to-date");

        // title
        this.titleSearchMode = this.page.locator("#filter-text-mode-title");
        this.titleSearchTextBox = this.page.locator("#filter-title");
        
        // size
        this.sizeMode = this.page.locator("#filter-mode-size");
        this.sizeDropDownList = this.page.locator("#filter-size");
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
        this.recordCountMessages = this.page.locator('.cape-record-count');
        this.results = this.page.locator('#results');
        this.noMatchingRecordsMessage = this.page.locator('#cape-no-matching-results');
    }

    async dismissNonProdWarning() {
        await this.nonProdWarningCloseButton.click();    
    }

    // intro text
    async getIntroText() {
        return await this.introText.innerText();
    }

    // advanced search
    async toggleAdvancedSearch() {
        await this.advancedSearchTop.click();
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

    async getSummaryCardText(number) {
        const text = await this.results.locator(`.summary-card`).allInnerTexts();
        return text[number];
    }

    async orderByDateAscending() {
        await this.orderKey.selectOption("date");
        await this.orderDirection.selectOption("asc");
    }

    async orderByDateDescending() {
        await this.orderKey.selectOption("date");
        await this.orderDirection.selectOption("desc");
    }

    // record number
    async setRecordNumberMode(modeOption) {
        await this.recordNumberMode.selectOption(modeOption);
    }    

    // auto value
    async setAutoMode(modeOption) {
        await this.autoMode.selectOption(modeOption);
    }

    // date
    async setDateMode(modeOption) {
        await this.dateSearchMode.selectOption(modeOption);
    }

    // title
    async setTitleMode(modeOption) {
        await this.titleSearchMode.selectOption(modeOption);
    }

    // size
    async setSizeMode(modeOption) {
        await this.sizeMode.selectOption(modeOption);
    }

    async setSizeSmall() {
        await this.sizeDropDownList.selectOption("Small");
    }

    async setSizeMedium() {
        await this.sizeDropDownList.selectOption("Medium");
    }

    async setSizeLarge() {
        await this.sizeDropDownList.selectOption("Large");
    }

    // colour
    async setColourMode(modeOption) {
        await this.colourMode.selectOption(modeOption);
    }

    async setColourRed() {
        await this.colourDropDownList.selectOption("Red");
    }

    async setColourBlue() {
        await this.colourDropDownList.selectOption("Blue");
    }

    async pickColourMultiSelectOptions(selectedOptions) {
        const options = { 'Blue': 0, 'Red': 1, 'Yellow': 2 };
        
        for await (const value of selectedOptions) {
            const index = options[value];
            await pickMultiSelectOption(this.colourMultiSelectWrapper, index);
        }  
    }

    // likes
    async setLikesMode(modeOption) {
        await this.likesMode.selectOption(modeOption);
    }

    async setLikesToWater() {
        await this.likesDropDownList.selectOption("Water");
    }

    async pickLikesMultiSelectOptions(selectedOptions) {
        const options = { 'Beer': 0, 'Chips': 1, 'Pizza': 2, 'Pop': 3, 'Water': 4, 'Wine': 5 };
        
        for await (const value of selectedOptions) {
            const index = options[value];
            await pickMultiSelectOption(this.likesMultiSelectWrapper, index);
        }  
    }

    // food
    async pickFoodMultiSelectOptions(selectedOptions) {
        const options = { 'Chips': 0, 'Pizza': 1 };
        
        for await (const value of selectedOptions) {
            const index = options[value];
            await pickMultiSelectOption(this.foodMultiSelectWrapper, index);
        }  
    }

    // drinks
    async setDrinksMode(modeOption) {
        await this.drinksMode.selectOption(modeOption);        
    }

    async setDrinksToWater() {
        await this.drinksDropDownList.selectOption("Water");
    }

    async setDrinksToWine() {
        await this.drinksDropDownList.selectOption("Wine");
    }

    async pickDrinksMultiSelectOptions(selectedOptions) {
        const options = { 'Beer': 0, 'Pop': 1, 'Water': 2, 'Wine': 3};
        
        for await (const value of selectedOptions) {
            const index = options[value];
            await pickMultiSelectOption(this.drinksMultiSelectWrapper, index);
        }  
    }

    // three char colour mode
    async setThreeCharColourMode(modeOption) {
        await this.threeCharColourMode.selectOption(modeOption);
    }

    async setThreeCharColourToBlu() {
        await this.threeCharColourDropDownList.selectOption("Blu");
    }

    async pickThreeCharColourMultiSelectOptions(selectedOptions) {

        const options = { 'Blu': 0, 'Red': 1, 'Yel': 2};
        for await (const value of selectedOptions) {
            const index = options[value];
            await pickMultiSelectOption(this.threeCharColourMultiSelectWrapper, index);
        }        
    }
}