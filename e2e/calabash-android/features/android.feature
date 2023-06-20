Feature: Login feature

  Scenario: Load app
    Then I wait for 2 seconds

  Scenario: As a valid user I can log in and out of my app
    Then I enter "eve.holt@reqres.in" into "SignInEmailInput"
    Then I enter "qwerty" into "SignInPasswordInputId"
    Then I touch the "Log in" text
    Then I wait for progress
    Then I should see "Arts gallery"
    Then I touch the "Sign out" text
    Then I wait for progress
    Then I should see "Please enter your credentials"

  Scenario: I can add and remove an art from my favorites list
    Then I enter "eve.holt@reqres.in" into "SignInEmailInput"
    Then I enter "qwerty" into "SignInPasswordInputId"
    Then I touch the "Log in" text
    Then I wait for progress
    Then I should see "Arts gallery"
    Then I touch the "Search" text
    Then I wait for progress
    Then I enter "Space Lab" into "SearchInput"
    Then I wait for progress
    Then I touch the "1988" text
    Then I touch the "1988" text
    Then I wait for progress
    Then I touch the "Add to favorites" text
    Then I wait for progress
    Then I touch the "Go back" text
    Then I touch the element with testID "SearchGoBack"
    Then I touch the element with testID "SearchGoBack"
    Then I touch the element with testID "Fav-258426"
    Then I touch the element with testID "Fav-258426"
    Then I touch the "Remove from favorites" text
    Then I wait for progress
    Then I touch the "Go back" text
    Then I should see "You have no favorites yet"