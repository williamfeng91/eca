(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .directive('ecaChecklistList', function() {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'app/components/checklist/checklist-list.html',
        controllerAs: 'checklistListCtrl',
        controller: function($scope, checklistService, sortableService, session, logger) {
          var vm = this;
          vm.collapseStatus = session.getCollapseStatus();
          vm.checklists = $scope.customerDetailsCtrl.customer.checklists;
          vm.sortableOptions = {
            stop: function(e, ui) {
              var checklists = ui.item.sortable.sourceModel;
              var draggedChecklist = ui.item.sortable.model;
              if (newPos != draggedChecklist.pos) {
                var newPos = sortableService.calculatePosition(checklists, ui.item.index());
                var patch = { pos: newPos };
                checklistService.partialUpdate(draggedChecklist._id, patch)
                  .then(updatePropertySuccessful, updatePropertyFailed);
              }

              function updatePropertySuccessful(result) {
                draggedChecklist.pos = result.pos;
              }

              function updatePropertyFailed(error) {
                logger.error(error);
              }
            }
          };

          // sort checklists by pos
          vm.checklists.sort(function(a, b) {
            return a.pos < b.pos;
          });
        }
      };
    });
})();
