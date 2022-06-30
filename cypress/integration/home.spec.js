import '@axe-devtools/cypress';
describe('HR-a11y Home', () => {

    beforeEach(() => {
      cy.visit('/')
    });

    it('Should display Corporate Message', () => {
      cy.get('.card-header')
      .contains('Corporate Message')
    });

    it('Should have main content structured properly', () => {
      cy.get('#main-content > div > div:nth-child(2) > div.mb-4.card')
      .find('p')
      .contains('Request PTO')

      cy.get('.BlogPost_post__xZW53')
      .find('a')
      .contains('Incentivize brand power')
      .then(el => {
        cy.wrap(el)
          .invoke('attr', 'target')
          .should('equal', undefined);
      });
    });


    /** 
     * Axe Ruleset - running analysis against specific ruleset(s)
     * .setAxeRuleset('508' | 'wcag2' | 'wcag2.1')
     * Default param wcag2
     * 
     * Analyzes a page using wcag2.1
     * Creates a `results` object based on the ruleset
     * JSON file is create of the results
     * HTML file is created of the results
     */
    it('Should have an accessible homepage', () => {

      cy.location('href', {timeout: 6000}).should('eq', ''+Cypress.config().baseUrl + "/");

      cy.setAxeRuleset('wcag2.1').axeAnalyze({name: "home"});
      cy.getAxeResults().then(async results => {
        const resultsDir = './a11y-results/'
        await cy.writeFile(`${resultsDir}home.json`, results);
        await cy.task('reportAsHTML', { resultsDir });
        await cy.task('reportAsCSV', { resultsDir });
        await cy.task('reportAsJunit', {resultsDir});
        // expect(results.findings.violations).to.equal([]);
        cy.readFile(`${resultsDir}home.json`).then((data) =>{
          expect(data.findings.violations.length).to.equal(0);
        });
      })
    });

    it('Should have an accessible timesheet', () => {
      cy.location('href', {timeout: 6000}).should('eq', '' + Cypress.config().baseUrl + "/");
      let logTime = "#main-content > div > div:nth-child(1) > div:nth-child(1) > div > div > div:nth-child(2) > button.btn.btn-success.btn-lg.d-block.w-100";
      cy.get(logTime).click();
      cy.location('href', {timeout: 6000}).should('contain', '/timesheets');
      cy.axeAnalyze({name: "timeSheet"});
      cy.getAxeResults().then(async results => {
        const resultsDir = './a11y-results/'
        await cy.writeFile(`${resultsDir}timeSheet.json`, results);
        await cy.task('reportAsHTML', { resultsDir });
        // expect(results.findings.violations.length).to.equal(0);
        cy.readFile(`${resultsDir}timeSheet.json`).then((data) =>{
          expect(data.findings.violations.length).to.equal(0);
        });
      });
    });

    it('Should have an accessible PTO Request System', () => {
      cy.location('href', {timeout: 6000}).should('eq', "" + Cypress.config().baseUrl + "/");
      let PTORequest = "#openPTOModal"
      cy.get(PTORequest).click()
      cy.get("#type").select("Vacation");
      cy.get("#hours").type(8);
      cy.get("#description").type("A description of the PTO");
      cy.axeAnalyze({name: "PTORequest"});
      cy.get("#fake-submit-button").click();
      cy.getAxeResults().then(async results => {
        const resultsDir = './a11y-results/'
        await cy.writeFile(`${resultsDir}PTORequest.json`, results);
        // .then(cy.readFile(`${resultsDir}PTORequest.json`).its());
        await cy.task('reportAsHTML', { resultsDir });
        
        cy.readFile(`${resultsDir}PTORequest.json`).then((data) =>{
          expect(data.findings.violations.length).to.equal(0);
        });
        
        
      })

    });


  })