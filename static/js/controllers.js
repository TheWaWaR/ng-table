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
  }])                           // BasicCtrl
  .controller('StdCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('/thead.json').success(function(data) {
      $scope.heads = data;
    });

    $scope.loadPage = function(p) {
      console.log('loadPage:', p);
      if (p == null) return;

      $('.active.loader').show();
      $http.get('/tbody.json', {params:{page:p}}).success(function(data){
        if (data.status == 'success') {
          $scope.rows = data.rows;
          $scope.count = data.count;
          $scope.page = data.page;
          $scope.pages = data.pages;
          $scope.patination = iterPages(data.page, data.pages);
          $scope.errorMessage = '';
          $('#error-message').hide();
        } else {
          console.log(data.message);
          $('#error-message').text(data.message).show();
        }
        
        $('.active.loader').hide();
      });
    }

    $('#goto-page').keypress(function(e){
      if ( e.which == 13 ) {
        $scope.loadPage($(this).val());
      }
    });
    $scope.loadPage(1);
  }])                           // StdCtrl (Goto Page)
  .controller('SortableCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/thead.json').success(function(data) {
      $scope.heads = data;
    });

    var defaultParams = {};

    $scope.loadPage = function(params) {
      if (params.page == null) return;

      console.log('loadPage.BEGIN:', params, defaultParams);
      $.extend(defaultParams, params);
      console.log('loadPage.END:', defaultParams);
      
      $('.active.loader').show();
      $http.get('/tbody.json', {params:defaultParams}).success(function(data){
        $scope.rows = data.rows;
        $scope.count = data.count;
        $scope.page = data.page;
        $scope.pages = data.pages;
        $scope.patination = iterPages(data.page, data.pages);
        $('.active.loader').hide();
      });
    }
    
    $scope.orderBy = function(order) {
      if ($scope.order == order) {
        $scope.orderDirection = $scope.orderDirection == '-' ? '' : '-';
      } else {
        $scope.orderDirection = '';
      }
      
      $scope.order = order;
      $scope.loadPage({
        page: $scope.page,
        order: order,
        orderDirection: $scope.orderDirection
      });
    }
    
    $scope.loadPage({page:1});
    
  }])                           // SortableCtrl
  .controller('HiddenColsCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // HiddenColsCtrl
  .controller('FilterByFormCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // FilterByFormCtrl
  .controller('RowsSelectableActionsCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // RowsSelectableActionsCtrl
  .controller('CustomRenderCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // CustomRenderCtrl
  .controller('CustomEventHandlerCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // CustomEventHandlerCtrl
  .controller('RowEditableCtrl', ['$scope', '$http', function($scope, $http) {
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
  }])                           // RowEditableCtrl
  
