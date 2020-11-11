const { cpuUsage } = require("process");
const { createYield, isForInStatement } = require("typescript");

describe("Members Page", () => {
    let dumpCarRaseBaseUIUrl;
    let dumpCarRaseBaseAPIUrl;
    let lastMemberId = '34ef6d50-1af8-11eb-9619-7bd0236f9c77';
    before(() => {
        dumpCarRaseBaseUIUrl = Cypress.env('baseUrl');
        dumpCarRaseBaseAPIUrl = Cypress.env('api_server');

        cy.fixture('members.json').as("membersJSON");
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/members', '@membersJSON').as('getAllMembers').its('status').should('eq', 200);
        cy.visit(dumpCarRaseBaseUIUrl).then(() => {
            cy.wait('@getAllMembers');
        });
    })
    it('uses modules', () => {
        expect(true).to.equal(true);
    });
    it("should log cookies and check conentType text/html", () => {
        Cypress.Cookies.debug(true);
        cy.document().its('contentType').should('eq', 'text/html')
    });
    it("should check default router url /members", () => {
        cy.url().should('include', '/members');
        cy.title().should('eq', 'Dump Car Race')
    })
    it('should check members component', () => {
        expect(cy.get('.container-fluid')).to.exist
        cy.get('.toolbar')
            .should('contain', 'Welcome dump-car-race')
            .and('be.visible');
    });
    it('should check members table', () => {
        cy.get(".mat-header-cell").should("have.length", 6); // Column Length
        cy.get(".mat-column-firstname").should("have.length", 6); // Rows (5) + Header (1) = Total(6)   
    });
    it('should check members table edit button click Cancel', (done) => {
        cy.get(".mat-column-firstname").should("have.length", 6);
        cy.get(".mat-primary").last().as('lastEditBtn');
        cy.get('@lastEditBtn').should('be.not.disabled');
        cy.get('@lastEditBtn').click().wait(5);
        cy.url().should('include', '/members/' + lastMemberId);
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/members/' + lastMemberId).as('member').its('status').should('eq', 200);
        cy.get('@member').then((member) => {
            cy.get('input[name="firstname"]').should('have.value', '5');
            cy.get('#matcancelbutton').as('cancelBtn')
            cy.get('@cancelBtn').should('be.not.disabled');
            cy.get('@cancelBtn').click();
            cy.url().should('include', '/members');
            done();
        });
    });
    it('should check members table edit button click Save', (done) => {
        cy.get(".mat-primary").last().as('lastEditBtn');
        cy.get('@lastEditBtn').should('be.not.disabled');
        cy.get('@lastEditBtn').click();
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/members/' + lastMemberId).as('member').its('status').should('eq', 200);
        cy.get('@member')
        .then((member) => {
            cy.wait('@member');
            cy.url().should('include', '/members/' + lastMemberId);
            cy.get('input[name="firstname"]').should('have.value', '5');
            cy.get('#matsubmitbutton').as('submitBtn')
            cy.get('@submitBtn').should('be.not.disabled');
            cy.get('@submitBtn').click();
            cy.route(dumpCarRaseBaseAPIUrl + '/api/members/' + lastMemberId, cy.get('@member')).as('member').its('status').should('eq', 200);
            cy.url().should('include', '/members');
            done();
        });
    });
    it('should check members table delete button click Yes', (done) => {
        cy.get(".mat-warn").last().as('lastDeleteBtn');
        cy.get('@lastDeleteBtn').should('be.not.disabled');
        cy.get('@lastDeleteBtn').click();
        cy.url().should('include', '/members');
        cy.get('#matDialogDeleteYes').as('yesDeleteBtn')
        cy.get('@yesDeleteBtn').should('be.not.disabled');
        cy.get('@yesDeleteBtn').click();
        cy.url().should('include', '/members');
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/members/' + lastMemberId).as('member').its('status').should('eq', 200);
        done();
    });
    it('should check members table delete button click No', (done) => {
        cy.get(".mat-warn").last().as('lastDeleteBtn').wait(1);
        cy.get('@lastDeleteBtn').should('be.not.disabled');
        cy.get('@lastDeleteBtn').click();
        cy.url().should('include', '/members');
        cy.get('#matDialogDeleteNo').as('noDeleteBtn').wait(1);
        cy.get('@noDeleteBtn').should('be.not.disabled');
        cy.get('@noDeleteBtn').click({ force: true }).wait(1);
        cy.url().should('include', '/members');
        done();
    });
    it('should check members table Add New Member Save', (done) => {
        cy.get('#mataddmemberbutton').as('addNewMember');
        cy.get('@addNewMember').should('be.not.disabled');
        cy.get('@addNewMember').click();
        cy.url().should('include', '/members/' + '-1').wait(2);
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/teams').as('teams').its('status').should('eq', 200);
        cy.get('@teams');
        cy.get('input[name="firstname"]').should('have.value', '');
        cy.get('input[name="lastname"]').should('have.value', '');
        cy.get('#matsubmitbutton').as('submitBtn')
        cy.get('@submitBtn').should('be.disabled');
        cy.get('input[name="firstname"]').type('x');
        cy.get('input[name="lastname"]').type('y');
        cy.get('input[name="jobtitle"]').type('XY');
        cy.get('[type="radio"]').first().check({ force: true });
        cy.get('#memberteams').click();
        cy.get('#memberteam').contains("Formula 1 - Car 77").then(option => {
            cy.wrap(option).contains("Formula 1 - Car 77");
            option[0].click();
        });
        cy.get('@submitBtn').should('be.not.disabled');
        cy.get('@submitBtn').click();
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/members').as('member').its('status').should('eq', 200);
        cy.url().should('include', '/members');
        done();
    });
    it('should check members table Add New Member', (done) => {
        cy.get('#mataddmemberbutton').as('addNewMember');
        cy.get('@addNewMember').should('be.not.disabled');
        cy.get('@addNewMember').click();
        cy.url().should('include', '/members/' + '-1');
        cy.server();
        cy.route(dumpCarRaseBaseAPIUrl + '/api/teams').as('teams').its('status').should('eq', 200);
        cy.get('@teams');
        cy.get('#matcancelbutton').as('cancelBtn');
        cy.get('@cancelBtn').should('be.not.disabled');
        cy.get('@cancelBtn').click();
        cy.url().should('include', '/members');
       done();
    });
});