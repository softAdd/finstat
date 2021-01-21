import { getByDataId } from '../utils';
// @ts-ignore
describe('Auth module render', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl as string);
  });

  it('should open login page as initial page', () => {
    cy.location('pathname').should('eq', '/auth');
    getByDataId('link-register');
  });

  it('should open register page by click on link', () => {
    getByDataId('link-register').click();
    getByDataId('link-login');
    cy.location('pathname').should('eq', '/auth');
  });

  it('should open login page by click on link', () => {
    getByDataId('link-register').click();
    getByDataId('link-login').click();
    getByDataId('link-register');
  });
});

describe('Auth module functionality', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl as string);
  });

  it('should enter to dashboard', () => {
    getByDataId('input-login').type('test');
    getByDataId('input-password').type('test');
    cy.intercept('POST', '/jwt-auth/login', { fixture: 'test-user.json' });
    getByDataId('submit').click();
    getByDataId('dashboard-layout');
  });

  it('should show login error', () => {
    getByDataId('input-login').type('wrongLogin');
    getByDataId('input-password').type('wrongPassword');
    getByDataId('submit').click();
    getByDataId('login-error');
  });

  it('should show register error', () => {
    getByDataId('link-register').click();
    getByDataId('input-login').type('wrongLogin');
    getByDataId('input-password').type('wrongPassword');
    getByDataId('input-email').type('wrong@email.com');
    getByDataId('submit').click();
    getByDataId('register-error');
  });
});
