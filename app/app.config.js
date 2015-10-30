(function() {
  'use strict';

  angular
    .module('app')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])

})();
