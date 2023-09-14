import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let randomJiraID: any; // Declare a variable to store the random Jira ID

Given("I visit duckduckgo.com", () => {
  cy.visit("https://duckduckgo.com/");
});

Then("I should see a search bar", () => {
  cy.get("input[type=text]").should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
});

When("I enter the search term {string}", (searchTerm: string) => {
  cy.get('#searchbox_input').type(searchTerm);
});

When("I click the search button", () => {
  cy.get('.searchbox_searchButton__F5Bwq').click();
});

Then("I should see search results", () => {
  // Add assertions for verifying search results here
  cy.get('#search_form_input').should('be.visible'); // Example assertion
});

Then("I should see no search results", () => {
  // Add assertions for verifying absence of search results here
  cy.get('.results').should('not.exist'); // Example assertion
});

// Placeholder for dynamic random term
Given("a random term is generated", () => {
  const randomTerms = ["Random Term 1", "Random Term 2", "Random Term 3"];
  const randomIndex = Math.floor(Math.random() * randomTerms.length);
  cy.wrap(randomTerms[randomIndex]).as('randomTerm');
});

// Placeholder for dynamic random Jira ID
Given("a random Jira ID is generated", () => {
  const randomJiraIDs = ["QA-101", "QA-202", "QA-303"];
  const randomIndex = Math.floor(Math.random() * randomJiraIDs.length);
  cy.wrap(randomJiraIDs[randomIndex]).as('randomJiraID');
});

Then("a random Jira ID is generated", () => {
  // Ensure that the random Jira ID is generated and stored
  if (!randomJiraID) {
    throw new Error("Random Jira ID not generated.");
  }
  
  // Use the randomJiraID variable in your test, for example:
  cy.log(`Random Jira ID: ${randomJiraID}`);
});