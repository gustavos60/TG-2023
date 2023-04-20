module Cucumber
  module RunningTestCase
    class TestCase < SimpleDelegator

      def feature
        string = File.read(location.file)
        document = ::Gherkin::Parser.new.parse(string)
        document.feature
      end

    end
  end
end
