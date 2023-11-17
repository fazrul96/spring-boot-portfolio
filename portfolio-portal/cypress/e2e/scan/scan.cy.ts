/// <reference types="cypress" />

import { BrowserMultiFormatReader } from '@zxing/browser';
import {
  setFormattedDate
} from '../../utils/utils';

describe('QR Code', () => {
    beforeEach(() => {
        cy.visit('https://www.qr-code-generator.com/');
        cy.screenshot(setFormattedDate().formattedDate, {capture:'fullPage'});
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get(':nth-child(1) > .generator-navigation__nav-link > .generator-navigation__nav-link-inner > .generator-navigation__title').click();
        cy.get('.form-control').type('https://www.google.com/');
    })

    it('can read qrcode with zxing-js', () => {
      Cypress.Promise.resolve(cy.get('qrcg-generator-qr-code > svg'))
        .then(($el : any) => {
            const svg = $el[0].outerHTML;
            const image = new Image();
            image.src = 'data:image/svg+xml;base64,' + btoa(svg);
            image.crossOrigin = "Anonymous";
          return image;
          })
          .then((image) => {
            const reader = new BrowserMultiFormatReader();
            return reader.decodeFromImageElement(image);
          })
          .then((result) => {
            const url = result.getText();
            cy.log(url);

            // Open a new window with the QR code URL
            cy.window().then((win) => {
              win.open(url, '_blank');
            });
          });
    });
})