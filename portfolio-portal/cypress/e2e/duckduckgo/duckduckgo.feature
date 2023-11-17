Feature: Search on DuckDuckGo
  As a user
  I want to search on DuckDuckGo
  So that I can find information without being tracked

  Background:
    Given I visit duckduckgo.com

  @SmokeTest
  Scenario Outline: Perform a search with valid terms
    Given I should see a search bar
    When I enter the search term "<searchTerm>"
    And I click the search button
    Then I should see search results
    And a random Jira ID is generated

    Examples:
      | searchTerm       |
      | Cypress Cucumber |

  @SanityTest
  Scenario Outline: Perform an unsuccessful search with invalid term
    Given I should see a search bar
    When I enter the search term "<searchTerm>"
    And I click the search button
    Then I should see no search results
    And a random Jira ID is generated

    Examples:
      | searchTerm        |
      | https://invalid   |