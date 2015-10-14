(function() {
    'use strict';

    angular.module('app')
        .config(stateConfig)
        .config(urlConfig)
        .controller('AppController', AppController);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function unCapitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    function getControllerName(name) {
        return name.split('-').map(function(item){
            return capitalizeFirstLetter(item);
        }).join('');
    }

    function getControllerAlias(name) {
        return unCapitalizeFirstLetter(getControllerName(name));
    }

    function getSubCompObj(component, resolveObj) {
        return {
            templateUrl: 'app/components/' + component + '/' + component + '.html',
            controller: getControllerName(component) + 'Controller',
            controllerAs: getControllerAlias(component) + 'Ctrl',
            resolve: resolveObj
        };
    }

    function getUICompObj(main, header, resolveObj) {
        main = typeof main !== 'undefined' ? main : 'list';
        header = typeof header !== 'undefined' ? header : 'header';
        return {
            'header': getSubCompObj(header),
            'main': getSubCompObj(main, resolveObj)
        };
    }

    function stateConfig($locationProvider, $stateProvider, $uiViewScrollProvider) {
        $locationProvider.html5Mode({
            enabled: false, // set to true to remove hash. Don't want to set it now because it
                            // doesn't allow access to pages by typing url directly
            requireBase: false
        });
        $uiViewScrollProvider.useAnchorScroll();
        $stateProvider
            .state('list', {
                url: '/list',
                views: getUICompObj('list'),
            })
            .state('workflow', {
                url: '/workflow',
                views: getUICompObj('workflow'),
            })
            .state('error', {
                url: '/error',
                params: { type: null },
                views: getUICompObj('error'),
            });
    }

    function urlConfig($urlRouterProvider) {
        $urlRouterProvider
            .when('', '/')
            .when('/', '/list')
            .otherwise('/error');
    }

    function AppController () {}
})();