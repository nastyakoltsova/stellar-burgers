/// <reference types="cypress" />

const ACCESS_TOKEN = 'Bearer test-access-token';
const REFRESH_TOKEN = 'test-refresh-token';

Cypress.Commands.add('setAuthTokens', () => {
  cy.setCookie('accessToken', ACCESS_TOKEN, { path: '/' });
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', REFRESH_TOKEN);
  });
});

Cypress.Commands.add('clearAuthTokens', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('visitWithAuth', (url = '/') => {
  cy.setAuthTokens();
  cy.visit(url);
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;
      visitWithAuth(url?: string): Chainable<void>;
    }
  }
}

export { ACCESS_TOKEN, REFRESH_TOKEN };
