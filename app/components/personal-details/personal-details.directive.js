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
                controller: function(session) {
                    var vm = this;
                    vm.collapseStatus = session.getCollapseStatus();
                }
            };
        });
})();
