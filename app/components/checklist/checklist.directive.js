(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .directive('ecaChecklist', function() {
      return {
        restrict: 'A',
        scope: true,
        templateUrl: 'app/components/checklist/checklist.html',
        controllerAs: 'checklistCtrl',
        controller: function($scope, checklistService, sortableService, logger) {
          var vm = this;
          vm.checklists = $scope.checklistListCtrl.checklists;
          vm.checklist = $scope.checklist;
          vm.sortableOptions = {
            stop: function(e, ui) {
              var checklistItems = ui.item.sortable.sourceModel;
              var draggedChecklistItem = ui.item.sortable.model;
              var newPos = sortableService.calculatePosition(checklistItems, ui.item.index());
              if (newPos != draggedChecklistItem.pos) {
                var patch = { pos: newPos };
                checklistService.partialUpdateItem(vm.checklist._id, draggedChecklistItem._id, patch)
                  .then(updatePropertySuccessful, updatePropertyFailed);
              }

              function updatePropertySuccessful(result) {
                draggedChecklistItem.pos = result.pos;
              }

              function updatePropertyFailed(error) {
                logger.error(error);
              }
            }
          };

          // functions
          vm.countCheckedItems = countCheckedItems;
          vm.updateChecklistName = updateChecklistName;
          vm.deleteChecklist = deleteChecklist;
          vm.addItem = addItem;

          // initialize check count
          vm.checklist.numChecked = countCheckedItems(vm.checklist.items);
          // sort checklist items by pos
          vm.checklist.items.sort(function(a, b) {
            return a.pos > b.pos;
          });

          function countCheckedItems(items) {
            var count = 0;
            for (var index in items) {
              if (items[index].checked) {
                count++;
              }
            }
            return count;
          }

          function updateChecklistName(newVal) {
            var patch = { name: newVal };
            checklistService.partialUpdate(vm.checklist._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              vm.checklist.name = result.name;
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

          function addItem(text) {
            var item = { text: text };
            checklistService.createItem(vm.checklist._id, item)
              .then(createItemSuccessful, createItemFailed);

            function createItemSuccessful(result) {
              vm.checklist.items.push(result);
            }

            function createItemFailed(error) {
              logger.error(error);
            }
          }
        }
      };
    });
})();
