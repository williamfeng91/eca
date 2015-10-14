(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('ecaSearch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/header/search.html',
                controllerAs: 'searchCtrl',
                controller: function($state) {
                    var vm = this;
                    vm.searchSubmit = searchSubmit;
                    function searchSubmit() {
                        $state.go('home');
                    }
                }
            };
        });
})();
