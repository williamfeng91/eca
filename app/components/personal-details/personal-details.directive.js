(function() {
  'use strict';

  angular
    .module('app.customerDetails')
    .directive('ecaPersonalDetails', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'app/components/personal-details/personal-details.html',
        controllerAs: 'personalDetailsCtrl',
        controller: function(customerService, settingService, session, logger) {
          var vm = this;
          vm.genders = settingService.getGenders();
          vm.collapseStatus = session.getCollapseStatus();
          vm.updateProperty = updateProperty;

          function updateProperty(newVal, args) {
            var patch = {};
            patch[args.property] = newVal;
            customerService.partialUpdate(args.customer._id, patch)
              .then(updatePropertySuccessful, updatePropertyFailed);

            function updatePropertySuccessful(result) {
              args.customer[args.property] = newVal;
            }

            function updatePropertyFailed(error) {
              logger.error(error);
            }
          }
        }
      };
    });
})();
