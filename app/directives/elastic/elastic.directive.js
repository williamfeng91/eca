(function() {
  'use strict';

  angular
    .module('app')
    .directive('elastic', function() {
      return {
        restrict: 'A',
        link: function($scope, element) {
          // $scope.initialHeight = $scope.initialHeight || element[0].style.height;
          // var resize = function() {
          //     element[0].style.height = $scope.initialHeight;
          //     element[0].style.height = "" + element[0].scrollHeight + "px";
          // };
          // element.on("input change", resize);
          // $timeout(resize, 0);
          autosize($(element));
        }
      };
    });
})();
