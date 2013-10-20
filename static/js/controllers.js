'use strict';

/* Controllers */
function iterPages(current, total){
  var pagination = [];
  pagination.push(1);
  if ( (current-1) > 2 ) {
    pagination.push(null);
    pagination.push(current-1);
    pagination.push(current);
  } else if (current == 3) {
    pagination.push(2)
    pagination.push(3)
  } else if (current == 2) {
    pagination.push(2)
  }

  if ((total-current) > 2) {
    pagination.push(current+1);
    pagination.push(null);
  } else if ((total-current) == 2) {
    pagination.push(current+1);
  }

  if ( total != current ) {
    pagination.push(total);
  }
  
  return pagination;
}


angular.module('myApp.controllers', []).
  controller('BasicCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/thead.json').success(function(data) {
      $scope.heads = data;
    });

    $scope.loadPage = function(p) {
      console.log('loadPage:', p);
      if (p == null) return;

      $('.active.loader').show();
      $http.get('/tbody.json', {params:{page:p}}).success(function(data){
        $scope.rows = data.rows;
        $scope.count = data.count;
        $scope.page = data.page;
        $scope.pages = data.pages;
        $scope.patination = iterPages(data.page, data.pages);
        $('.active.loader').hide();
      });
    }
    $scope.loadPage(1);
  }])
  .controller('StdCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('/thead.json').success(function(data) {
      $scope.heads = data;
    });

    $scope.loadPage = function(p) {
      console.log('loadPage:', p);
      if (p == null) return;

      $('.active.loader').show();
      $http.get('/tbody.json', {params:{page:p}}).success(function(data){
        $scope.rows = data.rows;
        $scope.count = data.count;
        $scope.page = data.page;
        $scope.pages = data.pages;
        $scope.patination = iterPages(data.page, data.pages);
        $('.active.loader').hide();
      });
    }
    $scope.loadPage(1);
  }]);
