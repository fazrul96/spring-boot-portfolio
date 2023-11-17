Feature: Snapshot Camera and Share

Background:
  Given I am on the camera app
  When I take a photo

@SmokeTest
Scenario: Taking a photo and sharing it via file service
  And I share it via "<fileService>"

  Examples:
  | fileService   |
  | Gmail         |
  | Drive         |

@SanityTest
Scenario: Taking a photo and sharing it via invalid file service
  And I share it via "<fileService>"

  Examples:
  | fileService     |
  | Whatsapp        |