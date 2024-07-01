/// <reference types="cypress" />

const baseUrl = 'http://localhost:4000';
const getUserUrl = 'api/auth/user';
const postOrderUrl = 'api/orders';

const blueBunAddButton = '[data-cy=ingredient-item-one] button[type=button]';
const topBun = `[data-cy=bun-top]`;
const bottomBun = `[data-cy=bun-bottom]`;
const mainIngredientModal = '[data-cy=ingredient-link-four]';
const mainIngredientAddButton =
  '[data-cy=ingredient-item-four] button[type=button]';
const betweenBuns = '[data-cy=between-buns]';
const contentInModal = '[data-cy=modal-content]';
const closeModalButton = '[data-cy=modal-content] button[type=button]';
const modalOverlay = '[data-cy=modal-overlay]';
const makeOrderButton = '[data-cy=make-order-button]';

describe('Burger Constructor and Order Creation', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', getUserUrl, { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', postOrderUrl, { fixture: 'order.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem('refreshToken', JSON.stringify('9999999999'));
    cy.setCookie('accessToken', JSON.stringify('8888888888'));
    cy.visit(baseUrl);
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Constructor Functionality', () => {
    it('should add bun and ingredient to constructor', () => {
      cy.wait('@getIngredients');
      cy.get(blueBunAddButton).click();
      cy.get(topBun).contains('Краторная булка N-200i').should('exist');
      cy.get(bottomBun).contains('Краторная булка N-200i').should('exist');
      cy.get(mainIngredientAddButton).click();
      cy.get(betweenBuns).contains('Соус Spicy-X').should('exist');
    });

    it('should open and close ingredient modal', () => {
      cy.wait('@getIngredients');
      cy.get(mainIngredientModal).click();
      cy.get(contentInModal).should('exist');
      cy.get(closeModalButton).click();
      cy.get(contentInModal).should('not.exist');
    });

    it('should close modal on overlay click', () => {
      cy.wait('@getIngredients');
      cy.get(mainIngredientModal).click();
      cy.get(contentInModal).should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get(contentInModal).should('not.exist');
    });
  });

  describe('Order Creation', () => {
    it('should create an order and check order number', () => {
      cy.wait('@getIngredients');
      cy.get(blueBunAddButton).click();
      cy.get(mainIngredientAddButton).click();
      cy.get(makeOrderButton).click();
      cy.wait('@postOrder');
      cy.get(contentInModal).contains('12345').should('exist');
    });

    it('should close order modal and check constructor is empty', () => {
      cy.wait('@getIngredients');
      cy.get(blueBunAddButton).click();
      cy.get(mainIngredientAddButton).click();
      cy.get(makeOrderButton).click();
      cy.wait('@postOrder');
      cy.get(contentInModal).contains('12345').should('exist');
      cy.get(closeModalButton).click();
      cy.get(contentInModal).should('not.exist');
      cy.get(topBun).should('not.exist');
      cy.get(bottomBun).should('not.exist');
      cy.get(betweenBuns).should('not.exist');
    });
  });
});
