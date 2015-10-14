(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngCookies',
            'app.header',
            'app.error',
            'app.list',
            'app.workflow',
        ])
        .run(run);

    function run($rootScope, $state, $cookieStore) {
        // keep user logged in after page refresh
        // if ($cookieStore.get('currentUser')) {
        //     session.create($cookieStore.get('currentUser'));
        // }

        $rootScope.stateIsLoading = false;
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams) {
            $rootScope.stateIsLoading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
            $rootScope.stateIsLoading = false;
        });
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
            $rootScope.stateIsLoading = false;
            evt.preventDefault();
        });
    }
})();
