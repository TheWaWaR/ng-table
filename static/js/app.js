

/*************************** AngularJS ****************************/
angular.module('myApp',
               ['myApp.controllers',
                'myApp.filters'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/basic',
                        {templateUrl: '/static/partials/basic.html',
                         controller: 'BasicCtrl'});
    $routeProvider.when('/std',
                        {templateUrl: '/static/partials/std.html',
                         controller: 'StdCtrl'});
    $routeProvider.when('/sortable',
                        {templateUrl: '/static/partials/sortable.html',
                         controller: 'SortableCtrl'});
    $routeProvider.when('/hidden-cols',
                        {templateUrl: '/static/partials/hidden-cols.html',
                         controller: 'Hidden-ColsCtrl'});
    $routeProvider.when('/filter-by-form',
                        {templateUrl: '/static/partials/filter-by-form.html',
                         controller: 'Filter-By-FormCtrl'});
    $routeProvider.when('/rows-selectable-actions',
                        {templateUrl: '/static/partials/rows-selectable-actions.html',
                         controller: 'Rows-Selectable-ActionsCtrl'});
    $routeProvider.when('/custom-render',
                        {templateUrl: '/static/partials/custom-render.html',
                         controller: 'Custom-RenderCtrl'});
    $routeProvider.when('/custom-event-handler',
                        {templateUrl: '/static/partials/custom-event-handler.html',
                         controller: 'Custom-Event-HandlerCtrl'});
    $routeProvider.when('/row-editable',
                        {templateUrl: '/static/partials/row-editable.html',
                         controller: 'Row-EditableCtrl'});  
    $routeProvider.otherwise({redirectTo: '/basic'});
    
  }]);



/*************************** Other ****************************/

$('.menu.sidebar')
  .sidebar('attach events', '#menu-btn');
//  .sidebar('setting', 'overlay', true)








