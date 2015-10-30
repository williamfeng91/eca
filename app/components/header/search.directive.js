(function() {
  'use strict';

  angular
    .module('app.header')
    .directive('ecaSearch', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/components/header/search.html',
        controllerAs: 'searchCtrl',
        controller: function($state, session, logger) {
          var vm = this;
          vm.search = search;

          function search() {
            var customers = session.getCustomers();
            var filteredCustomers = [];
            for (var index in customers) {
              if (customers[index].surname.toLowerCase().indexOf(vm.query.toLowerCase()) != -1
                || customers[index].given_name.toLowerCase().indexOf(vm.query.toLowerCase()) != -1) {
                filteredCustomers.push(customers[index]);
              }
            }
            session.setFilteredCustomers(filteredCustomers);
          }
        }
      };
    });
})();
