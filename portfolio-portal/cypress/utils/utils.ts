import { setScenario } from '../utils/constants';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { EnvConfig } from '../support/config/envConfig';

export function scanQrCode($attr: any) {
    Cypress.Promise.resolve($attr)
    .then(($el) => {
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
        cy.log('Qrcode Url:', JSON.stringify(url));

        // Remove due to external api has reach free limit usage
        // const coldStartEndpoint = Cypress.env('coldStartEndpoint');;
        // const apiUrl            = `${coldStartEndpoint}?url=${url}`;

        // cy.request({
        //     method: 'GET',
        //     url: coldStartEndpoint,
        //     headers: {
        //       'Accept': 'application/json'
        //     },
        //     timeout: 60000,
        //     retryOnStatusCodeFailure: true,
        //     retryOnNetworkFailure: true
        //   }).as('coldStartRequest');
        
        //   cy.request({
        //     method: 'GET',
        //     url: apiUrl,
        //     timeout: 120000,
        //     retryOnStatusCodeFailure: true,
        //     retryOnNetworkFailure: true
        //   }).as('paymentRequest');
      });
}

export function setEnvConfig(env: 'local' | 'sit' ): EnvConfig {
    let config: EnvConfig;

    switch (env) {
        case 'sit':
            config = Cypress.env('sit');
            break;
    
        default:
            config = Cypress.env('local');
            break;
      }

    const { baseUrl, username, password } = config;
    return { baseUrl, username, password };
};

export function setFormattedDate () {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
    
    const response = {
        date : date,
        month : month,
        year : year,
        formattedDate : formattedDate
    };
    
    return response;
};