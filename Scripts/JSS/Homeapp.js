App.controller("Homectrl", function ($scope, $http, $window) {
    $scope.listSPKM = {};
    $scope.listSPGC = {};
    $scope.listSP = {};
    $scope.listtuvan = {};
    $scope.listgioithieu = {};
     $scope.LoadSPGC = function () {
        $http({
            method: "GET",
            url: 'https://localhost:44333/Home/sanphamgc',
        }).then(function (response) {
            $scope.listSPGC = response.data;
        })
    };
    $scope.LoadSPKM = function () {
        $http({
            method: "GET",
            url: 'https://localhost:44333/Home/sanphamkm',
        }).then(function (response) {
            $scope.listSPKM = response.data;
        })
    };
    $scope.LoadSP = function () {
        $http({
            method: "GET",
            url:'https://localhost:44333/Home/AjaxGetHome',
            }).then(function (response) {
                $scope.listSP = response.data;
            })
    };
    $scope.Loadtuvan = function () {
        $http({
            method: "GET",
            url: 'https://localhost:44333/Home/tuvan',
        }).then(function (response) {
            $scope.listtuvan = response.data;
        })
    };
    $scope.addToCart = function (sp) {
        let item = {};
            item.MaSP = sp.MaSP,
            item.TenSP = sp.TenSP,
            item.Mota = sp.Mota,
            item.Khuyenmai = sp.Khuyenmai,
            item.giacu = sp.giacu,
            item.giamoi = sp.giamoi,
            item.Maloai = sp.Maloai,
            item.Anh = sp.Anh
        item.quantity = 1;
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.MaSP == item.MaSP) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giở hàng thành công");
    }
});

