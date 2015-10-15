(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('ecaSearch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/header/search.html',
                controllerAs: 'searchCtrl',
                controller: function($state, session) {
                    var vm = this;
                    vm.search = search;

                    function search() {
                        var customers = session.getCustomers().filter(function (customer) {
                            return customer.surname.toLowerCase().indexOf(vm.query.toLowerCase()) != -1
                                || customer.given_name.toLowerCase().indexOf(vm.query.toLowerCase()) != -1;
                        });
                        session.setFilteredCustomers(customers);
                    }
                }
            };
        });
})();
