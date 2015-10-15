(function() {
    'use strict';

    angular
        .module('app.customerDetails')
        .controller('CustomerDetailsController', CustomerDetailsController);

    function CustomerDetailsController(initData) {
        var vm = this;
        vm.customer = initData;
    }

})();
