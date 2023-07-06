app.controller("AdminindexCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    $scope.total = 0;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function (id) {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
        $scope.listSP.forEach(function (item, i) {
            $scope.total += item.quantity;

        });
    };

    $scope.LoadCart();

});





