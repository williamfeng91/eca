(function() {
    'use strict';

    angular
        .module('app.services')
        .service('settingService', settingService);

    /** @ngInject */
    function settingService($cookieStore, logger) {
        this.customerProperties = [
            { name: 'real_name', display: 'Real Name'},
            { name: 'email', display: 'Email'},
            { name: 'mobile', display: 'Mobile'},
            { name: 'au_address', display: 'Australian Address'},
            { name: 'foreign_address', display: 'Foreign Address'},
            { name: 'qq', display: 'QQ'},
            { name: 'wechat', display: 'WeChat'},
        ];

        this.getCustomerProperties = function() {
            return this.customerProperties;
        }

        this.setCustomerProperties = function(properties) {
            this.customerProperties = properties;
        };
    }
}());
