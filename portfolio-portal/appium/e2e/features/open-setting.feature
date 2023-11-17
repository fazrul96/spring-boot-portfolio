Feature: Network and Internet Settings

Background:
  Given I am on the network and internet settings

@TestingTest
Scenario: Enable Airplane Mode
  When I toggle on Airplane Mode
  Then Airplane Mode should be enabled