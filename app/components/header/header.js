(function() {
  'use strict';

  angular
    .module('app.header')
    .controller('HeaderController', HeaderController);

  function HeaderController($state) {
    var vm = this;
    vm.isWorkflow = ($state == 'workflow');
  }

})();
