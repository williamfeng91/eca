(function() {
    'use strict';

    angular
        .module('app.customerDetails')
        .directive('ecaChecklistList', function() {
            return {
                restrict: 'E',
                scope: true,
                templateUrl: 'app/components/checklist-list/checklist-list.html',
                controllerAs: 'checklistListCtrl',
                controller: function($scope, session) {
                    var vm = this;
                    vm.collapseStatus = session.getCollapseStatus();
                    vm.checklists = $scope.customerDetailsCtrl.customer.checklists;

                    // functions
                    vm.countCheckedItems = countCheckedItems;
                    vm.toggleCheck = toggleCheck;

                    // initialize check count
                    for (var index in vm.checklists) {
                        vm.checklists[index].numChecked = countCheckedItems(vm.checklists[index].items);
                    }

                    function countCheckedItems(items) {
                        var count = 0;
                        for (var index in items) {
                            if (items[index].checked) {
                                count++;
                            }
                        }
                        return count;
                    }

                    function toggleCheck(checklist, item) {
                        item.checked = !item.checked;
                        // update check count
                        if (item.checked) {
                            checklist.numChecked++;
                        } else {
                            checklist.numChecked--;
                        }
                        // call API to update
                    }
                }
            };
        });
})();
