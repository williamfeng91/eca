(function() {
  'use strict';

  angular
    .module('app')
    .constant('ECA_API', (function() {
      var baseUrl = 'http://localhost:10010/api/v0';
      // var baseUrl = 'https://jsonstub.com';
      return {
        url: baseUrl,
        customerUrl: baseUrl + '/customers',
        headers: {
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
          // 'JsonStub-Project-Key': 'ee4767fd-bee1-40ae-90c0-ac4640873a29',
        }
      };
    })());
})();
