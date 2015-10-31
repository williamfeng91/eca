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
        controller: function($scope, checklistService, session, logger) {
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

          function updateChecklistName(newVal, args) {
            var patch = { name: newVal };
            checklistService.partialUpdate(args.checklist._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              args.checklist.name = result.name;
            }

            function updatePropertyFailed(error) {
              logger.error(error);
            }
          }

          function deleteChecklist(checklist) {
            checklistService.delete(checklist._id)
              .then(deleteChecklistSuccessful, deleteChecklistFailed);

            function deleteChecklistSuccessful(result) {
              var index = vm.checklists.indexOf(checklist);
              vm.checklists.splice(index, 1);
            }

            function deleteChecklistFailed(error) {
              logger.log(error);
            }
          }

          function addItem(text, args) {
            var item = { text: text };
            checklistService.createItem(args.checklist._id, item)
              .then(createItemSuccessful, createItemFailed);

            function createItemSuccessful(result) {
              args.checklist.items.push(result);
            }

            function createItemFailed(error) {
              logger.error(error);
            }
          }

          function updateItemText(newVal, args) {
            var patch = { text: newVal };
            checklistService.partialUpdateItem(args.checklist._id, args.item._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              args.item.text = result.text;
            }

            function updatePropertyFailed(error) {
              logger.error(error);
            }
          }

          function deleteItem(args) {
            checklistService.deleteItem(args.checklist._id, args.item._id)
              .then(deleteItemSuccessful, deleteItemFailed);

            function deleteItemSuccessful(result) {
              var index = args.checklist.items.indexOf(args.item);
              args.checklist.items.splice(index, 1);
            }

            function deleteItemFailed(error) {
              logger.error(error);
            }
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
            var patch = { checked: !item.checked };
            checklistService.partialUpdateItem(checklist._id, item._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              item.checked = result.checked;
              // update check count
              if (item.checked) {
                checklist.numChecked++;
              } else {
                checklist.numChecked--;
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
