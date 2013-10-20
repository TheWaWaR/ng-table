
angular.module('myApp.filters', [])
  .filter('nullPage', function(){
    return function(input) {
      return input == null ? '...' : input;
    }
  });

