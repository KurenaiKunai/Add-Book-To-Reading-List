// Code goes here

localStorage.clear(); // clear storage on page load

var mymodal = angular.module('mymodal', []);

mymodal.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
     $scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : 
	[{text: 'The Merchant of Venice', done: false}, 
	  {text: 'Othello', done: false}, 
	  {text: 'Alls Well That Ends Well', done: false}];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

$scope.addTodo = function(textvalue) {
		$scope.todos.push({
			text: textvalue,
			done: false
		});
		$scope.todoText = ''; //clear the input after adding
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
	
/*$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};*/
	
$scope.remove = function(index) {
  $scope.todos.splice(index, 1);
};
	
$scope.filterFunction = function(element) {
    return element.text.match(/^Ma/) ? true : false;
  };
  });

mymodal.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' +
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else  
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
        
        scope.dismiss = function() {
           element.modal('hide');
       };
      }
    };
  });