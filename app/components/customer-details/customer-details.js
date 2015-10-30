(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .controller('CustomerDetailsController', CustomerDetailsController);

  function CustomerDetailsController($stateParams, $modalInstance, initData, customerService, settingService) {
    var vm = this;

    // initialize data
    vm.customer = initData;
    vm.properties = settingService.getCustomerProperties();

    vm.close = closeDialog;

    // customerService.getById($stateParams.id)
    //   .then(getCustomerSuccessful, getCustomerFailed);

    // function getCustomerSuccessful(result) {
    //   vm.customer = result;
    // }

    // function getCustomerFailed(error) {
    // }

    function closeDialog() {
      $modalInstance.dismiss();
    }
  }

})();
