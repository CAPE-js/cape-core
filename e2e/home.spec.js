import { test, expect } from '@playwright/test';
import { HomePageObject } from './pageObjects/homePageObject';
import { typeInDebounceTextBox, ModeOption } from './testHelper';

let homePage = null;

test.describe('The homepage', () => {    

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageObject(page);
        await homePage.goto();        
    });

    test('shows dismissable non-prod warning message', async () => {
        await expect(homePage.nonProdWarning).toBeVisible();
        await homePage.dismissNonProdWarning();
        await expect(homePage.nonProdWarning).not.toBeVisible();        
    }); 

    test('shows all filters when advanced search is selected', async () => {
        
        // check the advanced search box
        await homePage.toggleAdvancedSearch();
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

    test('shows only default filters when advanced search is deselected', async () => {
        
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

    test.describe('search', () => {

        test('indicates when there are no matching search results', async () => {
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "bananas in pyjamas");
            await expect(homePage.noMatchingRecordsMessage).toBeVisible();
        });

        test('displays the number of search results when searching for "pizza"', async () => {
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");
            const recordCountMessageTop = await homePage.recordCountMessages.first().innerText();
            const recordCountMessageBottom = await homePage.recordCountMessages.last().innerText();
            
            const expectedMessage = "Showing all 1 matching records.";
            expect(recordCountMessageTop).toBe(expectedMessage);
            expect(recordCountMessageBottom).toBe(expectedMessage);
        });

        test('displays record title, number and date', async () => {
           await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");
           const firstResultText = await homePage.getSummaryCardText(0);
           expect(firstResultText).toBe("templateSummaryCard\nRecord one\nMonday, 1 January 2001");
        });
            
    });

    test.describe('sort', () => {

        test('shows sort options when search results are displayed', async () => {
            await expect(homePage.orderKey).not.toBeVisible();
            await expect(homePage.orderDirection).not.toBeVisible();
            
            await homePage.freeTextSearchTextBox.type("pizza");
    
            await expect(homePage.orderKey).toBeVisible();
            await expect(homePage.orderDirection).toBeVisible();
        });
    
        test('sorts results', async () => {
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "chips");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
            
            // sort by date ascending
            await homePage.orderByDateAscending();
            let summary1Text = await homePage.getSummaryCardText(0);
            let summary2Text = await homePage.getSummaryCardText(1);
            expect(summary1Text).toContain("Record one");
            expect(summary2Text).toContain("Record two");

            // sort by date descending
            await homePage.orderByDateAscending();
        });
        
    });
    
    test.describe('free text search', () => {

        test('displays records that match \'pizza\'', async () => {        
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");
            
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
    
            const text = await homePage.getSummaryCardText(0);
            expect(text).toContain("Record one");    
        });
    
        test('displays records that contain both \'pizza\' and \'chips\'', async () => {        
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza chips");
            
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
    
            const text = await homePage.getSummaryCardText(0);
            expect(text).toContain("Record one");
        });
    
        test('doesn\'t display records that don\'t contain both \'pizza\' and \'bacon\'', async () => {        
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza bacon");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(0);
        });    
            
    });
    
    test.describe('record number search', () => {

        test('displays records where the a record number is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setRecordNumberMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(4);
        });

        test('displays records where the a record number is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setRecordNumberMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(0);
        });
        
        test('displays records where the record number is 1', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setRecordNumberMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.recordNumberTextBox, "1")
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });

        test('displays records where the record number is between two values', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setRecordNumberMode(ModeOption.BETWEEN);
            await typeInDebounceTextBox(homePage.recordNumberMinTextBox, "1")
            await typeInDebounceTextBox(homePage.recordNumberMaxTextBox, "3")
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);
        });
    
    });    
    
    test.describe('auto value search', () => {

        test('displays records where an auto value is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setAutoMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(4);
        });
    
        test('displays records where an auto value is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setAutoMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(0);
        });
        
        test('displays records where the auto value matches a specified value', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setAutoMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.autoTextBox, "1")
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });
    
        test('displays records where the auto value is between two values', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setAutoMode(ModeOption.BETWEEN);
            await typeInDebounceTextBox(homePage.autoMinTextBox, "1")
            await typeInDebounceTextBox(homePage.autoMaxTextBox, "2")
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });    
    });
    
    test.describe('date search', () => {

        // date
        test('displays records where the date is present', async () => {
            await homePage.setDateMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);
        });

        test('displays records where the date is not present', async () => {
            await homePage.setDateMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });
        
        test('displays records where the date matches a specified value in ISO format', async () => {
            await homePage.setDateMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.dateSearchTextBox, "2001-01-01");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });

        test('displays records where the date is between two values in ISO format', async () => {
            await homePage.setDateMode(ModeOption.BETWEEN);
            await typeInDebounceTextBox(homePage.dateBetweenFirstTextBox, "2000-12-31");
            await typeInDebounceTextBox(homePage.dateBetweenLastTextBox, "2001-01-02");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });
        
    });
        
    test.describe('title search', () => {

        test('displays records where a title is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);
        });

        test('displays records where a title is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });
        
        test('displays records where the title matches a specified value', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.titleSearchTextBox, "Record one");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });

        test('displays records where the title matches a specified value ignoring casing', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.titleSearchTextBox, "record ONE");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });

        test('displays records where the title contains a specified value', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.CONTAINS);
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "two");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });    

        test('displays records where the title contains a specified value ignoring casing', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setTitleMode(ModeOption.CONTAINS);
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "two");
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });    
    });

    test.describe('size search', () => {

        test('displays records where a size is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setSizeMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);
        });

        test('displays records where a size is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setSizeMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });
        
        test('displays records where the size is \'medium\' or \'small\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setSizeMode(ModeOption.ONE_OF);
            await homePage.sizeMediumCheckBox.check();
            await homePage.sizeSmallCheckBox.check();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });

        test('displays records where the title is \'large\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setSizeMode(ModeOption.IS);
            await homePage.setSizeLarge();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });    
    });

    test.describe('colour search', () => {

        test('displays records where a colour is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setColourMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);    
        });

        test('displays records where a colour is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setColourMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });
        
        test('displays records where the colour is \'red\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setColourMode(ModeOption.IS);
            await homePage.setColourRed();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });

        test('displays records where the colour is \'red\' or \'yellow\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setColourMode(ModeOption.ONE_OF);
            await homePage.pickColourMultiSelectOptions(['Red', 'Yellow']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);
        });    

    });

    test.describe('likes search', () => {

        test('displays records where a likes value is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setLikesMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);    
        });

        test('displays records where a likes value is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setLikesMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });
        
        test('displays records where likes is \'water\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setLikesMode(ModeOption.IS);
            await homePage.setLikesToWater();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });

        test('displays records where likes is \'pop\' or \'wine\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setLikesMode(ModeOption.ONE_OF);
            await homePage.pickLikesMultiSelectOptions(['Pop', 'Wine']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });    

    });

    test.describe('food search', () => {

        test('displays records where food is \'pizza\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.pickFoodMultiSelectOptions(['Pizza']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);
        });    
        
        test('displays records where food is \'pizza\' or \'chips\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.pickFoodMultiSelectOptions(['Pizza', 'Chips']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });    
    });

    test.describe('drinks search', () => {

        test('displays records where a drinks value is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setDrinksMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);    
        });

        test('displays records where a drinks value is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setDrinksMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });
        
        test('displays records where drink is \'water\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setDrinksMode(ModeOption.IS);
            await homePage.setDrinksToWater();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });

        test('displays records where drink is \'pop\' or \'wine\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setDrinksMode(ModeOption.ONE_OF);
            await homePage.pickDrinksMultiSelectOptions(['Pop', 'Wine']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);
        });  
    });

    test.describe('3 character colour search', () => {

        test('displays records where a colour code is present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setThreeCharColourMode(ModeOption.IS_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(3);    
        });

        test('displays records where a colour code is not present', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setThreeCharColourMode(ModeOption.IS_NOT_PRESENT);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });
        
        test('displays records where colour code is \'Blu\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setThreeCharColourMode(ModeOption.IS);
            await homePage.setThreeCharColourToBlu();
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);    
        });

        test('displays records where colour code is \'Blu\' or \'Yel\'', async () => {
            await homePage.toggleAdvancedSearch();
            await homePage.setThreeCharColourMode(ModeOption.ONE_OF);
            await homePage.pickThreeCharColourMultiSelectOptions(['Blu', 'Yel']);
            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(2);    
        });    

    });

    test.describe('when combining search fields', () => {
        
        test('displays record one when all search fields match record one values', async () => {
            
            await homePage.toggleAdvancedSearch();           
            
            // all search values match record one values 
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");
            
            await homePage.setRecordNumberMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.recordNumberTextBox, "1")

            await homePage.setDateMode(ModeOption.BETWEEN);
            await typeInDebounceTextBox(homePage.dateBetweenFirstTextBox, "2000-12-31");
            await typeInDebounceTextBox(homePage.dateBetweenLastTextBox, "2001-01-02");

            await homePage.setTitleMode(ModeOption.CONTAINS);
            await typeInDebounceTextBox(homePage.titleSearchTextBox, "one");

            await homePage.setSizeMode(ModeOption.IS);
            await homePage.setSizeSmall();

            await homePage.setColourMode(ModeOption.IS);
            await homePage.setColourBlue();
            
            await homePage.setLikesMode(ModeOption.ONE_OF);
            await homePage.pickLikesMultiSelectOptions(['Wine']);

            await homePage.pickFoodMultiSelectOptions(['Pizza', 'Chips']);

            await homePage.setDrinksMode(ModeOption.IS);
            await homePage.setDrinksToWine();

            await homePage.setThreeCharColourMode(ModeOption.IS);
            await homePage.setThreeCharColourToBlu();

            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(1);    
        });

        test('does not display any records when not all fields match record values', async () => {
            await homePage.toggleAdvancedSearch();           
            
            // this search value matches record one values
            await typeInDebounceTextBox(homePage.freeTextSearchTextBox, "pizza");

            // but this search field does not match record one value
            await homePage.setRecordNumberMode(ModeOption.IS);
            await typeInDebounceTextBox(homePage.recordNumberTextBox, "10");

            const count = await homePage.getSummaryCardCount();
            expect(count).toBe(0);    

        });
        
    });
    
});