/// <reference types="cypress" />

const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';
const SAUCE_NAME = 'Соус Spicy-X';
const BUN_ID = '643d69a5c3f7b9001cfa093c';
const MAIN_ID = '643d69a5c3f7b9001cfa0941';
const SAUCE_ID = '643d69a5c3f7b9001cfa0943';

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.clearAuthTokens();

    cy.intercept('GET', '**/ingredients**', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user**', { fixture: 'user.json' }).as(
      'getUser'
    );
  });

  describe('добавление ингредиентов в конструктор', () => {
    beforeEach(() => {
      cy.visitConstructor();
    });

    it('добавляет булку, начинку и соус в конструктор', () => {
      cy.addIngredientByName(BUN_NAME);
      cy.get('[data-cy="constructor-bun-1"]').should('contain', BUN_NAME);
      cy.get('[data-cy="constructor-bun-2"]').should('contain', BUN_NAME);

      cy.addIngredientByName(MAIN_NAME);
      cy.get(`[data-cy="constructor-ingredient-${MAIN_ID}"]`).should(
        'contain',
        MAIN_NAME
      );

      cy.addIngredientByName(SAUCE_NAME);
      cy.get(`[data-cy="constructor-ingredient-${SAUCE_ID}"]`).should(
        'contain',
        SAUCE_NAME
      );
    });
  });

  describe('модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.visitConstructor();
    });

    it('отображает данные ингредиента, по которому кликнули', () => {
      cy.get(`[data-cy="ingredient-${BUN_ID}"]`)
        .find('[data-cy="ingredient-link"]')
        .click();
      cy.get('[data-cy="modal"]').should('be.visible').and('contain', BUN_NAME);

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get(`[data-cy="ingredient-${MAIN_ID}"]`)
        .find('[data-cy="ingredient-link"]')
        .click();
      cy.get('[data-cy="modal"]').should('be.visible').and('contain', MAIN_NAME);
    });

    it('закрывает модальное окно по оверлею', () => {
      cy.get(`[data-cy="ingredient-${MAIN_ID}"]`)
        .find('[data-cy="ingredient-link"]')
        .click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('оформление заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );
      cy.visitConstructor({ withAuth: true });
    });

    afterEach(() => {
      cy.clearAuthTokens();
    });

    it('оформляет заказ, показывает номер и очищает конструктор', () => {
      cy.addIngredientByName(BUN_NAME);
      cy.addIngredientByName(MAIN_NAME);

      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('have.text', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-empty-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-empty-fillings"]').should('be.visible');
    });
  });
});
