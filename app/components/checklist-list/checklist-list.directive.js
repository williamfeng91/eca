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
        controller: function($scope, session, logger) {
          var vm = this;
          vm.collapseStatus = session.getCollapseStatus();
          vm.checklists = $scope.customerDetailsCtrl.customer.checklists;

          // functions
          vm.updateChecklistName = updateChecklistName;
          vm.deleteChecklist = deleteChecklist;
          vm.addItem = addItem;
          vm.updateItemText = updateItemText;
          vm.deleteItem = deleteItem;
          vm.countCheckedItems = countCheckedItems;
          vm.toggleCheck = toggleCheck;

          // initialize check count
          for (var index in vm.checklists) {
            vm.checklists[index].numChecked = countCheckedItems(vm.checklists[index].items);
          }

          function updateChecklistName(text) {
            logger.log('Update checklist name', text);
          }

          function deleteChecklist(item) {
            logger.log('Delete checklist', item);
          }

          function addItem(text) {
            logger.log('Add checklist item', text);
          }

          function updateItemText(text) {
            logger.log('Update checklist item text', text);
          }

          function deleteItem(item) {
            logger.log('Delete checklist item', item);
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
