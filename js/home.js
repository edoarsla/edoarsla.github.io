angular
    .module('configHub.home', [])

    .controller('HomeCtrl', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter)
        {
            $scope.releases;

            $http({
                method: "GET",
                url: "https://api.github.com/repos/ConfigHubPub/ConfigHubPlatform/releases"
            }).then(function successCallback(response)
            {
                $scope.releases = response.data;
            });

            $scope.getDate = function(date) {
                return $filter('date')(date);
            };


        }])


    .directive('smoothy', ['$timeout', '$interval', function ($timeout, $interval)
    {
        return {
            restrict: 'A',
            link: function ($scope, $element, attrs)
            {

                var content = [
                    {
                        content: 'All applications have to deal with configuration. ConfigHub has the most powerful, most intuitive, ' +
                        'and best controlled way of modeling the environments. It is far easier to set up and model the ' +
                        'configuration the applications need. That reduces development costs.',
                        name: 'George Moberly',
                        title: 'VP Solutions',
                        company: 'Gradle'
                    },
                    {
                        content: 'Configuration has been the most error-prone and time-consuming aspect of deploying our application ' +
                        'due to the large number of environment variables we (used to) need. In addition to cutting out this headache, ' +
                        'ConfigHub makes it possible to serve separate configuration to each customer. A win/win for us all around.',
                        name: 'Jeremy Dunn',
                        title: 'Principal Software Engineer',
                        company: 'Vineti'
                    },
                    {
                        content: 'ConfigHub has changed the way that we think about our configuration data and how it’s managed. ' +
                        'We’re now able to model our data to fit its domain instead of forcing everything into flat files or database ' +
                        'tables. To top it all off, their team is responsive and helpful; working with them has been a pleasure. ' +
                        'I’d recommend the product to anyone struggling with application configuration management.',
                        name: 'Jordan Kaye',
                        title: 'Lead Engineer',
                        company: 'Belvedere Trading'
                    }
                ],
                intervalCtrl,
                t1, t2, t3;

                $scope.setIndex = function(index)
                {
                    $interval.cancel(intervalCtrl);
                    $timeout.cancel(t1);
                    $timeout.cancel(t2);
                    $timeout.cancel(t3);

                    t1 = $timeout(function () {
                        $scope.displayIndex = index;
                        $scope.quote = content[$scope.displayIndex];
                        t2 = $timeout(function () { intervalF(); }, 40000);
                    }, 250);
                };

                $scope.nextQ = function()
                {
                    $interval.cancel(intervalCtrl);
                    $timeout.cancel(t1);
                    $timeout.cancel(t2);
                    $timeout.cancel(t3);

                    t1 = $timeout(function () {

                        $scope.displayIndex++;

                        if ($scope.displayIndex >= content.length)
                            $scope.displayIndex = 0;

                        $scope.quote = content[$scope.displayIndex];

                    }, 250);
                };


                $scope.prevQ = function()
                {
                    $interval.cancel(intervalCtrl);
                    $timeout.cancel(t1);
                    $timeout.cancel(t2);
                    $timeout.cancel(t3);

                    t1 = $timeout(function () {

                        $scope.displayIndex--;
                        if ($scope.displayIndex < 0)
                            $scope.displayIndex = content.length-1;

                        $scope.quote = content[$scope.displayIndex];

                    }, 250);
                };


                $scope.displayIndex = 0;
                $scope.quote = content[0];

                intervalF();
                function intervalF()
                {
                    $timeout.cancel(t1);
                    $timeout.cancel(t2);

                    intervalCtrl = $interval(function ()
                    {
                        $scope.displayIndex++;

                        if ($scope.displayIndex >= content.length)
                            $scope.displayIndex = 0;

                        t3 = $timeout(function () {
                            $scope.quote = content[$scope.displayIndex];
                        }, 250);
                    }, 20000);
                }
            }
        };
    }])

;
