angular
    .module('configHub.features', [])
    .controller('FeaturesCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$interval', '$analytics',
    function ($scope, $rootScope, $stateParams, $http, $interval, $analytics)
    {
        $analytics.pageTrack('/features');

        // -----------------------------------------------------------------
        // Context Images
        // -----------------------------------------------------------------

        $scope.contextImages = [];
        $scope.contextImages.push('/images/features/context-1.png?v=1');
        $scope.contextImages.push('/images/features/context-2.png?v=1');
        $scope.contextImages.push('/images/features/context-3.png?v=1');
        $scope.contextImages.push('/images/features/context-4.png?v=1');
        $scope.contextImages.push('/images/features/context-5.png?v=1');
        $scope.contextImageIndex = 0;

        $scope.contextImage = $scope.contextImages[$scope.contextImageIndex];

        startContextImageSlider();

        $scope.selectContextImage = function (i)
        {
            $interval.cancel($scope.contextImageInterval);

            $scope.contextImageIndex = i;
            $scope.contextImage = $scope.contextImages[$scope.contextImageIndex];

            if ($scope.pausedContextTimer) {
                $interval.cancel($scope.pausedContextTimer);
                $scope.pausedContextTimer = undefined;
            }
            $scope.pausedContextTimer = $interval(function () { startContextImageSlider(); }, 30000);
        };

        function startContextImageSlider()
        {
            if ($scope.contextImageInterval) {
                $interval.cancel($scope.contextImageInterval);
                $scope.contextImageInterval = undefined;
            }

            $scope.contextImageInterval = $interval(function ()
            {

                $scope.contextImageIndex++;

                if ($scope.contextImageIndex >= $scope.contextImages.length)
                    $scope.contextImageIndex = 0;

                $scope.contextImage = $scope.contextImages[$scope.contextImageIndex];
            }, 7000);
        }

    }])

;