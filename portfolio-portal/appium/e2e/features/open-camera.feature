Feature: Snapshot Camera Test

@SmokeTest
Scenario: Taking a photo and sharing it via Gmail
  Given I am on the camera app
  When I take a photo
  And I share it via Gmail