(function() {
    'use strict';

    angular
        .module('app.list')
        .controller('ListController', ListController);

    function ListController() {
        var vm = this;
        vm.customers = [
            {
                id: 1,
                given_name: 'William',
                surname: 'Feng',
                chinese_name: '冯云超',
                mobile: '12345678',
                email: 'A@hotmail.com',
                status: {
                    color: 'blue'
                }
            },
            {
                id: 2,
                given_name: 'Mandy',
                surname: 'Li',
                chinese_name: '李曼',
                mobile: '12451245124',
                email: 'B@hotmail.com',
                status: {
                    color: 'orange'
                }
            },
            {
                id: 3,
                given_name: 'C',
                surname: 'Zhao',
                chinese_name: '赵C',
                mobile: '92837492379',
                email: 'C@hotmail.com',
                status: {
                    color: 'red'
                }
            }
        ];
        vm.selectedCustomers = [];

        vm.onSingleCheckboxClicked = onSingleCheckboxClicked;

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
