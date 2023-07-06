app.controller("CartCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    $scope.totals = 0;
    $scope.intomoney = 0;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function (id) {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
        $scope.listSP.forEach(function (item, i) {
            $scope.totals += item.quantity * item.GiaKM;
            $scope.intomoney = + $scope.totals;

        }); 
    };
    $scope.load = function () {
     
        location.reload();
    }
    $scope.remove_cart = function (id) {
        $scope.listSP.splice(id, 1);
        localStorage.setItem('cart', angular.toJson($scope.listSP));
        $scope.LoadCart();
    }
    $scope.Tang = function (id) {
        var index = $scope.listSP.findIndex(x => x.id == id);
        if (index >= 0) {
            $scope.listSP[index].quantity += 1;
        }
        localStorage.setItem('cart', angular.toJson($scope.listSP));
        $scope.LoadCart();

    }
    $scope.Giam = function (id) {
        var index = $scope.listSP.findIndex(x => x.id == id);
        if (index >= 0 && $scope.listSP[index].quantity >= 1) {
            $scope.listSP[index].quantity -= 1;
        }
        
        localStorage.setItem('cart', angular.toJson($scope.listSP));
        $scope.LoadCart();
    }
    $scope.updateQuantity = function (id) {
        var quantity = Number($('#q_' + id).val());
        var index = $scope.listSP.findIndex(x => x.id == id);
        if (index >= 0 && $scope.listSP[index].quantity >= 1) {
            $scope.listSP[index].quantity = quantity;
        }
        $scope.LoadCart();
    }

    $scope.LoadCart();
});





