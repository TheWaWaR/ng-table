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


var myCtrls = angular.module('myApp.controllers', []);


/** BasicCtrl **/
myCtrls.controller('BasicCtrl', ['$scope', '$http', function($scope, $http) {
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




/** StdCtrl (Goto Page) **/
myCtrls.controller('StdCtrl', ['$scope', '$http', function($scope, $http) {
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
  }]);                           



/** SortableCtrl **/
myCtrls.controller('SortableCtrl', ['$scope', '$http', function($scope, $http) {
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
    
  }]); 



/** HiddenColsCtrl **/
myCtrls.controller('HiddenColsCtrl', ['$scope', '$http', function($scope, $http) {
  // It's a bug!!!
  $('.ui.dropdown').dropdown({
    action: 'nothing',
    onChange: function(value, text) {
      console.log(value, text);
    },
  });
   
  
  $http.get('/thead.json').success(function(data) {
    $scope.heads = data;
    var visibleArr = new Array(data.keys.length);
    for(var i=0; i<data.keys.length; i++) {
      visibleArr[i] = true;
    }
    $scope.visibleArr = visibleArr;
  });

  $scope.toggleVisible = function(idx) {
    $scope.visibleArr[idx] = !($scope.visibleArr[idx]);
  };


  $scope.visibleItems = function(arr) {
    if (typeof(arr) == 'undefined') return [];
    var matched = [];
    for(var i = 0; i < arr.length; i++) {
      if ($scope.visibleArr[i]) {
        matched.push(arr[i]);
      }
    }
    return matched;
  }
    
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
  
  $scope.loadPage({page:1});
}]);                           


/** FilterByFormCtrl **/
myCtrls.controller('FilterByFormCtrl', ['$scope', '$http', function($scope, $http) {
    var defaultParams = {};
  
  $('.ui.form').form();
  $('.ui.submit').click(function(e){
    e.preventDefault();
    var params = {};
    $('input[type="text"]').each(function(index, item){
      var name = $(item).attr('name');
      var value = $(item).val();
      params[name] = value;
    });
    $.extend(defaultParams, params);
    $scope.loadPage({page:1});    
  });
  
  $('.ui.clear-form').click(function(e){
    e.preventDefault();
    $('input[type="text"]').each(function(index, item){
      var name = $(item).attr('name');
      $(item).val('');
      delete defaultParams[name];
    });
    $scope.loadPage({page:1});    
  });
  
    $scope.loadPage = function(params) {
      if (params.page == null) return;

      console.log('loadPage.BEGIN:', params, defaultParams);
      $.extend(defaultParams, params);
      console.log('loadPage.END:', defaultParams);
      
      $('.active.loader').show();
      $http.get('/table.json', {params:defaultParams}).success(function(data){
        $scope.rows = data.rows;
        $scope.count = data.count;
        $scope.page = data.page;
        $scope.pages = data.pages;
        $scope.patination = iterPages(data.page, data.pages);
        $scope.heads = data.heads;
        $scope.headDict = data.headDict;
        $('.active.loader').hide();
      });
    }
    
    $scope.loadPage({page:1});
}]);


/** RowsSelectableActionsCtrl **/
myCtrls.controller('RowsSelectableActionsCtrl', ['$scope', '$http', function($scope, $http) {
    var defaultParams = {};

    $scope.loadPage = function(params) {
      if (params.page == null) return;

      console.log('loadPage.BEGIN:', params, defaultParams);
      $.extend(defaultParams, params);
      console.log('loadPage.END:', defaultParams);
      
      $('.active.loader').show();
      $http.get('/table.json', {params:defaultParams}).success(function(data){
        $scope.rows = data.rows;
        $scope.count = data.count;
        $scope.page = data.page;
        $scope.pages = data.pages;
        $scope.patination = iterPages(data.page, data.pages);
        $scope.heads = data.heads;
        $scope.headDict = data.headDict;
        $('.active.loader').hide();
      });
    }
    
    $scope.loadPage({page:1});
  }]);                           


/** CustomRenderCtrl **/
myCtrls.controller('CustomRenderCtrl', ['$scope', '$http', function($scope, $http) {
  }]);                           



/** CustomEventHandlerCtrl **/
myCtrls.controller('CustomEventHandlerCtrl', ['$scope', '$http', function($scope, $http) {
  }]);                           



/** RowEditableCtrl **/
myCtrls.controller('RowEditableCtrl', ['$scope', '$http', function($scope, $http) {
  }]);                           
  
