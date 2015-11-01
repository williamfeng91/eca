(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .directive('ecaChecklistItem', function() {
      return {
        restrict: 'A',
        scope: true,
        templateUrl: 'app/components/checklist/checklist-item.html',
        controllerAs: 'checklistItemCtrl',
        controller: function($scope, checklistService, logger) {
          var vm = this;
          vm.checklist = $scope.checklistCtrl.checklist;
          vm.item = $scope.item;

          // functions
          vm.updateItemText = updateItemText;
          vm.deleteItem = deleteItem;
          vm.toggleCheck = toggleCheck;

          function updateItemText(newVal) {
            var patch = { text: newVal };
            checklistService.partialUpdateItem(vm.checklist._id, vm.item._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              vm.item.text = result.text;
            }

            function updatePropertyFailed(error) {
              logger.error(error);
            }
          }

          function deleteItem() {
            checklistService.deleteItem(vm.checklist._id, vm.item._id)
              .then(deleteItemSuccessful, deleteItemFailed);

            function deleteItemSuccessful(result) {
              var index = vm.checklist.items.indexOf(vm.item);
              vm.checklist.items.splice(index, 1);
            }

            function deleteItemFailed(error) {
              logger.error(error);
            }
          }

          function toggleCheck(item) {
            var patch = { checked: !item.checked };
            checklistService.partialUpdateItem(vm.checklist._id, item._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              item.checked = result.checked;
              // update check count
              if (item.checked) {
                vm.checklist.numChecked++;
              } else {
                vm.checklist.numChecked--;
              }
            }

            function updatePropertyFailed(error) {
              logger.error(error);
            }
          }
        }
      };
    });
})();
