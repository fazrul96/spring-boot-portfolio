Feature: User Authentication

  Background:
    Given I navigate to the Website

  @SmokeTest
  @JiraID(QA-135, QA-156)
  Scenario Outline: Login as a new sign-up user with valid data
    When I entered valid credentials
      | email                   | password |
      | qatubeupdate@yopmail.com | 123451   |
    And the user clicks on the sign-in button
    Then Validate the title after login

  @SanityTest
  @JiraID(QA-569, QA-281)
  Scenario Outline: Login with invalid data by entering the invalid password
    When I entered invalid credentials
      | email                   | password  |
      | qatubeupdate@yopmail.com | 123456    |
    And the user clicks on the sign-in button
    Then Error message should display
      | errormessage           |
      | Authentication failed  |

  Examples:
    | email                   | password  |
    | qatubeupdate@yopmail.com | 123456    |
