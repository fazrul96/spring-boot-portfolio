Feature: Google Search Test

@GoogleTest
Scenario: Perform a Google Search
    Given I am on the Google search page
    When I click the Sign-In button
    Then I should be on the Google Sign-In page
