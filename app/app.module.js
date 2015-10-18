(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngCookies',
            'ngAnimate',
            'ui.bootstrap',
            'ui.sortable',
            'ct.ui.router.extras',
            'angular-loading-bar',
            'app.services',
            'app.header',
            'app.error',
            'app.list',
            'app.workflow',
            'app.customerDetails'
        ])
        .run(run);

    function run($rootScope, $state, $cookieStore) {
        // keep user logged in after page refresh
        // if ($cookieStore.get('currentUser')) {
        //     session.create($cookieStore.get('currentUser'));
        // }

        $rootScope.stateIsLoading = false;
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState) {
            $rootScope.stateIsLoading = true;

            // initial load and is trying to load the modalstate
            if (fromState.name === '' && toState.name === 'customer-details') {
                // cancel initial transition
                evt.preventDefault();
                // Go to the default background state. (Don't update the URL)
                $state.go('list', undefined, { location: false }).then(function() {
                    // OK, background is loaded, now go to the original modalstate
                    $state.go(toState, toParams);
                });
            }
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
