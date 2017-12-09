angular
    .module('configHub', [
        'ui.router',
        'ngSanitize',
        'angulartics',
        'angulartics.google.analytics',
        'configHub.home',
        'configHub.download',
        'configHub.features'
    ])

    .config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider',
        function($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider)
        {
//             $urlRouterProvider
//                 .when('/services/', '/services')
//                 .when('/license/', '/license')
//                 .when('/features/', '/features')
//                 .when('/download/', '/download')
//                 .when('/contact/', '/contact')
//                 .when('/scheduleDemo/', '/scheduleDemo')

//                 .when('/terms/', '/terms')
//                 .when('/eula/', '/eula')
//                 .when('/404/', '/404')
//                 .when('/500/', '/500')
//                 .otherwise(function($injector, $location) {
//                     var state = $injector.get('$state');
//                     state.go('404', {notify: false});
//                     return $location.path();
//                 });

            $stateProvider

                .state('whatIs', {
                    url: '/what-is-confighub',
                    templateUrl: 'whatIs/whatIs.html?v=4',
                    pageTitle: 'What is ConfigHub'
                })

                .state('features', {
                    url: '/features',
                    templateUrl: 'home/features.html?v=4',
                    pageTitle: 'Features'
                })

                .state('services', {
                    url: '/services',
                    templateUrl: 'service/service.html?v=4',
                    pageTitle: 'Services'
                })

                .state('license', {
                    url: '/license/:type',
                    templateUrl: 'license/license.html?v=4',
                    pageTitle: 'License'
                })

                .state('download', {
                    url: '/download',
                    templateUrl: 'download/download.html?v=4',
                    pageTitle: 'Downloads'
                })

                .state('scheduleDemo', {
                    url: '/scheduleDemo',
                    templateUrl: 'scheduleDemo/scheduleDemo.html?v=4',
                    pageTitle: 'Schedule a demo'
                })

                .state('contact', {
                    url: '/contact',
                    templateUrl: 'contact.html?v=4',
                    pageTitle: 'Contact Us'
                })

                .state('terms', {
                    url: '/terms',
                    templateUrl: 'terms/terms.html?v=4',
                    pageTitle: 'Terms of Use'
                })

                .state('eula', {
                    url: '/eula',
                    templateUrl: 'terms/eula.html?v=4',
                    pageTitle: 'End-User License Agreement'
                })

                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'terms/privacy.html?v=4',
                    pageTitle: 'Privacy Policy'
                })

                .state('401', {
                    url: '/401',
                    templateUrl: '401.html?v=4',
                    pageTitle: '401'
                })

                .state('404', {
                    templateUrl: '404.html?v=4',
                    pageTitle: '404'
                })

                .state('500', {
                    url: '/500',
                    templateUrl: '500.html?v=4',
                    pageTitle: '500'
                })

                .state('home', {
                    url: '/',
                    templateUrl: 'home/home.html?v=4',
                    pageTitle: ''
                })
            ;

            $locationProvider.html5Mode(true);

            $httpProvider.interceptors.push(['$timeout', '$q', '$injector',
                function ($timeout, $q, $injector)
                {
                    var $http, $state,
                        re = new RegExp('^\/rest\/', 'i'),
                        defer,
                        deferred;

                    // this trick must be done so that we don't receive
                    // `Uncaught Error: [$injector:cdep] Circular dependency found`
                    $timeout(function ()
                    {
                        $http = $injector.get('$http');
                        $state = $injector.get('$state');
                    });


                    return {

                        request: function (config)
                        {
                            if(!re.test(config.url)) {
                                defer = $q.defer();
                                config.timeout = defer.promise;
                                return config;
                            }
                            return config;
                        },

                        responseError: function (response)
                        {
                            switch(response.status)
                            {
                                case 400: // Bad request
                                case 406: // Not acceptable
                                    deferred = $q.defer();
                                    $state.go('login');
                                    return deferred.promise;

                                case 401: // Authorization
                                case 403: // Forbidden
                                    deferred = $q.defer();
                                    return deferred.promise;

                                case 404:
                                    deferred = $q.defer();
                                    $state.go('404');
                                    return deferred.promise;

                                case 500:
                                    deferred = $q.defer();
                                    $state.go('500');
                                    return deferred.promise;

                                case 0:
                                    deferred = $q.defer();
                                    return deferred.promise;
                            }

                            return response;
                        }
                    };
                }]);
        }])

    .controller('DemoController', ['$scope', '$httpParamSerializer', '$http', '$filter',
        function($scope, $httpParamSerializer, $http, $filter) {

            $scope.sent = false;

            $scope.simpleDemoPost = function(name, email, company, city, state, country, demoDate, demoTime, message)
            {
                $scope.postingMessage = true;
                $scope.postMessageError = '';
                $scope.postSubscriptionError = '';

                var form = {
                    name:     name,
                    email:    email,
                    company: company,
                    city: city,
                    state: state,
                    country: country,
                    date: $filter('date')(demoDate, "MM/dd/yy"),
                    time: $filter('date')(demoTime, "h:mm a Z"),
                    message:  message
                };

                $http({
                    method: 'POST',
                    url: '/rest/demoContact',
                    data: $httpParamSerializer(form),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (response)
                {
                    $scope.postingMessage = false;
                    $scope.sent = response.success;

                    if (!response.success)
                        $scope.postMessageError = response.message;
                    else
                        $scope.postMessageError = ''
                });
            };
        }])

    .controller('ServiceController', ['$scope', '$httpParamSerializer', '$http', '$filter',
        function($scope, $httpParamSerializer, $http, $filter) {

            $scope.sent = false;

            $scope.sendServiceRequest = function(name, email, company, message)
            {
                $scope.postingMessage = true;
                $scope.postMessageError = '';
                $scope.postSubscriptionError = '';

                var form = {
                    name:     name,
                    email:    email,
                    company: company,
                    message:  message
                };

                $http({
                    method: 'POST',
                    url: '/rest/serviceContact',
                    data: $httpParamSerializer(form),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (response)
                {
                    $scope.postingMessage = false;
                    $scope.sent = response.success;

                    if (!response.success)
                        $scope.postMessageError = response.message;
                    else
                        $scope.postMessageError = ''
                });
            };
        }])

    .controller('AppCtrl', ['$rootScope', '$scope', '$httpParamSerializer', '$http', '$filter',
        function ($rootScope, $scope, $httpParamSerializer, $http, $filter)
        {
            $rootScope.platform = {};

            var dd = new Date();

            dd.setDate(dd.getDate() + 1);
            dd.setHours(12);
            dd.setMinutes(0);
            dd.setSeconds(0);
            dd.setMilliseconds(0);
            $rootScope.demoDate = dd;
            $rootScope.demoTime = dd;

            $http({
                method: "GET",
                url: "https://api.github.com/repos/ConfigHubPub/ConfigHubPlatform/releases/latest"
            }).then(function successCallback(response)
            {
                var date = $filter('date')(response.data.published_at);

                $rootScope.platform = {
                    version: response.data.tag_name,
                    url: response.data.assets[0].browser_download_url,
                    name: response.data.assets[0].name,
                    date: date
                };
            });


            $scope.apis = [
                {
                    'lang': 'Java',
                    'version': 'v1.3.0',
                    'github': 'https://github.com/ConfigHubPub/JavaAPI',
                    'doc': {
                        'url': '/api/docs/Java/v1.3.0/index.html?com/confighub/client/ConfigHub.html',
                        'name': 'JavaDoc'
                    },
                    'date': 'January 05, 2017'
                },
                {
                    'lang': 'Python',
                    'version': 'v1.0.0',
                    'github': 'https://github.com/ConfigHubPub/PythonAPI',
                    'doc': {
                        'url': 'https://github.com/ConfigHubPub/PythonAPI',
                        'name': 'Readme'
                    },
                    'date': 'January 05, 2017'
                }
            ];

            $scope.messageSent = false;
            $scope.simpleContactPost = function(name, email, message)
            {
                $scope.postingMessage = true;
                $scope.postMessageError = '';
                $scope.postSubscriptionError = '';

                var form = {
                    name:     name,
                    email:    email,
                    message:  message
                };

                $http({
                    method: 'POST',
                    url: '/rest/simpleContact',
                    data: $httpParamSerializer(form),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (response)
                {
                    $scope.postingMessage = false;
                    $scope.messageSent = response.success;

                    if (!response.success)
                        $scope.postMessageError = response.message;
                    else
                        $scope.postMessageError = ''
                });
            };

            $scope.mailingListSubscribe = function(email)
            {
                $scope.postingSubscription = true;
                $scope.postSubscriptionError = '';

                var form = { email: email };

                $http({
                    method: 'POST',
                    url: '/rest/mailingListSubscribe',
                    data: $httpParamSerializer(form),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (response)
                {
                    $scope.postingSubscription = false;

                    if (!response.success)
                        $scope.postSubscriptionError = response.message;
                });
            };
        }])

    .directive('updateTitle', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            return {
                link: function(scope, element) {
                    var listener, title;
                    listener = function(event, toState)
                    {
                        title = 'ConfigHub';
                        if (toState.pageTitle)
                            title = toState.pageTitle;
                        $timeout(function() { element.text(title); }, 0, false);
                    };

                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ])

;


