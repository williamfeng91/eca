(function() {
    'use strict';

    angular
        .module('app')
        .directive('ecaLoader', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/loader/loader.html',
                controller: function() {

                }
            };
        });
})();
