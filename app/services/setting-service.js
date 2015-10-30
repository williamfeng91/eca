(function() {
  'use strict';

  angular
    .module('app.services')
    .service('settingService', settingService);

  /** @ngInject */
  function settingService($cookieStore, logger) {
    this.customerProperties = [
      { name: 'gender', type: 'enum', display: 'Gender'},
      { name: 'surname', type: 'string', display: 'Last Name'},
      { name: 'given_name', type: 'string', display: 'First Name'},
      { name: 'nickname', type: 'string', display: 'Nickname'},
      { name: 'real_name', type: 'string', display: 'Real Name'},
      { name: 'email', type: 'string', display: 'Email'},
      { name: 'mobile', type: 'string', display: 'Mobile'},
      { name: 'au_address', type: 'string', display: 'Australian Address'},
      { name: 'foreign_address', type: 'string', display: 'Foreign Address'},
      { name: 'qq', type: 'string', display: 'QQ'},
      { name: 'wechat', type: 'string', display: 'WeChat'},
      { name: 'birthday', type: 'date', display: 'Birthday'},
      { name: 'visa_expiry_date', type: 'date', display: 'Visa Expiry Date'},
    ];

    this.genders = [
      { name: 'male', display: 'Male' },
      { name: 'female', display: 'Female' },
    ];

    this.getCustomerProperties = function() {
      return this.customerProperties;
    }

    this.setCustomerProperties = function(properties) {
      this.customerProperties = properties;
    };

    this.getGenders = function() {
      return this.genders;
    };
  }
}());
