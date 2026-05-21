/// <reference types="cypress" />

export const ACCESS_TOKEN = 'Bearer test-access-token';
export const REFRESH_TOKEN = 'test-refresh-token';

Cypress.Commands.add('clearAuthTokens', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('addIngredientByName', (name: string) => {
  cy.contains(name)
    .parents('[data-cy^="ingredient-"]')
    .find('button')
    .contains('Добавить')
    .click();
});

Cypress.Commands.add('visitConstructor', (options?: { withAuth?: boolean }) => {
  if (options?.withAuth) {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.document.cookie = `accessToken=${encodeURIComponent(ACCESS_TOKEN)}; path=/`;
        win.localStorage.setItem('refreshToken', REFRESH_TOKEN);
      }
    });
    cy.wait('@getIngredients');
    cy.wait('@getUser');
    return;
  }

  cy.visit('/');
  cy.wait('@getIngredients');
});

declare global {
  namespace Cypress {
    interface Chainable {
      clearAuthTokens(): Chainable<void>;
      addIngredientByName(name: string): Chainable<void>;
      visitConstructor(options?: { withAuth?: boolean }): Chainable<void>;
    }
  }
}
