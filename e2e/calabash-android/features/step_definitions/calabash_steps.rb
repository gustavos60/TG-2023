require 'calabash-android/calabash_steps'

Then /^I touch the element with testID "([^\"]*)"$/ do |content_description|
  tap_when_element_exists("* {contentDescription LIKE[c] '#{content_description}'}")
end