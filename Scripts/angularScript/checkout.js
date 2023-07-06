app.controller("CheckOutCtrl", function ($scope, $http, $window, $timeout) {
    $scope.listSP = [];
    $scope.total = 0;
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function () {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
        $scope.listSP.forEach(function (item, i) {
             $scope.total += item.quantity*item.GiaKM;
           
           
        }); 
    };
    $scope.LoadCart();
    $scope.CreateHoaDon = function () {
        let Hoadonxuat = {};
        Hoadonxuat.Hoten = $('#HoTen').val();
        Hoadonxuat.Diachi = $('#DiaChi').val();
        Hoadonxuat.NgaylapHD = $('#ngaylap').val();
        Hoadonxuat.CTXuats = [];
        $scope.listSP.forEach(function (item, i) {
            Hoadonxuat.CTXuats.push({ MaSP: item.MaSP, Soluong: item.quantity });
        });
        $http({
            method: 'POST',
            url: 'https://localhost:44342/Shopping/CreateHoaDon',
            datatype: 'json',
            data: JSON.stringify(Hoadonxuat),
        }).then(function (response) {
            if (response.data.ok == 1) {
                alert('Thêm thành công');
            }
            else {
                alert('Có lỗi');
            }
        });
       
    };    
});
 
 



