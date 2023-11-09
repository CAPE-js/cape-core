import { expect, test } from '@playwright/test'
import { DetailsPageObject } from './pageObjects/detailsPageObject'
import { buildRecordUrl } from './testSiteUrls'

let detailsPage = null

test.describe('The record details page', () => {
  test('displays record details', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(1)

    expect(await detailsPage.getCardTitleText()).toBe('Record #1')
    expect(await detailsPage.getRecordNumberText()).toBe('1')
    expect(await detailsPage.getDateText()).toBe('Monday, 1 January 2001')
    expect(await detailsPage.getTitleText()).toBe('Record one')
    expect(await detailsPage.getSizeText()).toBe('Small')
    expect(await detailsPage.getColourText()).toBe('Red; Blue')
    expect(await detailsPage.getThreeCharColourText()).toBe('Red; Blu')
    expect(await detailsPage.getWeightText()).toBe('23')
    expect(await detailsPage.getLikesText()).toBe('Pizza; Chips; Beer; Wine')
    expect(await detailsPage.getFoodText()).toBe('Pizza; Chips')
    expect(await detailsPage.getDrinksText()).toBe('Beer; Wine')
  })

  test('includes a next link', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(1)
    expect(await detailsPage.nextLink.isVisible()).toBeTruthy()
  })

  test('does not include a next link when the record is the last in the set', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(4)
    expect(await detailsPage.nextLink.isVisible()).toBeFalsy()
  })

  test('clicking the "next" link on record 1 takes you to record 2', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(1)
    const expectedDestinationUrl = buildRecordUrl(2)

    await detailsPage.nextLink.click()

    await expect(detailsPage.page).toHaveURL(expectedDestinationUrl)
  })

  test('includes a previous link', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(4)
    expect(await detailsPage.previousLink.isVisible()).toBeTruthy()
  })

  test('does not include a previous link when the record is the first in the set', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(1)
    expect(await detailsPage.previousLink.isVisible()).toBeFalsy()
  })

  test('clicking the "previous" link on record 2 takes you to record 1', async ({ page }) => {
    detailsPage = new DetailsPageObject(page)
    await detailsPage.goto(2)
    const expectedDestinationUrl = buildRecordUrl(1)

    await detailsPage.previousLink.click()

    await expect(detailsPage.page).toHaveURL(expectedDestinationUrl)
  })
})
