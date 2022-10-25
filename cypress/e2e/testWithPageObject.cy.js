/// <reference types="cypress" />

import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Page Objects', () => {

beforeEach('Open application', () => {
    cy.openHomePage()
})

it('Verify navigation accross the pages', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.toasterPage()
    navigateTo.smartTablePage()
    navigateTo.tooltipPage()
})
    
it.only('Should submit Inline and Basic form and select tomorrow day in the calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormwithNameAndEmail('Vlad', 'vlad@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('vlad2@test.com', 'password')
    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
    onSmartTablePage.updateAgeByFirstName('Artem', '37')
    onSmartTablePage.deleteRowByIndex(1)


 
})
})

