

var myFilters = angular.module('myApp.filters', []);

myFilters.filter('nullPage', function(){
    return function(input) {
      return input == null ? '...' : input;
    }
  });

// myFilters.filter('') ;

