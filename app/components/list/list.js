(function() {
    'use strict';

    angular
        .module('app.list')
        .controller('ListController', ListController);

    /** @ngInject */
    function ListController(customerService, session) {
        var vm = this;
        customerService.getAll().then(
            function(result) {
                result.entries.sort(function(a, b) {
                    return a.list_pos > b.list_pos;
                });
                session.setCustomers(result.entries);
                vm.customers = session.getFilteredCustomers();
            },
            function(error) {
            }
        )
        vm.selectedCustomers = [];

        vm.onTopCheckboxClicked = onTopCheckboxClicked;
        vm.onSingleCheckboxClicked = onSingleCheckboxClicked;
        vm.sortableOptions = {
            stop: function(e, ui) {
                for (var index in vm.customers) {
                    vm.customers[index].list_pos = index;
                }
            }
        };

        function onTopCheckboxClicked() {
            var selectAll = true;
            if (vm.selectedCustomers.length == vm.customers.length) {
                selectAll = false;
            }
            for (var index in vm.customers) {
                vm.customers[index].selected = selectAll;
            }
            if (selectAll) {
                vm.selectedCustomers = angular.copy(vm.customers);
            } else {
                vm.selectedCustomers = [];
            }
        }

        function onSingleCheckboxClicked(id) {
            for (var i = 0; i < vm.customers.length; ++i) {
                if (vm.customers[i].id === id) {
                    vm.customers[i].selected = !vm.customers[i].selected;
                    if (vm.customers[i].selected) {
                        vm.selectedCustomers.push(vm.customers[i]);
                    } else {
                        for (var j = 0; j < vm.selectedCustomers.length; ++j) {
                            if (vm.selectedCustomers[j].id === id) {
                                vm.selectedCustomers.splice(j, 1);
                                break;
                            }
                        }
                    }
                    break;
                }
            }
        }
    }

})();
