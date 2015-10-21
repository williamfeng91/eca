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
                controller: function(settingService, session, logger) {
                    var vm = this;
                    vm.genders = settingService.getGenders();
                    vm.collapseStatus = session.getCollapseStatus();
                    vm.updateProperty = updateProperty;

                    function updateProperty(newVal, property) {
                        logger.log(newVal, property);
                    }
                }
            };
        });
})();
