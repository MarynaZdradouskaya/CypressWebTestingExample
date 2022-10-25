/// <reference types="cypress" />




describe('My test suite', () => {
   
    it('Different ways to find an element', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
      
        //by Tag name
      cy.get('input')

      //by ID
      cy.get('#inputEmail')

  //by Class name
  cy.get('.input-full-width')

  //by Attribute name
  cy.get('[placeholder]')

  //by Attribute name and value
  cy.get('[placeholder="Email"]')

  //by Class value
  cy.get('[class="input-full-width size-medium shape-rectangle"]')
      
  //by Tag name and Attribute with value
  cy.get('input[data-cy="imputEmail1"]')
  cy.get('input[placeholder="Email"]')

  //by two different attributs
  cy.get('[placeholder="Email"][type="email"]')

  //by Tag name, Attribute with value, ID and Class name
  cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

  //The most recommended way by Cypress 
  cy.get('[data-cy="imputEmail1"]')
    })

    it('.parents and .find', () => {
      cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
cy.contains('Sign in')

cy.contains('[status="warning"]', 'Sign in')

cy.get('#inputEmail3')
.parents('form')
.find('button')
.should('contain', 'Sign in')
.parents('form')
.find('nb-checkbox')
.click({force: true})

cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })
    it('.then style', () => {
      cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //symple method

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        //-then- cypress style

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
          const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
          const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
          expect(emailLabelFirst).to.equal('Email')
          expect(passwordLabelFirst).to.equal('Password')
 
          cy.contains('nb-card', 'Basic form').then(secondForm => {
const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()

cy.wrap(firstForm).find('[for="inputEmail1"]').should('contain', 'Email')
cy.wrap(firstForm).find('[for="inputPassword2"]').should('contain', 'Password')
cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')
cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
  
          })
          })
      

})
it('How work with text', () => {
  cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1. Get an element with unique attribute and assert its text
    cy.get('[for="exampleInputEmail1"]')
    .should('contain', 'Email address')
    .should('have.class', 'label')
    .and('have.text', 'Email address')
    

    //2. Use input as JQuery element, use JQuery method text() and make the assertion for the text
    cy.get('[for="exampleInputEmail1"]').then( label => {
      expect(label.text()).to.equal('Email address')
      expect(label).to.have.class('label')
      expect(label).to.have.text('Email address')
    })

    //3. Use cypress invoke method to get the text as a parametre of function and make the assertion for the text
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
      expect(text).to.equal('Email address')

      cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked') //or
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
    })

    
})
it.only('Datepicker', () =>{
  function selectDayFromCurrent(day){
    let date = new Date() // new object
date.setDate(date.getDate() + day) //method returnes the current day of the month, the result of this function will be a new day + n days
let futureDay = date.getDate()
//let futureMonth = date.getMonth() //method returnes the number of month
let futureMonth = date.toLocaleString('default', {month: 'short'})
let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()


    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
      if( !dateAttribute.includes(futureMonth)){
        cy.get('[data-name="chevron-right"]').click()
        selectDayFromCurrent(day)

      } else {
        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
      }
    })
    return dateAssert
  }

  cy.visit('/')
  cy.contains('Forms').click()
  cy.contains('Datepicker').click()
         

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
    cy.wrap(input).click()
    let dateAssert = selectDayFromCurrent(300)      
    cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    cy.wrap(input).should('have.value', dateAssert)
    
  })
    
})

it('Radio buttons', ()=> {
  cy.visit('/')
  cy.contains('Forms').click()
  cy.contains('Form Layouts').click()

  cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
    cy.wrap(radioButtons)
    .first()
    .check({force: true})
    .should('be.checked')

    cy.wrap(radioButtons)
    .eq(1)
    .check({force: true})

    cy.wrap(radioButtons)
    .eq(0)
    .should('not.be.checked')

    cy.wrap(radioButtons)
    .eq(2)
    .should('be.disabled')
  })

})


it('Checkboxes', ()=> {
  cy.visit('/')
  cy.contains('Modal & Overlays').click()
  cy.contains('Toastr').click()

cy.get('[type="checkbox"]').check({force: true})
cy.get('[type="checkbox"]').eq(0).click({force: true})
cy.get('[type="checkbox"]').eq(1).check({force: true})


})

it('List and dropdowns', () => {
  cy.visit('/')

//1. Select an option and assert background-color

 /cy.get('nav nb-select').click()
  cy.get('.options-list').contains('Dark').click()
  cy.get('nav nb-select').should('contain', 'Dark')
  cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

//2. Iterate the options and assert background-color for each one

cy.get('nav nb-select').then( dropdown => {
  cy.wrap(dropdown).click()
  cy.get('.options-list nb-option').each( (listItem, index) => {
    const itemText = listItem.text().trim()

    const colors = { 
      "Light": "rgb(255, 255, 255)",
       "Dark": "rgb(34, 43, 69)",
       "Cosmic": "rgb(50, 50, 89)",
       "Corporate": "rgb(255, 255, 255)",
}

cy.wrap(listItem).click()
cy.wrap(dropdown).should('contain', itemText)
cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
if (index < 3){
  cy.wrap(dropdown).click()
}

  })
})

  })

  it('Web Table', ()=> {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1. Find the table row, change the column value and verify a new value
    cy.get('tbody').contains('tr', 'Larry').then( tableRow =>{
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

   //2. Add a new row and verify First name and Last name
   cy.get('thead').find('.nb-plus').click()
   cy.get('thead').find('tr').eq(2).then( tableRow => {
    cy.wrap(tableRow).find('[placeholder="First Name"]').type('Alex')
    cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Grate')
    cy.wrap(tableRow).find('.nb-checkmark').click()

   })
   cy.get('tbody tr').first().find('td').then( tableColumns => {
    cy.wrap(tableColumns).eq(2).should('contain', 'Alex')
    cy.wrap(tableColumns).eq(3).should('contain', 'Grate')
   })
  

   //3. Use filter and verify search result several search results

   const  age = [20, 30, 40, 200]

   cy.wrap(age).each( age => {
    cy.get('thead [placeholder="Age"]').clear().type(age)
    cy.wait(500)
    cy.get('tbody tr').each( tableRow => {
      if(age == 200){
        cy.wrap(tableRow).should('contain', 'No data found')
      } else {
     cy.wrap(tableRow).find('td').eq(6).should('contain', age)
    }
    })
    

   
  })

   

  })

  it('Tooltip', ()=> {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
    .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')

  })

  it('Dialog box', ()=> {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

   //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    const stub = cy.stub()
    cy.on('window:confirm', stub) 
    cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
  })


})