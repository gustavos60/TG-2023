require 'calabash-android/management/adb'
require 'calabash-android/operations'

Before do |scenario|
  ensure_app_installed
  start_test_server_in_background(with_uiautomator: true)
end

After do |scenario|
  shutdown_test_server
end

at_exit do 
  success = ($!.nil? || $!.is_a?(SystemExit) && $!.success?)
  exit_code = success ? 0 : 1
  exit! exit_code
end