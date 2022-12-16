import { test, expect } from '@playwright/test';
import { HomePageObject } from './pageObjects/homePageObject';
import { typeInDebounceTextBox } from './testHelper';

let homePage = null;

test.describe('The homepage', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageObject(page);
        await homePage.goto();        
    });

    test.skip('shows dismissable non-prod warning message', async () => {
        await expect(homePage.nonProdWarning).toBeVisible();
        await homePage.dismissNonProdWarning();
        await expect(homePage.nonProdWarning).not.toBeVisible();        
    }); 

    test.skip('shows all filters when advanced search is selected', async () => {
        
        // check the advanced search box
        await homePage.setAdvancedSearch(true);
        await expect(homePage.recordNumberMode).toBeVisible();

        // check filters are all displayed
        await expect(homePage.freeTextSearchTextBox).toBeVisible();       

        await expect(homePage.recordNumberMode).toBeVisible();
        await expect(homePage.recordNumberMinTextBox).toBeVisible();
        await expect(homePage.recordNumberMaxTextBox).toBeVisible();
        
        await expect(homePage.autoMode).toBeVisible();
        await expect(homePage.autoMinTextBox).toBeVisible();
        await expect(homePage.autoMaxTextBox).toBeVisible();

        await expect(homePage.dateSearchMode).toBeVisible();        
        await expect(homePage.dateBetweenFirstTextBox).toBeVisible();
        await expect(homePage.dateBetweenLastTextBox).toBeVisible();

        await expect(homePage.titleSearchMode).toBeVisible();
        await expect(homePage.titleSearchTextBox).toBeVisible();

        await expect(homePage.sizeMode).toBeVisible();
        await expect(homePage.sizeLargeCheckBox).toBeVisible();
        await expect(homePage.sizeMediumCheckBox).toBeVisible();
        await expect(homePage.sizeSmallCheckBox).toBeVisible();

        await expect(homePage.colourMode).toBeVisible();
        await expect(homePage.colourMultiSelectWrapper).toBeVisible();

        await expect(homePage.likesMode).toBeVisible();
        await expect(homePage.likesMultiSelectWrapper).toBeVisible();

        await expect(homePage.foodMultiSelectWrapper).toBeVisible();

        await expect(homePage.drinksMode).toBeVisible();  
        await expect(homePage.drinksDropDownList).toBeVisible();    

        await expect(homePage.threeCharColourMode).toBeVisible();  
        await expect(homePage.threeCharColourMultiSelectWrapper).toBeVisible();  
    });

    test.skip('shows only default filters when advanced search is deselected', async () => {
        
        await homePage.setAdvancedSearch(false);

        // validate the initial state
        await expect(homePage.freeTextSearchTextBox).toBeVisible();       

        await expect(homePage.recordNumberMode).not.toBeVisible();
        await expect(homePage.recordNumberMinTextBox).not.toBeVisible();
        await expect(homePage.recordNumberMaxTextBox).not.toBeVisible();
        
        await expect(homePage.autoMode).not.toBeVisible();
        await expect(homePage.autoMinTextBox).not.toBeVisible();
        await expect(homePage.autoMaxTextBox).not.toBeVisible();

        await expect(homePage.dateSearchMode).toBeVisible();        
        await expect(homePage.dateBetweenFirstTextBox).toBeVisible();
        await expect(homePage.dateBetweenLastTextBox).toBeVisible();

        await expect(homePage.titleSearchMode).not.toBeVisible();
        await expect(homePage.titleSearchTextBox).not.toBeVisible();

        await expect(homePage.sizeMode).not.toBeVisible();
        await expect(homePage.sizeLargeCheckBox).not.toBeVisible();
        await expect(homePage.sizeMediumCheckBox).not.toBeVisible();
        await expect(homePage.sizeSmallCheckBox).not.toBeVisible();

        await expect(homePage.colourMode).not.toBeVisible();
        await expect(homePage.colourMultiSelectWrapper).not.toBeVisible();

        await expect(homePage.likesMode).not.toBeVisible();
        await expect(homePage.likesMultiSelectWrapper).not.toBeVisible();

        await expect(homePage.foodMultiSelectWrapper).toBeVisible();

        await expect(homePage.drinksMode).toBeVisible();  
        await expect(homePage.drinksDropDownList).toBeVisible();    

        await expect(homePage.threeCharColourMode).not.toBeVisible();  
        await expect(homePage.threeCharColourMultiSelectWrapper).not.toBeVisible();  

        await expect(homePage.orderKey).not.toBeVisible();  
        await expect(homePage.orderDirection).not.toBeVisible(); 
    });

    // sort    
    test.skip('shows sort options when search results are displayed', async () => {
        await expect(homePage.orderKey).not.toBeVisible();
        await expect(homePage.orderDirection).not.toBeVisible();
        
        await homePage.freeTextSearchTextBox.type("pizza");

        await expect(homePage.orderKey).toBeVisible();
        await expect(homePage.orderDirection).toBeVisible();
    });

    // free text
    test.skip('displays records match free text search', async () => {        
        await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");
        
        const count = await homePage.getSummaryCardCount();
        expect(count).toBe(1);

        const text = await homePage.getFirstSummaryCardText();
        expect(text).toContain("Record one");

    });

    test.skip('matches records that contain all free text terms', async () => {        
        await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza chips");
        
        const count = await homePage.getSummaryCardCount();
        expect(count).toBe(1);

        const text = await homePage.getFirstSummaryCardText();
        expect(text).toContain("Record one");
    });

    test.skip('doesn\'t match records that don\'t contain all free text terms', async () => {        
        await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza bacon");
        const count = await homePage.getSummaryCardCount();
        expect(count).toBe(0);
    });

});