Feature: Login feature

  Scenario: As a valid user I can log into my app
    Then I enter "eve.holt@reqres.in" into "SignInEmailInput"
    Then I enter "qwerty" into "SignInPasswordInputId"
    Then I touch the "Log in" text
    Then I wait for progress
    Then I should see "Home screen"
