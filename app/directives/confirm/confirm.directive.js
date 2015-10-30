(function() {
  'use strict';

  angular
    .module('app')
    .directive('confirm', function() {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          onConfirmCallback: '&',
          targetItem: '='
        },
        templateUrl: 'app/directives/confirm/confirm.html',
        link: function(scope, element, attrs) {
          scope.confirming = false;

          // functions
          scope.startConfirm = startConfirm;
          scope.confirm = onConfirm;
          scope.cancel = exitConfirm;

          function startConfirm() {
            scope.confirming = true;
          }

          function onConfirm() {
            var callback = scope.onConfirmCallback();
            callback(scope.targetItem);
            exitConfirm();
          }

          function exitConfirm() {
            scope.confirming = false;
          }
        }
      };
    });
})();
