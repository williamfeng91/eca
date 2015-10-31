(function() {
  'use strict';

  angular
    .module('app.services')
    .service('session', session);

  /** @ngInject */
  function session($cookieStore, logger) {
    this.customers = [];
    this.filteredCustomers = [];
    this.collapseStatus = {
      personalDetails: true,
      checklist: true,
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

    this.getCollapseStatus = function() {
      return this.collapseStatus;
    }
  }
}());
