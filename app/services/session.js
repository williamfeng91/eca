(function() {
  'use strict';

  angular
    .module('app.services')
    .service('session', session);

  /** @ngInject */
  function session($cookieStore, logger) {
    this.customers = [];
    this.filteredCustomers = [];
    this.customerProperties = [
      { name: 'email', display: 'Email'},
      { name: 'mobile', display: 'Mobile'},
      { name: 'au_address', display: 'Australian Address'},
      { name: 'cn_address', display: 'Foreign Address'},
      { name: 'qq', display: 'QQ'},
      { name: 'wechat', display: 'WeChat'},
    ];
    this.collapseStatus = {
      personalDetails: false,
      checklist: true
    };

    this.getCustomers = function() {
      return this.customers;
    }

    this.setCustomers = function(customers) {
      angular.copy(customers, this.customers);
      this.filteredCustomers = this.customers.slice();
    };

    this.getFilteredCustomers = function() {
      return this.filteredCustomers;
    }

    this.setFilteredCustomers = function(customers) {
      this.filteredCustomers.length = 0;
      for (var index in customers) {
          this.filteredCustomers.push(customers[index]);
      }
    };

    this.getCustomerProperties = function() {
      return this.customerProperties;
    }

    this.setCustomerProperties = function(properties) {
      this.customerProperties = properties;
    };

    this.getCollapseStatus = function() {
      return this.collapseStatus;
    }
  }
}());
