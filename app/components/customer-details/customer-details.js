(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .controller('CustomerDetailsController', CustomerDetailsController);

  function CustomerDetailsController($stateParams, $modalInstance, initData, customerService, checklistService, settingService, logger) {
    var vm = this;

    // initialize data
    vm.customer = initData;
    vm.properties = settingService.getCustomerProperties();

    vm.addChecklist = addChecklist;
    vm.close = closeDialog;

    function addChecklist() {
      checklistService.create(vm.customer._id, {
        name: 'Checklist',
      }).then(addChecklistSuccessful, addChecklistFailed);

      function addChecklistSuccessful(result) {
        vm.customer.checklists.push(result);
        vm.customer.checklists.sort(function(a, b) {
          return a.pos < b.pos;
        });
      };

      function addChecklistFailed(error) {
        logger.error(error);
      };
    }

    function closeDialog() {
      $modalInstance.dismiss();
    }
  }

})();
